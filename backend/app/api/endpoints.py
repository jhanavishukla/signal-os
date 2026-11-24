from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.core.sqlite_db import get_connection
from app.schemas.schemas import (
    IndustryBase,
    TopicBase,
    DevelopmentBase,
    BriefingItem,
    UserProfileBase,
    UserProfileUpdate
)

router = APIRouter()

# -------------------------------------------------------------
# Industries
# -------------------------------------------------------------
@router.get("/industries", response_model=List[IndustryBase])
def get_industries():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM industries ORDER BY id ASC")
    industries_rows = cursor.fetchall()
    
    result = []
    for ind in industries_rows:
        cursor.execute("SELECT * FROM topics WHERE industry_id = ?", (ind["id"],))
        topics_rows = cursor.fetchall()
        topics = [
            TopicBase(
                id=t["id"],
                name=t["name"],
                slug=t["slug"],
                description=t["description"],
                is_trending=bool(t["is_trending"]),
                followers_count=t["followers_count"],
                industry_id=t["industry_id"]
            )
            for t in topics_rows
        ]
        result.append(
            IndustryBase(
                id=ind["id"],
                slug=ind["slug"],
                name=ind["name"],
                description=ind["description"],
                icon=ind["icon"],
                topics=topics
            )
        )
    conn.close()
    return result

# -------------------------------------------------------------
# Topics
# -------------------------------------------------------------
@router.get("/topics", response_model=List[TopicBase])
def get_topics(
    industry_id: Optional[int] = None,
    trending: Optional[bool] = None
):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM topics WHERE 1=1"
    params = []
    if industry_id is not None:
        query += " AND industry_id = ?"
        params.append(industry_id)
    if trending is not None:
        query += " AND is_trending = ?"
        params.append(1 if trending else 0)
    
    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    topics = [
        TopicBase(
            id=t["id"],
            name=t["name"],
            slug=t["slug"],
            description=t["description"],
            is_trending=bool(t["is_trending"]),
            followers_count=t["followers_count"],
            industry_id=t["industry_id"]
        )
        for t in rows
    ]
    conn.close()
    return topics

# -------------------------------------------------------------
# Intelligence Developments (Industry Radar)
# -------------------------------------------------------------
@router.get("/intelligence", response_model=List[DevelopmentBase])
def get_intelligence(
    industry_id: Optional[int] = None,
    topic_id: Optional[int] = None,
    min_importance: Optional[float] = None,
    sentiment: Optional[str] = None,
    limit: int = 50
):
    conn = get_connection()
    cursor = conn.cursor()
    query = """
    SELECT d.*, i.name as industry_name, t.name as topic_name
    FROM intelligence_developments d
    LEFT JOIN industries i ON d.industry_id = i.id
    LEFT JOIN topics t ON d.topic_id = t.id
    WHERE 1=1
    """
    params = []
    if industry_id is not None:
        query += " AND d.industry_id = ?"
        params.append(industry_id)
    if topic_id is not None:
        query += " AND d.topic_id = ?"
        params.append(topic_id)
    if min_importance is not None:
        query += " AND d.importance_score >= ?"
        params.append(min_importance)
    if sentiment is not None:
        query += " AND d.sentiment = ?"
        params.append(sentiment)

    query += " ORDER BY d.published_at DESC LIMIT ?"
    params.append(int(limit))

    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    developments = [
        DevelopmentBase(
            id=r["id"],
            title=r["title"],
            summary=r["summary"],
            why_it_matters=r["why_it_matters"],
            implications=r["implications"],
            industry_id=r["industry_id"],
            industry_name=r["industry_name"],
            topic_id=r["topic_id"],
            topic_name=r["topic_name"],
            source_name=r["source_name"],
            source_url=r["source_url"],
            published_at=str(r["published_at"]),
            importance_score=r["importance_score"],
            relevance_score=r["relevance_score"],
            sentiment=r["sentiment"],
            status=r["status"],
            created_at=str(r["created_at"])
        )
        for r in rows
    ]
    conn.close()
    return developments

# -------------------------------------------------------------
# Briefings
# -------------------------------------------------------------
@router.get("/briefings", response_model=List[BriefingItem])
def get_briefings(type: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM briefings WHERE 1=1"
    params = []
    if type:
        query += " AND type = ?"
        params.append(type)
    query += " ORDER BY created_at DESC"
    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    briefings = [
        BriefingItem(
            id=r["id"],
            title=r["title"],
            type=r["type"],
            period_label=r["period_label"],
            executive_summary=r["executive_summary"],
            key_takeaways=r["key_takeaways"],
            created_at=str(r["created_at"])
        )
        for r in rows
    ]
    conn.close()
    return briefings

# -------------------------------------------------------------
# User Profile
# -------------------------------------------------------------
@router.get("/profile", response_model=UserProfileBase)
def get_profile():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users LIMIT 1")
    user = cursor.fetchone()
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User profile not found")

    # Get followed industries
    cursor.execute("""
    SELECT i.* FROM industries i
    JOIN user_industries ui ON ui.industry_id = i.id
    WHERE ui.user_id = ?
    """, (user["id"],))
    ind_rows = cursor.fetchall()
    followed_industries = [
        IndustryBase(
            id=i["id"],
            name=i["name"],
            slug=i["slug"],
            description=i["description"],
            icon=i["icon"]
        )
        for i in ind_rows
    ]

    # Get followed topics
    cursor.execute("""
    SELECT t.* FROM topics t
    JOIN user_topics ut ON ut.topic_id = t.id
    WHERE ut.user_id = ?
    """, (user["id"],))
    top_rows = cursor.fetchall()
    followed_topics = [
        TopicBase(
            id=t["id"],
            name=t["name"],
            slug=t["slug"],
            description=t["description"],
            is_trending=bool(t["is_trending"]),
            followers_count=t["followers_count"],
            industry_id=t["industry_id"]
        )
        for t in top_rows
    ]

    profile = UserProfileBase(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        role_title=user["role_title"],
        expertise_level=user["expertise_level"],
        learning_goals=user["learning_goals"],
        briefing_frequency=user["briefing_frequency"],
        followed_industries=followed_industries,
        followed_topics=followed_topics
    )
    conn.close()
    return profile

@router.put("/profile", response_model=UserProfileBase)
def update_profile(data: UserProfileUpdate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users LIMIT 1")
    user = cursor.fetchone()
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User profile not found")
    user_id = user["id"]

    updates = []
    params = []
    if data.full_name is not None:
        updates.append("full_name = ?")
        params.append(data.full_name)
    if data.role_title is not None:
        updates.append("role_title = ?")
        params.append(data.role_title)
    if data.expertise_level is not None:
        updates.append("expertise_level = ?")
        params.append(data.expertise_level)
    if data.learning_goals is not None:
        updates.append("learning_goals = ?")
        params.append(data.learning_goals)
    if data.briefing_frequency is not None:
        updates.append("briefing_frequency = ?")
        params.append(data.briefing_frequency)

    if updates:
        params.append(user_id)
        cursor.execute(f"UPDATE users SET {', '.join(updates)} WHERE id = ?", tuple(params))

    if data.industry_ids is not None:
        cursor.execute("DELETE FROM user_industries WHERE user_id = ?", (user_id,))
        for ind_id in data.industry_ids:
            cursor.execute("INSERT OR IGNORE INTO user_industries (user_id, industry_id) VALUES (?, ?)", (user_id, ind_id))

    if data.topic_ids is not None:
        cursor.execute("DELETE FROM user_topics WHERE user_id = ?", (user_id,))
        for top_id in data.topic_ids:
            cursor.execute("INSERT OR IGNORE INTO user_topics (user_id, topic_id) VALUES (?, ?)", (user_id, top_id))

    conn.commit()
    conn.close()
    return get_profile()

@router.post("/topics/{topic_id}/toggle-follow")
def toggle_follow_topic(topic_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users LIMIT 1")
    user = cursor.fetchone()
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_id = user["id"]

    cursor.execute("SELECT * FROM user_topics WHERE user_id = ? AND topic_id = ?", (user_id, topic_id))
    existing = cursor.fetchone()
    if existing:
        cursor.execute("DELETE FROM user_topics WHERE user_id = ? AND topic_id = ?", (user_id, topic_id))
        cursor.execute("UPDATE topics SET followers_count = MAX(0, followers_count - 1) WHERE id = ?", (topic_id,))
        action = "unfollowed"
    else:
        cursor.execute("INSERT INTO user_topics (user_id, topic_id) VALUES (?, ?)", (user_id, topic_id))
        cursor.execute("UPDATE topics SET followers_count = followers_count + 1 WHERE id = ?", (topic_id,))
        action = "followed"

    cursor.execute("SELECT followers_count FROM topics WHERE id = ?", (topic_id,))
    count_row = cursor.fetchone()
    followers_count = count_row["followers_count"] if count_row else 0

    conn.commit()
    conn.close()
    return {"status": "success", "action": action, "topic_id": topic_id, "followers_count": followers_count}
