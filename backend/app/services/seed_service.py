from sqlalchemy.orm import Session
from app.models.models import Industry, Topic, IntelligenceDevelopment, Briefing, UserProfile, user_industries, user_topics
from datetime import datetime, timedelta

def seed_database(db: Session):
    # Check if already seeded
    if db.query(Industry).first():
        return

    # 1. Create Industries
    ai_industry = Industry(
        slug="artificial-intelligence",
        name="Artificial Intelligence",
        description="Foundational models, agentic workflows, autonomous systems, and neural architectures.",
        icon="Cpu"
    )
    cloud_industry = Industry(
        slug="cloud-infrastructure",
        name="Cloud & Distributed Systems",
        description="Scalable microservices, Kubernetes ecosystems, edge computing, and bare metal optimizations.",
        icon="Server"
    )
    fintech_industry = Industry(
        slug="fintech-defi",
        name="Fintech & Web3 Systems",
        description="Digital asset rails, real-time settlement platforms, algorithmic trading, and cryptographic safety.",
        icon="Coins"
    )
    biotech_industry = Industry(
        slug="biotech-genomics",
        name="Biotech & Healthcare Tech",
        description="Computational biology, genomic sequencing breakthroughs, and AI drug synthesis pipelines.",
        icon="Dna"
    )

    db.add_all([ai_industry, cloud_industry, fintech_industry, biotech_industry])
    db.commit()

    # 2. Create Topics
    topics_data = [
        # AI Topics
        {"industry": ai_industry, "name": "Agentic Workflows", "slug": "agentic-workflows", "is_trending": True, "followers": 1420},
        {"industry": ai_industry, "name": "Reasoning Models", "slug": "reasoning-models", "is_trending": True, "followers": 1980},
        {"industry": ai_industry, "name": "Open-Weights LLMs", "slug": "open-weights-llms", "is_trending": False, "followers": 860},
        {"industry": ai_industry, "name": "Multi-Modal Robotics", "slug": "multimodal-robotics", "is_trending": True, "followers": 670},
        # Cloud Topics
        {"industry": cloud_industry, "name": "Serverless GPU Infrastructure", "slug": "serverless-gpu", "is_trending": True, "followers": 920},
        {"industry": cloud_industry, "name": "eBPF & Kernel Observability", "slug": "ebpf-observability", "is_trending": False, "followers": 510},
        {"industry": cloud_industry, "name": "WebAssembly Runtime", "slug": "wasm-runtime", "is_trending": False, "followers": 440},
        # Fintech Topics
        {"industry": fintech_industry, "name": "Real-time Settlement Rails", "slug": "real-time-settlement", "is_trending": True, "followers": 780},
        {"industry": fintech_industry, "name": "Zero-Knowledge Auditing", "slug": "zk-auditing", "is_trending": False, "followers": 390},
        # Biotech Topics
        {"industry": biotech_industry, "name": "Protein Folding & AlphaFold Systems", "slug": "protein-folding", "is_trending": True, "followers": 610},
    ]

    topics = []
    for t in topics_data:
        topic_obj = Topic(
            industry_id=t["industry"].id,
            slug=t["slug"],
            name=t["name"],
            description=f"Curated strategic insights and deep technical breakthroughs in {t['name']}.",
            is_trending=t["is_trending"],
            followers_count=t["followers"]
        )
        topics.append(topic_obj)
    db.add_all(topics)
    db.commit()

    # Find topics by slug
    topic_map = {top.slug: top for top in topics}

    # 3. Create Seed Intelligence Developments
    developments = [
        IntelligenceDevelopment(
            title="Frontier Multi-Agent Coordination Protocol Standardized for Autonomous Tool Use",
            summary="Consortium of industry leaders released the Open Agentic Interface standard, enabling deterministic handoffs between heterogeneous autonomous agents.",
            why_it_matters="Solves the fragmentation across bespoke multi-agent frameworks and cuts latency by 45% during distributed task execution.",
            implications="Enterprises can eliminate vendor lock-in and chain specialized reasoning agents across cloud boundaries seamlessly.",
            industry_id=ai_industry.id,
            topic_id=topic_map.get("agentic-workflows").id,
            source_name="AI Systems Journal",
            source_url="https://arxiv.org/abs/2603.09101",
            published_at=datetime.utcnow() - timedelta(hours=3),
            importance_score=9.4,
            relevance_score=9.8,
            sentiment="bullish",
            status="critical"
        ),
        IntelligenceDevelopment(
            title="Next-Gen Inference Scaling Eliminates Pre-fill Bottlenecks in Deep Reasoning Models",
            summary="New hierarchical speculative decoding algorithm reduces memory bandwidth pressure by 3.8x for test-time compute chains.",
            why_it_matters="Drastically drives down token cost for reasoning-heavy pipelines, making chain-of-thought economically feasible for consumer applications.",
            implications="Lowers barrier to entry for complex autonomous agents requiring continuous multi-step reflection.",
            industry_id=ai_industry.id,
            topic_id=topic_map.get("reasoning-models").id,
            source_name="Compute Architecture Weekly",
            source_url="https://cparch.tech/deep-reasoning-scaling",
            published_at=datetime.utcnow() - timedelta(hours=6),
            importance_score=9.1,
            relevance_score=9.5,
            sentiment="bullish",
            status="verified"
        ),
        IntelligenceDevelopment(
            title="Bare-Metal Serverless GPU Slicing Framework Cuts Cold-Starts to Under 12ms",
            summary="Virtual GPU virtualization hypervisor allows zero-overhead partition swaps across Nvidia and AMD architectures dynamically.",
            why_it_matters="Transforms AI backend unit economics by removing idle GPU reservations for intermittent workload patterns.",
            implications="Cloud billings for bursty inference workloads are projected to drop by up to 60%.",
            industry_id=cloud_industry.id,
            topic_id=topic_map.get("serverless-gpu").id,
            source_name="Cloud Native Review",
            source_url="https://cloudnativereview.io/bare-metal-gpu-slicing",
            published_at=datetime.utcnow() - timedelta(hours=14),
            importance_score=8.7,
            relevance_score=8.9,
            sentiment="disrupt",
            status="verified"
        ),
        IntelligenceDevelopment(
            title="Open-Weights 70B Model Matches Frontier Proprietary Benchmarks on Code Synthesis",
            summary="New synthetic alignment distillation pipeline allows an open model to surpass closed commercial APIs in multi-file refactoring benchmarks.",
            why_it_matters="Accelerates self-hosted enterprise deployments and diminishes dependence on proprietary closed-source API gateways.",
            implications="Enterprises with strict data sovereignty mandates can now achieve state-of-the-art developer assistance on-premise.",
            industry_id=ai_industry.id,
            topic_id=topic_map.get("open-weights-llms").id,
            source_name="HuggingFace Research",
            source_url="https://huggingface.co/blog/open-sota-synthesis",
            published_at=datetime.utcnow() - timedelta(hours=22),
            importance_score=8.8,
            relevance_score=9.2,
            sentiment="bullish",
            status="verified"
        ),
        IntelligenceDevelopment(
            title="Zero-Knowledge Audit Protocol Adopted by Top 5 Institutional Custodians",
            summary="Cryptographic proof-of-solvency protocol allows continuous balance sheet verification without leaking private trading strategies or account details.",
            why_it_matters="Mitigates systemic counterparty risk without compromising proprietary market operations.",
            implications="Regulatory scrutiny can shift from reactive audits to automated cryptographic assertions.",
            industry_id=fintech_industry.id,
            topic_id=topic_map.get("zk-auditing").id,
            source_name="Institutional Crypto Review",
            source_url="https://cryptoinsider.com/zk-audit-custody",
            published_at=datetime.utcnow() - timedelta(days=1),
            importance_score=8.2,
            relevance_score=7.9,
            sentiment="neutral",
            status="emerging"
        ),
        IntelligenceDevelopment(
            title="Diffusion-Driven De Novo Drug Discovery Platform Enters Phase II Accelerated Trials",
            summary="Molecule synthesized completely via multi-modal molecular graph diffusion proves viable bio-availability in preliminary clinical tests.",
            why_it_matters="Compresses traditional discovery lifecycle from 4.5 years down to 8 months.",
            implications="Pharma R&D pipelines shift fundamentally towards digital simulation before wet-lab validation.",
            industry_id=biotech_industry.id,
            topic_id=topic_map.get("protein-folding").id,
            source_name="Nature Biotechnology Digest",
            source_url="https://nature.com/articles/denovo-diffusion-trial",
            published_at=datetime.utcnow() - timedelta(days=2),
            importance_score=9.0,
            relevance_score=8.1,
            sentiment="bullish",
            status="verified"
        )
    ]
    db.add_all(developments)
    db.commit()

    # 4. Create User Profile
    user = UserProfile(
        email="alex.chen@signalos.dev",
        full_name="Alex Chen",
        role_title="Staff AI Architect & Technology Strategist",
        expertise_level="advanced",
        learning_goals="Track state-of-the-art reasoning architectures, distributed inference cost reduction, and autonomous multi-agent systems.",
        briefing_frequency="daily"
    )
    user.followed_industries = [ai_industry, cloud_industry]
    user.followed_topics = [
        topic_map.get("agentic-workflows"),
        topic_map.get("reasoning-models"),
        topic_map.get("serverless-gpu")
    ]
    db.add(user)
    db.commit()

    # 5. Create Briefings
    daily_briefing = Briefing(
        user_id=user.id,
        type="daily",
        title="Morning Executive Intelligence Briefing",
        period_label="Today's Briefing - Nov 24, 2026",
        executive_summary="Frontier standardization in autonomous agent protocols combined with breakthrough inference pre-fill reductions are unlocking production-scale agent workflows. Concurrently, bare-metal serverless GPU hypervisors are resolving critical cold-start latency constraints.",
        key_takeaways="• Open Agentic Interface standard reduces multi-agent handoff latency by 45%.\n• Hierarchical speculative decoding drops test-time reasoning costs substantially.\n• Serverless GPU slicing reaches 12ms cold starts, improving compute unit economics.\n• Open-weights 70B model parity marks a milestone for sovereign enterprise AI."
    )
    weekly_briefing = Briefing(
        user_id=user.id,
        type="weekly",
        title="Weekly Strategic Industry Macro Briefing",
        period_label="Week 47 Strategic Synthesis (Nov 17 - Nov 24)",
        executive_summary="This week's macro shifts highlight decisive convergence between test-time reasoning compute and low-latency infrastructure. The barrier between research prototypes and high-throughput production autonomous agents is collapsing faster than projected.",
        key_takeaways="• Massive capital realignment toward autonomous execution frameworks.\n• Enterprise focus pivoted from general-purpose chatbots to structured domain agents.\n• Cloud hyperscalers respond with specialized sub-second GPU partition spin-ups."
    )
    db.add_all([daily_briefing, weekly_briefing])
    db.commit()
