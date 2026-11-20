/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "BinaryBalls",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "tiwariparth200514@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "READEASE",
      tag: "Full-Stack · Accessibility", color: "#3dc8ff",
      url: "https://github.com/BinaryBalls/ReadEase", cta: "View on GitHub →",
      img: "assets/projects/readease.png",
      desc: "Dyslexia-assistance reading platform. FastAPI backend with 35+ REST endpoints, React/Redux frontend, JWT (RS256) and Google OAuth, a cascading Gemini to Groq fallback pipeline for text simplification, and word-level highlighted text-to-speech. Scored an O grade on the external viva.",
    },
    {
      title: "SCRPQA",
      tag: "RAG · NLP", color: "#f1e05a",
      url: "https://github.com/BinaryBalls/scrpqa", cta: "View on GitHub →",
      img: "assets/projects/scrpqa.png",
      desc: "RAG-based Q&A system over 700 Bhagavad Gita shlokas. Dual-index ChromaDB retrieval (Sanskrit + English), bi-encoder and cross-encoder re-ranking, adaptive re-retrieval, evaluated with RAGAS and served through LLaMA 3.3 70B on Groq.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "scrpqa",
    "ReadEase",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "RepoName": "assets/projects/repo-name.png",
  },

  langColors: {
    JavaScript: "#5c5af1", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen (bar values are 0-100, adjust to taste) ----
  skills: [
    { group: "AI · ML", items: [
      ["Python", 85], ["LLM Integration", 82],
      ["RAG Systems", 80], ["NLP & Embeddings", 75],
      ["RAGAS · BERTScore Evaluation", 70], ["CV & ML Fundamentals", 60],
    ]},
    { group: "Full-Stack", items: [
      ["React · Redux Toolkit", 80], ["TypeScript · JavaScript", 78],
      ["FastAPI · REST Design", 85], ["MongoDB · ChromaDB", 75],
      ["JWT · OAuth 2.0", 78],
    ]},
    { group: "Core CS", items: [
      ["Data Structures & Algorithms", 78], ["Competitive Programming", 70],
      ["DBMS", 72],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
