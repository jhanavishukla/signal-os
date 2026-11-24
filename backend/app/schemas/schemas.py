from pydantic import BaseModel
from typing import List, Optional

class TopicBase(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    is_trending: bool = False
    followers_count: int = 0
    industry_id: int

class IndustryBase(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = "Layers"
    topics: Optional[List[TopicBase]] = []

class DevelopmentBase(BaseModel):
    id: int
    title: str
    summary: str
    why_it_matters: str
    implications: Optional[str] = None
    industry_id: int
    industry_name: Optional[str] = None
    topic_id: Optional[int] = None
    topic_name: Optional[str] = None
    source_name: str
    source_url: str
    published_at: str
    importance_score: float
    relevance_score: float
    sentiment: str
    status: str
    created_at: str

class BriefingItem(BaseModel):
    id: int
    title: str
    type: str
    period_label: str
    executive_summary: str
    key_takeaways: Optional[str] = None
    created_at: str
    developments_count: Optional[int] = 4

class UserProfileBase(BaseModel):
    id: int
    email: str
    full_name: str
    role_title: str
    expertise_level: str
    learning_goals: str
    briefing_frequency: str
    followed_industries: List[IndustryBase] = []
    followed_topics: List[TopicBase] = []

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    role_title: Optional[str] = None
    expertise_level: Optional[str] = None
    learning_goals: Optional[str] = None
    briefing_frequency: Optional[str] = None
    industry_ids: Optional[List[int]] = None
    topic_ids: Optional[List[int]] = None
