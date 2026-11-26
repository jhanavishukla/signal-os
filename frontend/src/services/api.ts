import { Industry, Topic, IntelligenceDevelopment, Briefing, UserProfile } from '../types';

const API_BASE = '/api/v1';

// Fallback robust mock dataset in case backend is loading/offline
export const mockData = {
  profile: {
    id: 1,
    email: "alex.chen@signalos.dev",
    full_name: "Alex Chen",
    role_title: "Staff AI Architect & Technology Strategist",
    expertise_level: "advanced",
    learning_goals: "Track state-of-the-art reasoning architectures, distributed inference cost reduction, and autonomous multi-agent systems.",
    briefing_frequency: "daily",
    followed_industries: [
      { id: 1, name: "Artificial Intelligence", slug: "artificial-intelligence", icon: "Cpu" },
      { id: 2, name: "Cloud & Distributed Systems", slug: "cloud-infrastructure", icon: "Server" }
    ],
    followed_topics: [
      { id: 1, name: "Agentic Workflows", slug: "agentic-workflows", is_trending: true, followers_count: 1420, industry_id: 1 },
      { id: 2, name: "Reasoning Models", slug: "reasoning-models", is_trending: true, followers_count: 1980, industry_id: 1 },
      { id: 5, name: "Serverless GPU Infrastructure", slug: "serverless-gpu", is_trending: true, followers_count: 920, industry_id: 2 }
    ]
  } as UserProfile,

  industries: [
    {
      id: 1,
      name: "Artificial Intelligence",
      slug: "artificial-intelligence",
      description: "Foundational models, agentic workflows, autonomous systems, and neural architectures.",
      icon: "Cpu",
      topics: [
        { id: 1, name: "Agentic Workflows", slug: "agentic-workflows", is_trending: true, followers_count: 1420, industry_id: 1 },
        { id: 2, name: "Reasoning Models", slug: "reasoning-models", is_trending: true, followers_count: 1980, industry_id: 1 },
        { id: 3, name: "Open-Weights LLMs", slug: "open-weights-llms", is_trending: false, followers_count: 860, industry_id: 1 },
        { id: 4, name: "Multi-Modal Robotics", slug: "multimodal-robotics", is_trending: true, followers_count: 670, industry_id: 1 }
      ]
    },
    {
      id: 2,
      name: "Cloud & Distributed Systems",
      slug: "cloud-infrastructure",
      description: "Scalable microservices, Kubernetes ecosystems, edge computing, and bare metal optimizations.",
      icon: "Server",
      topics: [
        { id: 5, name: "Serverless GPU Infrastructure", slug: "serverless-gpu", is_trending: true, followers_count: 920, industry_id: 2 },
        { id: 6, name: "eBPF & Kernel Observability", slug: "ebpf-observability", is_trending: false, followers_count: 510, industry_id: 2 },
        { id: 7, name: "WebAssembly Runtime", slug: "wasm-runtime", is_trending: false, followers_count: 440, industry_id: 2 }
      ]
    },
    {
      id: 3,
      name: "Fintech & Web3 Systems",
      slug: "fintech-defi",
      description: "Digital asset rails, real-time settlement platforms, algorithmic trading, and cryptographic safety.",
      icon: "Coins",
      topics: [
        { id: 8, name: "Real-time Settlement Rails", slug: "real-time-settlement", is_trending: true, followers_count: 780, industry_id: 3 },
        { id: 9, name: "Zero-Knowledge Auditing", slug: "zk-auditing", is_trending: false, followers_count: 390, industry_id: 3 }
      ]
    },
    {
      id: 4,
      name: "Biotech & Healthcare Tech",
      slug: "biotech-genomics",
      description: "Computational biology, genomic sequencing breakthroughs, and AI drug synthesis pipelines.",
      icon: "Dna",
      topics: [
        { id: 10, name: "Protein Folding & AlphaFold Systems", slug: "protein-folding", is_trending: true, followers_count: 610, industry_id: 4 }
      ]
    }
  ] as Industry[],

  developments: [
    {
      id: 1,
      title: "Frontier Multi-Agent Coordination Protocol Standardized for Autonomous Tool Use",
      summary: "Consortium of industry leaders released the Open Agentic Interface standard, enabling deterministic handoffs between heterogeneous autonomous agents.",
      why_it_matters: "Solves the fragmentation across bespoke multi-agent frameworks and cuts latency by 45% during distributed task execution.",
      implications: "Enterprises can eliminate vendor lock-in and chain specialized reasoning agents across cloud boundaries seamlessly.",
      industry_id: 1,
      industry_name: "Artificial Intelligence",
      topic_id: 1,
      topic_name: "Agentic Workflows",
      source_name: "AI Systems Journal",
      source_url: "https://arxiv.org/abs/2603.09101",
      published_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      importance_score: 9.4,
      relevance_score: 9.8,
      sentiment: "bullish",
      status: "critical",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Next-Gen Inference Scaling Eliminates Pre-fill Bottlenecks in Deep Reasoning Models",
      summary: "New hierarchical speculative decoding algorithm reduces memory bandwidth pressure by 3.8x for test-time compute chains.",
      why_it_matters: "Drastically drives down token cost for reasoning-heavy pipelines, making chain-of-thought economically feasible for consumer applications.",
      implications: "Lowers barrier to entry for complex autonomous agents requiring continuous multi-step reflection.",
      industry_id: 1,
      industry_name: "Artificial Intelligence",
      topic_id: 2,
      topic_name: "Reasoning Models",
      source_name: "Compute Architecture Weekly",
      source_url: "https://cparch.tech/deep-reasoning-scaling",
      published_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      importance_score: 9.1,
      relevance_score: 9.5,
      sentiment: "bullish",
      status: "verified",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Bare-Metal Serverless GPU Slicing Framework Cuts Cold-Starts to Under 12ms",
      summary: "Virtual GPU virtualization hypervisor allows zero-overhead partition swaps across Nvidia and AMD architectures dynamically.",
      why_it_matters: "Transforms AI backend unit economics by removing idle GPU reservations for intermittent workload patterns.",
      implications: "Cloud billings for bursty inference workloads are projected to drop by up to 60%.",
      industry_id: 2,
      industry_name: "Cloud & Distributed Systems",
      topic_id: 5,
      topic_name: "Serverless GPU Infrastructure",
      source_name: "Cloud Native Review",
      source_url: "https://cloudnativereview.io/bare-metal-gpu-slicing",
      published_at: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      importance_score: 8.7,
      relevance_score: 8.9,
      sentiment: "disrupt",
      status: "verified",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Open-Weights 70B Model Matches Frontier Proprietary Benchmarks on Code Synthesis",
      summary: "New synthetic alignment distillation pipeline allows an open model to surpass closed commercial APIs in multi-file refactoring benchmarks.",
      why_it_matters: "Accelerates self-hosted enterprise deployments and diminishes dependence on proprietary closed-source API gateways.",
      implications: "Enterprises with strict data sovereignty mandates can now achieve state-of-the-art developer assistance on-premise.",
      industry_id: 1,
      industry_name: "Artificial Intelligence",
      topic_id: 3,
      topic_name: "Open-Weights LLMs",
      source_name: "HuggingFace Research",
      source_url: "https://huggingface.co/blog/open-sota-synthesis",
      published_at: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
      importance_score: 8.8,
      relevance_score: 9.2,
      sentiment: "bullish",
      status: "verified",
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: "Zero-Knowledge Audit Protocol Adopted by Top 5 Institutional Custodians",
      summary: "Cryptographic proof-of-solvency protocol allows continuous balance sheet verification without leaking private trading strategies.",
      why_it_matters: "Mitigates systemic counterparty risk without compromising proprietary market operations.",
      implications: "Regulatory scrutiny can shift from reactive audits to automated cryptographic assertions.",
      industry_id: 3,
      industry_name: "Fintech & Web3 Systems",
      topic_id: 9,
      topic_name: "Zero-Knowledge Auditing",
      source_name: "Institutional Crypto Review",
      source_url: "https://cryptoinsider.com/zk-audit-custody",
      published_at: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      importance_score: 8.2,
      relevance_score: 7.9,
      sentiment: "neutral",
      status: "emerging",
      created_at: new Date().toISOString()
    }
  ] as IntelligenceDevelopment[],

  briefings: [
    {
      id: 1,
      title: "Morning Executive Intelligence Briefing",
      type: "daily",
      period_label: "Today's Briefing — Nov 24, 2026",
      executive_summary: "Frontier standardization in autonomous agent protocols combined with breakthrough inference pre-fill reductions are unlocking production-scale agent workflows. Concurrently, bare-metal serverless GPU hypervisors are resolving critical cold-start latency constraints.",
      key_takeaways: "• Open Agentic Interface standard reduces multi-agent handoff latency by 45%.\n• Hierarchical speculative decoding drops test-time reasoning costs substantially.\n• Serverless GPU slicing reaches 12ms cold starts, improving compute unit economics.\n• Open-weights 70B model parity marks a milestone for sovereign enterprise AI.",
      created_at: new Date().toISOString(),
      developments_count: 4
    },
    {
      id: 2,
      title: "Weekly Strategic Industry Macro Briefing",
      type: "weekly",
      period_label: "Week 47 Strategic Synthesis (Nov 17 - Nov 24)",
      executive_summary: "This week's macro shifts highlight decisive convergence between test-time reasoning compute and low-latency infrastructure. The barrier between research prototypes and high-throughput production autonomous agents is collapsing faster than projected.",
      key_takeaways: "• Massive capital realignment toward autonomous execution frameworks.\n• Enterprise focus pivoted from general-purpose chatbots to structured domain agents.\n• Cloud hyperscalers respond with specialized sub-second GPU partition spin-ups.",
      created_at: new Date(Date.now() - 4 * 86400 * 1000).toISOString(),
      developments_count: 12
    }
  ] as Briefing[]
};

export const apiService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error("API not reachable");
      return await res.json();
    } catch {
      return mockData.profile;
    }
  },

  async updateProfile(data: Partial<UserProfile> & { industry_ids?: number[]; topic_ids?: number[] }): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
      return await res.json();
    } catch {
      return { ...mockData.profile, ...data };
    }
  },

  async getIndustries(): Promise<Industry[]> {
    try {
      const res = await fetch(`${API_BASE}/industries`);
      if (!res.ok) throw new Error("API not reachable");
      return await res.json();
    } catch {
      return mockData.industries;
    }
  },

  async getIntelligence(params?: { industry_id?: number; topic_id?: number; min_importance?: number }): Promise<IntelligenceDevelopment[]> {
    const url = new URL(`${window.location.origin}${API_BASE}/intelligence`);
    if (params?.industry_id) url.searchParams.set("industry_id", String(params.industry_id));
    if (params?.topic_id) url.searchParams.set("topic_id", String(params.topic_id));
    if (params?.min_importance) url.searchParams.set("min_importance", String(params.min_importance));

    try {
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      // In development or when offline, fallback to filtered mockData
      // while logging the network notice
      console.warn("API request failed, falling back to mock dataset:", err);
      let filtered = [...mockData.developments];
      if (params?.industry_id) filtered = filtered.filter(d => d.industry_id === params.industry_id);
      if (params?.topic_id) filtered = filtered.filter(d => d.topic_id === params.topic_id);
      if (params?.min_importance) filtered = filtered.filter(d => d.importance_score >= params.min_importance!);
      return filtered;
    }
  },

  async getBriefings(type?: string): Promise<Briefing[]> {
    try {
      const url = new URL(`${window.location.origin}${API_BASE}/briefings`);
      if (type) url.searchParams.set("type", type);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("API not reachable");
      return await res.json();
    } catch {
      if (type) return mockData.briefings.filter(b => b.type === type);
      return mockData.briefings;
    }
  },

  async toggleFollowTopic(topicId: number): Promise<{ status: string; action: string; topic_id: number }> {
    try {
      const res = await fetch(`${API_BASE}/topics/${topicId}/toggle-follow`, { method: "POST" });
      if (!res.ok) throw new Error("Toggle failed");
      return await res.json();
    } catch {
      return { status: "success", action: "toggled", topic_id: topicId };
    }
  }
};
