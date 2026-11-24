import sqlite3
from typing import List, Dict, Any, Optional
from datetime import datetime
import os

DB_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "signalos.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # 1. Industries
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT DEFAULT 'Layers',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 2. Topics
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        industry_id INTEGER NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        is_trending BOOLEAN DEFAULT 0,
        followers_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE CASCADE
    )
    """)

    # 3. Intelligence Developments
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS intelligence_developments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        why_it_matters TEXT NOT NULL,
        implications TEXT,
        industry_id INTEGER NOT NULL,
        topic_id INTEGER,
        source_name TEXT NOT NULL,
        source_url TEXT NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        importance_score REAL DEFAULT 7.5,
        relevance_score REAL DEFAULT 8.0,
        sentiment TEXT DEFAULT 'neutral',
        status TEXT DEFAULT 'verified',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (industry_id) REFERENCES industries(id),
        FOREIGN KEY (topic_id) REFERENCES topics(id)
    )
    """)

    # 4. Briefings
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS briefings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT DEFAULT 'daily',
        title TEXT NOT NULL,
        executive_summary TEXT NOT NULL,
        key_takeaways TEXT,
        period_label TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 5. User Profile
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        role_title TEXT DEFAULT 'Technology Strategist',
        expertise_level TEXT DEFAULT 'advanced',
        learning_goals TEXT,
        briefing_frequency TEXT DEFAULT 'daily',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 6. Junction tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_industries (
        user_id INTEGER,
        industry_id INTEGER,
        PRIMARY KEY (user_id, industry_id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_topics (
        user_id INTEGER,
        topic_id INTEGER,
        PRIMARY KEY (user_id, topic_id)
    )
    """)

    conn.commit()
    conn.close()

def seed_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Check if seeded
    cursor.execute("SELECT COUNT(*) as cnt FROM industries")
    if cursor.fetchone()["cnt"] > 0:
        conn.close()
        return

    # Seed industries
    industries = [
        ("artificial-intelligence", "Artificial Intelligence", "Foundational models, agentic workflows, autonomous systems, and neural architectures.", "Cpu"),
        ("cloud-infrastructure", "Cloud & Distributed Systems", "Scalable microservices, Kubernetes ecosystems, edge computing, and bare metal optimizations.", "Server"),
        ("fintech-defi", "Fintech & Web3 Systems", "Digital asset rails, real-time settlement platforms, algorithmic trading, and cryptographic safety.", "Coins"),
        ("biotech-genomics", "Biotech & Healthcare Tech", "Computational biology, genomic sequencing breakthroughs, and AI drug synthesis pipelines.", "Dna")
    ]
    cursor.executemany("INSERT INTO industries (slug, name, description, icon) VALUES (?, ?, ?, ?)", industries)

    # Seed topics
    topics = [
        (1, "agentic-workflows", "Agentic Workflows", "Curated strategic insights and deep technical breakthroughs in Agentic Workflows.", 1, 1420),
        (1, "reasoning-models", "Reasoning Models", "Curated strategic insights and deep technical breakthroughs in Reasoning Models.", 1, 1980),
        (1, "open-weights-llms", "Open-Weights LLMs", "Curated strategic insights and deep technical breakthroughs in Open-Weights LLMs.", 0, 860),
        (1, "multimodal-robotics", "Multi-Modal Robotics", "Curated strategic insights and deep technical breakthroughs in Multi-Modal Robotics.", 1, 670),
        (2, "serverless-gpu", "Serverless GPU Infrastructure", "Curated strategic insights and deep technical breakthroughs in Serverless GPU Infrastructure.", 1, 920),
        (2, "ebpf-observability", "eBPF & Kernel Observability", "Curated strategic insights and deep technical breakthroughs in eBPF & Kernel Observability.", 0, 510),
        (2, "wasm-runtime", "WebAssembly Runtime", "Curated strategic insights and deep technical breakthroughs in WebAssembly Runtime.", 0, 440),
        (3, "real-time-settlement", "Real-time Settlement Rails", "Curated strategic insights and deep technical breakthroughs in Real-time Settlement Rails.", 1, 780),
        (3, "zk-auditing", "Zero-Knowledge Auditing", "Curated strategic insights and deep technical breakthroughs in Zero-Knowledge Auditing.", 0, 390),
        (4, "protein-folding", "Protein Folding & AlphaFold Systems", "Curated strategic insights and deep technical breakthroughs in Protein Folding.", 1, 610)
    ]
    cursor.executemany("INSERT INTO topics (industry_id, slug, name, description, is_trending, followers_count) VALUES (?, ?, ?, ?, ?, ?)", topics)

    # Seed developments
    developments = [
        (
            "Frontier Multi-Agent Coordination Protocol Standardized for Autonomous Tool Use",
            "Consortium of industry leaders released the Open Agentic Interface standard, enabling deterministic handoffs between heterogeneous autonomous agents.",
            "Solves the fragmentation across bespoke multi-agent frameworks and cuts latency by 45% during distributed task execution.",
            "Enterprises can eliminate vendor lock-in and chain specialized reasoning agents across cloud boundaries seamlessly.",
            1, 1, "AI Systems Journal", "https://arxiv.org/abs/2603.09101",
            datetime.utcnow().isoformat(), 9.4, 9.8, "bullish", "critical"
        ),
        (
            "Next-Gen Inference Scaling Eliminates Pre-fill Bottlenecks in Deep Reasoning Models",
            "New hierarchical speculative decoding algorithm reduces memory bandwidth pressure by 3.8x for test-time compute chains.",
            "Drastically drives down token cost for reasoning-heavy pipelines, making chain-of-thought economically feasible for consumer applications.",
            "Lowers barrier to entry for complex autonomous agents requiring continuous multi-step reflection.",
            1, 2, "Compute Architecture Weekly", "https://cparch.tech/deep-reasoning-scaling",
            datetime.utcnow().isoformat(), 9.1, 9.5, "bullish", "verified"
        ),
        (
            "Bare-Metal Serverless GPU Slicing Framework Cuts Cold-Starts to Under 12ms",
            "Virtual GPU virtualization hypervisor allows zero-overhead partition swaps across Nvidia and AMD architectures dynamically.",
            "Transforms AI backend unit economics by removing idle GPU reservations for intermittent workload patterns.",
            "Cloud billings for bursty inference workloads are projected to drop by up to 60%.",
            2, 5, "Cloud Native Review", "https://cloudnativereview.io/bare-metal-gpu-slicing",
            datetime.utcnow().isoformat(), 8.7, 8.9, "disrupt", "verified"
        ),
        (
            "Open-Weights 70B Model Matches Frontier Proprietary Benchmarks on Code Synthesis",
            "New synthetic alignment distillation pipeline allows an open model to surpass closed commercial APIs in multi-file refactoring benchmarks.",
            "Accelerates self-hosted enterprise deployments and diminishes dependence on proprietary closed-source API gateways.",
            "Enterprises with strict data sovereignty mandates can now achieve state-of-the-art developer assistance on-premise.",
            1, 3, "HuggingFace Research", "https://huggingface.co/blog/open-sota-synthesis",
            datetime.utcnow().isoformat(), 8.8, 9.2, "bullish", "verified"
        ),
        (
            "Zero-Knowledge Audit Protocol Adopted by Top 5 Institutional Custodians",
            "Cryptographic proof-of-solvency protocol allows continuous balance sheet verification without leaking private trading strategies.",
            "Mitigates systemic counterparty risk without compromising proprietary market operations.",
            "Regulatory scrutiny can shift from reactive audits to automated cryptographic assertions.",
            3, 9, "Institutional Crypto Review", "https://cryptoinsider.com/zk-audit-custody",
            datetime.utcnow().isoformat(), 8.2, 7.9, "neutral", "emerging"
        )
    ]
    cursor.executemany("""
    INSERT INTO intelligence_developments 
    (title, summary, why_it_matters, implications, industry_id, topic_id, source_name, source_url, published_at, importance_score, relevance_score, sentiment, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, developments)

    # Seed User
    cursor.execute("""
    INSERT INTO users (email, full_name, role_title, expertise_level, learning_goals, briefing_frequency)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        "alex.chen@signalos.dev",
        "Alex Chen",
        "Staff AI Architect & Technology Strategist",
        "advanced",
        "Track state-of-the-art reasoning architectures, distributed inference cost reduction, and autonomous multi-agent systems.",
        "daily"
    ))
    user_id = cursor.lastrowid

    # Seed user followed industries & topics
    cursor.executemany("INSERT INTO user_industries (user_id, industry_id) VALUES (?, ?)", [(user_id, 1), (user_id, 2)])
    cursor.executemany("INSERT INTO user_topics (user_id, topic_id) VALUES (?, ?)", [(user_id, 1), (user_id, 2), (user_id, 5)])

    # Seed Briefings
    briefings = [
        (
            user_id, "daily", "Morning Executive Intelligence Briefing",
            "Today's Briefing — Nov 24, 2026",
            "Frontier standardization in autonomous agent protocols combined with breakthrough inference pre-fill reductions are unlocking production-scale agent workflows. Concurrently, bare-metal serverless GPU hypervisors are resolving critical cold-start latency constraints.",
            "• Open Agentic Interface standard reduces multi-agent handoff latency by 45%.\n• Hierarchical speculative decoding drops test-time reasoning costs substantially.\n• Serverless GPU slicing reaches 12ms cold starts, improving compute unit economics.\n• Open-weights 70B model parity marks a milestone for sovereign enterprise AI."
        ),
        (
            user_id, "weekly", "Weekly Strategic Industry Macro Briefing",
            "Week 47 Strategic Synthesis (Nov 17 - Nov 24)",
            "This week's macro shifts highlight decisive convergence between test-time reasoning compute and low-latency infrastructure. The barrier between research prototypes and high-throughput production autonomous agents is collapsing faster than projected.",
            "• Massive capital realignment toward autonomous execution frameworks.\n• Enterprise focus pivoted from general-purpose chatbots to structured domain agents.\n• Cloud hyperscalers respond with specialized sub-second GPU partition spin-ups."
        )
    ]
    cursor.executemany("""
    INSERT INTO briefings (user_id, type, title, period_label, executive_summary, key_takeaways)
    VALUES (?, ?, ?, ?, ?, ?)
    """, briefings)

    conn.commit()
    conn.close()
