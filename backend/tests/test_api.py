import pytest
from app.core.sqlite_db import init_db, seed_db
from app.api.endpoints import (
    get_industries,
    get_topics,
    get_intelligence,
    get_briefings,
    get_profile,
    toggle_follow_topic
)

@pytest.fixture(autouse=True)
def setup_db():
    init_db()
    seed_db()

def test_get_industries():
    industries = get_industries()
    assert len(industries) >= 4
    slugs = [i.slug for i in industries]
    assert "artificial-intelligence" in slugs
    assert "cloud-infrastructure" in slugs

def test_get_topics():
    topics = get_topics()
    assert len(topics) >= 5
    ai_topics = get_topics(industry_id=1)
    assert len(ai_topics) > 0

def test_get_intelligence():
    developments = get_intelligence()
    assert len(developments) > 0
    first = developments[0]
    assert first.title is not None
    assert first.why_it_matters is not None
    assert first.importance_score >= 1.0
    assert first.relevance_score >= 1.0

def test_get_briefings():
    briefings = get_briefings()
    assert len(briefings) >= 2
    daily = get_briefings(type="daily")
    assert len(daily) >= 1

def test_get_profile_and_toggle_topic():
    profile = get_profile()
    assert profile.email == "alex.chen@signalos.dev"
    assert len(profile.followed_topics) > 0

    initial_followed = len(profile.followed_topics)
    # Toggle topic 10 (Protein folding)
    res = toggle_follow_topic(10)
    assert res["status"] == "success"
    
    updated_profile = get_profile()
    if res["action"] == "followed":
        assert len(updated_profile.followed_topics) == initial_followed + 1
    else:
        assert len(updated_profile.followed_topics) == initial_followed - 1
