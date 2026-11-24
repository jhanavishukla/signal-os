from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    summary: str
    why_it_matters: str
    implications: str
    importance_score: float
    relevance_score: float
    sentiment: str

class LLMProvider(ABC):
    """
    Abstract Base Class for LLM providers.
    Ensures provider-independence (OpenAI, Anthropic, Gemini, Local models, etc.).
    """
    @abstractmethod
    async def analyze_development(self, text: str, user_context: Dict[str, Any]) -> AnalysisResult:
        pass

    @abstractmethod
    async def synthesize_briefing(self, items: List[Dict[str, Any]], user_context: Dict[str, Any]) -> str:
        pass

class MockLLMProvider(LLMProvider):
    """
    Default offline mock provider providing realistic synthesized responses
    without requiring external API keys.
    """
    async def analyze_development(self, text: str, user_context: Dict[str, Any]) -> AnalysisResult:
        return AnalysisResult(
            summary=f"Synthesized intelligence for: {text[:80]}...",
            why_it_matters="Accelerates computational efficiency and shifts current architectural paradigms.",
            implications="Companies lagging in agentic workflows risk losing 30-40% operational speed.",
            importance_score=8.5,
            relevance_score=9.1,
            sentiment="bullish"
        )

    async def synthesize_briefing(self, items: List[Dict[str, Any]], user_context: Dict[str, Any]) -> str:
        return (
            "Key intelligence highlights focus on autonomous agent architecture shifts, "
            "deep reasoning benchmarks, and developer productivity breakthroughs."
        )

def get_llm_provider(provider_type: Optional[str] = "mock") -> LLMProvider:
    if provider_type == "mock":
        return MockLLMProvider()
    # Extensions for OpenAI, Anthropic, Gemini can be hooked here easily
    return MockLLMProvider()
