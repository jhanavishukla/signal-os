from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

# Association table for User followed Topics
user_topics = Table(
    "user_topics",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("topic_id", Integer, ForeignKey("topics.id", ondelete="CASCADE"), primary_key=True)
)

# Association table for User followed Industries
user_industries = Table(
    "user_industries",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("industry_id", Integer, ForeignKey("industries.id", ondelete="CASCADE"), primary_key=True)
)

class Industry(Base):
    __tablename__ = "industries"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), default="Layers")
    created_at = Column(DateTime, default=datetime.utcnow)

    topics = relationship("Topic", back_populates="industry", cascade="all, delete-orphan")
    developments = relationship("IntelligenceDevelopment", back_populates="industry")


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    industry_id = Column(Integer, ForeignKey("industries.id", ondelete="CASCADE"), nullable=False)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    is_trending = Column(Boolean, default=False)
    followers_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    industry = relationship("Industry", back_populates="topics")
    developments = relationship("IntelligenceDevelopment", back_populates="topic")


class IntelligenceDevelopment(Base):
    __tablename__ = "intelligence_developments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    summary = Column(Text, nullable=False)
    why_it_matters = Column(Text, nullable=False)
    implications = Column(Text, nullable=True)
    industry_id = Column(Integer, ForeignKey("industries.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=True)
    
    source_name = Column(String(100), nullable=False)
    source_url = Column(String(500), nullable=False)
    published_at = Column(DateTime, default=datetime.utcnow)
    
    # Intelligence metrics
    importance_score = Column(Float, default=7.5)   # 1 - 10
    relevance_score = Column(Float, default=8.0)    # 1 - 10
    sentiment = Column(String(20), default="neutral") # bullish, bearish, neutral, disrupt
    status = Column(String(20), default="verified")   # emerging, verified, critical
    
    created_at = Column(DateTime, default=datetime.utcnow)

    industry = relationship("Industry", back_populates="developments")
    topic = relationship("Topic", back_populates="developments")


class Briefing(Base):
    __tablename__ = "briefings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String(20), default="daily") # 'daily' or 'weekly'
    title = Column(String(255), nullable=False)
    executive_summary = Column(Text, nullable=False)
    key_takeaways = Column(Text, nullable=True) # JSON string or markdown
    period_label = Column(String(100), nullable=False) # e.g. "Today's Briefing - Nov 24, 2026"
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("UserProfile", back_populates="briefings")


class UserProfile(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    role_title = Column(String(100), default="Technology Strategist")
    expertise_level = Column(String(50), default="advanced") # beginner, intermediate, advanced, executive
    learning_goals = Column(Text, default="Stay ahead of AI architectures, system design, and competitive movements.")
    briefing_frequency = Column(String(20), default="daily") # daily, weekly
    
    followed_industries = relationship("Industry", secondary=user_industries)
    followed_topics = relationship("Topic", secondary=user_topics)
    briefings = relationship("Briefing", back_populates="user")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
