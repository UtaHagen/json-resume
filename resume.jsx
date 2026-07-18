/* global React, ReactDOM */

const { useState, useMemo } = React;


// ─────────────────────────────────────────────────────────────────────
// RESUME DATA — edit me. Skills inside projects/activities MUST exist
// in the top-level `skills` arrays for filtering to find them.
// ─────────────────────────────────────────────────────────────────────
const RESUME = {
  name: "Xialin Huang",
  server: "Planet Earth",
  poweredBy: "Coffee & Curiosity & Friends' cats",
  model: "Forever Student · Artist · Problem Solver · Entrepreneur",
  endpoint: "https://xialin-resume-rho.vercel.app/resume",
  links: [
    { label: "GitHub", url: "https://github.com/UtaHagen" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/xialin-huang-699955249/" },
  ],

  skills: {
    dataEngineering: [
      "python",
      "sql",
      "databricks",
      "pyspark",
      "delta lake",
      "unity catalog",
      "etl/elt pipelines",
      "data warehousing",
      "medallion architecture",
      "data quality validation",
      "rest api",
      "ssis",
    ],
    cloudInfrastructure: [
      "azure",
      "azure data factory",
      "azure functions",
      "azure blob storage",
      "azure devops",
      "ci/cd",
      "workflow orchestration",
    ],
    mlAiAnalytics: [
      "mlflow",
      "forecasting models",
      "clustering",
      "applied llms",
      "power bi",
      "tableau",
    ],
    aiApplication: [
      "duckdb",
      "git",
      "github",
      "figma",
      "canva",
      "tauri",
      "typescript",
      "react",
      "qwen",
      "openai",
      "langgraph",
      "tavily",
      "whisper",
      "agentic ai",
      "speech-to-text",
      "claude code",
      "codex",
      "rag",
    ],
  },

  education: [
    {
      school: "Middle Tennessee State University",
      degree: "B.S. Actuarial Science",
      dates:  "Aug 2022 — May 2024",
      detail: "Dean's List/ Minor in Theatre and Data Science",
    },
    {
      school: "Ningbo University",
      degree: "B.S. Mathematics & Applied Mathematics",
      dates:  "Aug 2020 — Jun 2024",
      detail: "",
    },
  ],

  experience: [
    {
      role:    "Forward Deployed Engineer",
      company: "Construction  Company",
      dates:   "June 2026 — Now",
      bullets: [
        "Designed and deployed an AI-powered document intelligence platform for construction company, automating receipt ingestion, OCR extraction, human-in-the-loop validation, categorization, and structured data storage.",
        "Built a desktop application using Tauri, TypeScript, Python, DuckDB, and LLM APIs, enabling end-to-end document processing through a local-first architecture.",
        "Developed configurable extraction workflows for multiple receipt and invoice formats using OCR, structured outputs, schema validation, and LLM post-processing.",
        "Created an evaluation-driven testing framework that benchmarks prompt, model, and workflow performance against labeled datasets, enabling rapid iteration and measurable quality improvements.",
      ],
      skills: ["typescript", "react", "qwen", "git", "duckdb", "tauri", "codex"],
    },
    {
      role:    "BI Consultant - Data Engineer",
      company: "LBMC, PC",
      dates:   "Janurary 2024 — December 2025",
      bullets: [
        "Worked within LBMC Data Science & Analytics Consulting team, delivering end-to-end data and AI solutions for mid-sized clients across healthcare, retail, utilities, and private equity industries.",
        "Responsibilities included data platform development, ETL pipeline engineering, business intelligence and analytics, machine learning model development, and production deployment of LLM applications.",
      ],
      skills: ["azure", "azure data factory", "azure functions", "azure blob storage", "azure devops", "ci/cd", "workflow orchestration", "rag"],
    },
    {
      role:    "Actuarial Intern",
      company: "Selective Insurance of America",
      dates:   "May 2023 — August 2023",
      bullets: [
        "Worked in personal lines pricing and assisted actuaries with homeowner, auto, and PUP evaluations",
        "Utilized Access to calculate the base rate impact for three PUP states, while debugging in SQL",
        "Employed Excel for policy checks and rate updates to enhance GLM accuracy for both hurricane and non-hurricane states",
        "Enhanced efficiency in policy premium checks through automation by pulling data from the Access rater to Excel",
        "Collaborated with 5 interns to present an action learning project on Selective's methodologies, aiding manufacturing clients in addressing current challenges; subsequently presented to the executive team",
      ],
      skills: ["python", "excel", "access", "macro"],
    },
  ],

  projects: [
    {
      "name": "Actuarial Exams Prepara@on website – YosoraAI",
      "tagline": "An app that uses AI for learning actuarial exams",
      "detail": "Reddit SenOment Pipeline: Developed a DuckDB + Ollama ETL workflow to extract, process, and score subreddit sentiment, generaOng insights into real user needs to guide web applicaOon feature development. Developed custom UI/UX prototypes in Figma and implemented producOon interfaces in TypeScript. Built a full-stack AI Tutor applicaOon using Next.js, FastAPI, Supabase, Clerk, OpenAI APIs. Designed an LLM agent with short and long-term memory, user progress tracking.",
      "link": "",
      "skills": ["duckdb", "ollama", "etl", "figma", "typescript", "next.js", "fastapi", "supabase", "clerk", "openai", "llm", "agentic ai"]
    },
    {
      "name": "OBGYN Healthcare Analytics Platform",
      "tagline": "Healthcare operations analytics and executive reporting",
      "detail": "Partnered with CFO and operations leadership to build a healthcare analytics platform integrating patient, appointment, financial, and clinical data. Developed 13 Power BI dashboards covering patient retention, postpartum follow-up, physician productivity, and revenue performance. Designed patient lifecycle analytics and physician performance evaluation frameworks to support operational decision-making and resource allocation.",
      "link": "",
      "skills": ["power bi", "sql", "healthcare analytics", "data modeling", "business intelligence"]
    },
    {
      "name": "Orthodontics Data Platform Modernization",
      "tagline": "Databricks Lakehouse migration and patient acquisition analytics",
      "detail": "Modernized a multi-location orthodontics organization's data platform by migrating legacy SQL Server workloads to Databricks Lakehouse. Rebuilt core data models using Medallion Architecture, integrated patient, billing, scheduling, and marketing APIs, and developed patient acquisition attribution models using website forms, call center interactions, and ActiveCampaign data. Supported call center analytics using speech transcription and text analysis.",
      "link": "",
      "skills": ["databricks", "pyspark", "sql", "delta lake", "unity catalog", "python", "api integration", "marketing analytics"]
    },
    {
      "name": "Healthcare Expense Risk Analytics",
      "tagline": "Expense anomaly detection and risk monitoring",
      "detail": "Built a transaction risk analytics solution using employee credit card and organizational data. Applied PCA for feature reduction and K-Means clustering to identify anomalous spending patterns, flagging approximately 1-5% of transactions for audit review. Developed Power BI dashboards to support risk investigations and internal control monitoring.",
      "link": "",
      "skills": ["python", "machine learning", "pca", "k-means", "power bi", "risk analytics"]
    },
    {
      "name": "Senior Care Risk Stratification",
      "tagline": "Patient segmentation and fall risk prediction",
      "detail": "Integrated patient health records, chronic condition indicators, household information, and outreach call data to build patient profiles and risk segmentation models. Applied clustering techniques to identify high-risk populations and developed a fall risk prediction model to support proactive care management and resource planning.",
      "link": "",
      "skills": ["python", "machine learning", "clustering", "predictive analytics", "healthcare", "data science"]
    },
    {
      "name": "Retail Demand Forecasting Platform",
      "tagline": "Large-scale sales forecasting and MLOps",
      "detail": "Built a demand forecasting platform for a U.S. home furnishings retailer using PySpark and SQL to process large-scale sales datasets. Developed forecasting models using Prophet and Nixtla, and implemented end-to-end MLOps workflows with MLflow for experiment tracking, model monitoring, and version management.",
      "link": "",
      "skills": ["pyspark", "sql", "prophet", "nixtla", "mlflow", "forecasting", "databricks"]
    },
    {
      "name": "Agentic AI Research Platform",
      "tagline": "Autonomous company research using LLM agents",
      "detail": "Built and deployed an agentic AI research system for a private equity firmusing LangGraph, OpenAI, Tavily, Azure Functions, and MLflow. Automated portfolio company research through tool calling, prompt engineering, evaluation-driven development, and workflow orchestration.",
      "link": "",
      "skills": ["langgraph", "openai", "tavily", "azure functions", "mlflow", "agentic ai", "prompt engineering", "rag", "tool-calling"]
    },
    {
      "name": "Enterprise RAG Knowledge Assistant",
      "tagline": "Institutional knowledge retrieval with citations",
      "detail": "Developed a retrieval-augmented generation (RAG) application on Databricks with document-level citations and source highlighting, enabling users to search and retrieve information from large collections of unstructured PDF documents.",
      "link": "",
      "skills": ["rag", "databricks", "llm", "vector search", "python", "knowledge retrieval"]
    },
    {
      "name": "Document Intelligence Platform",
      "tagline": "OCR and structured data extraction workflow",
      "detail": "Designed a document intelligence workflow combining PaddleOCR, LLM-based extraction, schema validation, confidence scoring, and human-in-the-loop review processes to transform unstructured contracts and business documents into validated structured datasets.",
      "link": "",
      "skills": ["paddleocr", "llm", "document ai", "structured outputs", "validation", "human-in-the-loop", "rag"]
    },
    {
      "name": "Sales Intelligence Assistant",
      "tagline": "Conversation analytics and coaching recommendations",
      "detail": "Developed an automated pipeline that transcribes sales recordings using Whisper, extracts actionable insights with LLMs, generates coaching recommendations for sales representatives, and publishes performance dashboards for management teams.",
      "link": "",
      "skills": ["whisper", "openai", "speech-to-text", "analytics",]
    },
    {
      "name": "Enterprise Data Platform Modernization",
      "tagline": "Databricks Lakehouse migration and governance",
      "detail": "Migrated legacy SQL Server workloads into a Databricks Lakehouse architecture using PySpark, Delta Lake, and Unity Catalog. Improved scalability, governance, and maintainability of enterprise data pipelines while modernizing analytics infrastructure.",
      "link": "",
      "skills": ["databricks", "pyspark", "delta lake", "unity catalog", "sql", "data engineering"]
    },
    {
      "name": "Music Industry Data Warehouse",
      "tagline": "Medallion architecture and enterprise reporting",
      "detail": "Architected a Bronze/Silver/Gold Medallion Architecture data warehouse with ingestion pipelines integrating IBM iAccess systems and downstream analytics workloads, supporting enterprise reporting and business intelligence for a music record company.",
      "link": "",
      "skills": ["databricks", "medallion architecture", "etl", "sql", "data warehousing", "business intelligence"]
    }
  ],

  activities: [
    {
      name:   "Data Science Club @ MTSU —  President",
      dates:  "2023 — 2024",
      detail: "Run workshops; host events; organize volunteer opportunities..",
      skills: ["discord channel", "event organization"],
    },
    {
      name:   "University of Watshington - Enterprener Compitition",
      dates:  "2024",
      detail: "With 2 teammates, build a stock portofolio management system as a startup company for people without professional financial advisors.",
      skills: ["evidence", "react"],
    }
  ],
};

const SKILL_GROUPS = RESUME.skills;

// ─────────────────────────────────────────────────────────────────────
// helper components
// ─────────────────────────────────────────────────────────────────────

function Quote({ children }) {
  return <span className="str">"{children}"</span>;
}

function Skill({ name, selected, dim, onClick }) {
  const cls = ["skill"];
  if (selected) cls.push("selected");
  if (dim && !selected) cls.push("dim");
  return (
    <span
      className={cls.join(" ")}
      onClick={(e) => { e.stopPropagation(); onClick(name); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(name); } }}
    >
      "{name}"
    </span>
  );
}

function SkillArray({ skills, selected, anySelected, onToggle }) {
  return (
    <>
      <span className="punc">[</span>
      {skills.map((s, i) => (
        <React.Fragment key={s}>
          <Skill
            name={s}
            selected={selected.has(s)}
            dim={anySelected && !selected.has(s)}
            onClick={onToggle}
          />
          {i < skills.length - 1 && <span className="punc">, </span>}
        </React.Fragment>
      ))}
      <span className="punc">]</span>
    </>
  );
}

function SkillTag({ name, matched }) {
  return (
    <span className={"skill-tag" + (matched ? " matched" : "")}>"{name}"</span>
  );
}

function SkillTagList({ skills, selected }) {
  return (
    <>
      <span className="punc">[</span>
      {skills.map((s, i) => (
        <React.Fragment key={s}>
          <SkillTag name={s} matched={selected.has(s)} />
          {i < skills.length - 1 && <span className="punc">, </span>}
        </React.Fragment>
      ))}
      <span className="punc">]</span>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// main app
// ─────────────────────────────────────────────────────────────────────

function App() {
  const [selected, setSelected] = useState(() => new Set());
  const [theme, setTheme] = useState("day");
  const anySelected = selected.size > 0;

  const toggle = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleGroup = (groupName) => {
    const groupSkills = SKILL_GROUPS[groupName] || [];

    setSelected((prev) => {
      const next = new Set(prev);
      const allSelected = groupSkills.every((skill) => next.has(skill));

      if (allSelected) {
        groupSkills.forEach((skill) => next.delete(skill));
      } else {
        groupSkills.forEach((skill) => next.add(skill));
      }

      return next;
    });
  };

  const groupState = (groupName) => {
    const groupSkills = SKILL_GROUPS[groupName] || [];
    const selectedCount = groupSkills.filter((skill) => selected.has(skill)).length;

    if (selectedCount === groupSkills.length && groupSkills.length > 0) return "selected";
    if (selectedCount > 0) return "partial";
    return "";
  };
  const clearAll = () => setSelected(new Set());

  const matches = (entrySkills) =>
    !anySelected || entrySkills.some((s) => selected.has(s));

  const visibleProjects    = useMemo(() => RESUME.projects.map((p)    => ({ ...p, _match: matches(p.skills) })),    [selected]);
  const visibleActivities  = useMemo(() => RESUME.activities.map((a)  => ({ ...a, _match: matches(a.skills) })),  [selected]);

  const matchProjects   = visibleProjects.filter((p) => p._match).length;
  const matchActivities = visibleActivities.filter((a) => a._match).length;

  return (
    <div className={`receipt-wrap theme-${theme}`}>
      <div className="receipt">

        {/* brand */}
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"></div>
          <div className="brand-name">{RESUME.name}</div>
        </div>

        {/* curl */}
        <div className="curl">
          <span className="verb">curl -X GET </span>
          <span className="quote">"{RESUME.endpoint}"</span>
        </div>

        {/* http headers */}
        <div className="headers">
          <div><span className="h-key">Server:</span>      <span className="h-val">{RESUME.server}</span></div>
          <div><span className="h-key">X-Powered-By:</span> <span className="h-val">{RESUME.poweredBy}</span></div>
          <div><span className="h-key">Model:</span>       <span className="h-val">{RESUME.model}</span></div>
          <div>
            <span className="h-key">Links:</span>{" "}
            <span className="h-val">
              {RESUME.links.map((link, i) => (
                <React.Fragment key={link.label}>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                  {i < RESUME.links.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </span>
          </div>
          <div>
            <span className="h-key">Theme:</span>{" "}
            <span className="h-val">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setTheme(theme === "day" ? "night" : "day");
                }}
              >
                {theme}
              </a>
            </span>
          </div>
        </div>

        <div className="file-frame">
          <div className="filename">
            <span>~/resume.json</span>
            <span>interactive</span>
          </div>

          <div className="json">
              <div className="brace">{"{"}</div>

              {/* skills section */}
              <div className="row indent-1">
                <span className="key">"skills"</span><span className="punc">: {"{"}</span>
              </div>
              {Object.entries(RESUME.skills).map(([cat, arr]) => {
                const state = groupState(cat);

                return (
                  <div className="row indent-2" key={cat}>
                    <span
                      className={["key", "skill-group-key", state].filter(Boolean).join(" ")}
                      onClick={(e) => { e.stopPropagation(); toggleGroup(cat); }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleGroup(cat);
                        }
                      }}
                      title={`Select all ${cat} skills`}
                    >
                      "{cat}"
                    </span><span className="punc">: </span>
                    <SkillArray
                      skills={arr}
                      selected={selected}
                      anySelected={anySelected}
                      onToggle={toggle}
                    />
                    <span className="punc">,</span>
                  </div>
                );
              })}
              <div className="row indent-1">
                <span className="punc">{"}"}</span>
                <span className="punc">,</span>
                <span className="comment">  // click any skill to filter ↓</span>
              </div>

              {/* filter toolbar */}
              <div className="toolbar">
                {anySelected ? (
                  <>
                    <span className="filter-count">
                      filtering: {[...selected].map((s) => `"${s}"`).join(", ")}
                    </span>
                    <button className="pill" onClick={clearAll}>clear all</button>
                  </>
                ) : (
                  <span className="comment">↑ no filter — showing all entries</span>
                )}
              </div>

              {/* projects */}
              <div className="divider">∗ ∗ ∗</div>
              <div className="row indent-1">
                <span className="key">"projects"</span><span className="punc">: [</span>
                {anySelected && (
                  <span className="comment">  // showing {matchProjects} of {RESUME.projects.length}</span>
                )}
              </div>
              {visibleProjects.map((p, i) => (
                <div className={"entry" + (p._match ? "" : " hidden")} key={p.name}>
                  <div className="row indent-2">
                    <span className="punc">{"{ "}</span>
                    <span className="key">"name"</span><span className="punc">: </span><Quote>{p.name}</Quote>
                    <span className="punc">, </span>
                    <span className="key">"tagline"</span><span className="punc">: </span><Quote>{p.tagline}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"detail"</span><span className="punc">: </span><Quote>{p.detail}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"link"</span><span className="punc">: </span><Quote>{p.link}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"skills"</span><span className="punc">: </span>
                    <SkillTagList skills={p.skills} selected={selected} />
                  </div>
                  <div className="row indent-2">
                    <span className="punc">{"}"}{i < visibleProjects.length - 1 ? "," : ""}</span>
                  </div>
                </div>
              ))}
              <div className="row indent-1"><span className="punc">],</span></div>

              {/* activities */}
              <div className="row indent-1">
                <span className="key">"activities"</span><span className="punc">: [</span>
                {anySelected && (
                  <span className="comment">  // showing {matchActivities} of {RESUME.activities.length}</span>
                )}
              </div>
              {visibleActivities.map((a, i) => (
                <div className={"entry" + (a._match ? "" : " hidden")} key={a.name}>
                  <div className="row indent-2">
                    <span className="punc">{"{ "}</span>
                    <span className="key">"name"</span><span className="punc">: </span><Quote>{a.name}</Quote>
                    <span className="punc">, </span>
                    <span className="key">"dates"</span><span className="punc">: </span><Quote>{a.dates}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"detail"</span><span className="punc">: </span><Quote>{a.detail}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"skills"</span><span className="punc">: </span>
                    <SkillTagList skills={a.skills} selected={selected} />
                  </div>
                  <div className="row indent-2">
                    <span className="punc">{"}"}{i < visibleActivities.length - 1 ? "," : ""}</span>
                  </div>
                </div>
              ))}
              <div className="row indent-1"><span className="punc">],</span></div>

              {/* education */}
              <div className="row indent-1">
                <span className="key">"education"</span><span className="punc">: [</span>
              </div>
              {RESUME.education.map((e, i) => (
                <div className="entry" key={i}>
                  <div className="row indent-2"><span className="punc">{"{"}</span></div>
                  <div className="row indent-3">
                    <span className="key">"school"</span><span className="punc">: </span><Quote>{e.school}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"degree"</span><span className="punc">: </span><Quote>{e.degree}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"dates"</span><span className="punc">: </span><Quote>{e.dates}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"detail"</span><span className="punc">: </span><Quote>{e.detail}</Quote>
                  </div>
                  <div className="row indent-2">
                    <span className="punc">{"}"}{i < RESUME.education.length - 1 ? "," : ""}</span>
                  </div>
                </div>
              ))}
              <div className="row indent-1"><span className="punc">],</span></div>

              {/* experience */}
              <div className="row indent-1">
                <span className="key">"experience"</span><span className="punc">: [</span>
              </div>
              {RESUME.experience.map((x, i) => (
                <div className="entry" key={i}>
                  <div className="row indent-2"><span className="punc">{"{"}</span></div>
                  <div className="row indent-3">
                    <span className="key">"role"</span><span className="punc">: </span><Quote>{x.role}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"company"</span><span className="punc">: </span><Quote>{x.company}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"dates"</span><span className="punc">: </span><Quote>{x.dates}</Quote>
                    <span className="punc">,</span>
                  </div>
                  <div className="row indent-3">
                    <span className="key">"highlights"</span><span className="punc">: [</span>
                  </div>
                  {x.bullets.map((b, j) => (
                    <div className="row indent-3" key={j} style={{ paddingLeft: 80 }}>
                      <Quote>{b}</Quote>
                      {j < x.bullets.length - 1 && <span className="punc">,</span>}
                    </div>
                  ))}
                  <div className="row indent-3"><span className="punc">]</span></div>
                  <div className="row indent-2">
                    <span className="punc">{"}"}{i < RESUME.experience.length - 1 ? "," : ""}</span>
                  </div>
                </div>
              ))}
              <div className="row indent-1"><span className="punc">]</span></div>

              <div className="brace">{"}"}</div>
          </div>
        </div>

        {/* receipt footer */}
        <div className="footer">
          <div className="barcode" aria-hidden="true"></div>
          <div>— end of transmission —</div>
          <div style={{ marginTop: 4 }}>thank you for visiting · come again</div>
        </div>

      </div>
    </div>
  );
}


const themeStyles = document.createElement("style");
themeStyles.textContent = `
.tabs {
  padding-left: 0;
  margin-left: 0;
}

.tab:first-child {
  margin-left: 0;
}

body:has(.theme-night) {
  background: #080b10;
}

.theme-night {
  background: #080b10;
}

.theme-night .receipt {
  background: #111827;
  color: #e8edf3;
  border-color: #263244;
  box-shadow: 0 18px 60px rgba(0,0,0,.55);
}

.theme-night .brand-mark {
  background: #e8edf3;
  box-shadow: inset 0 0 0 2px #c8d3df;
}

.theme-night .brand-name,
.theme-night .h-key,
.theme-night .h-val,
.theme-night .key,
.theme-night .str,
.theme-night .quote,
.theme-night .filename,
.theme-night .curl,
.theme-night .footer,
.theme-night .punc,
.theme-night .brace,
.theme-night .verb,
.theme-night .filter-count,
.theme-night .skill,
.theme-night .skill-tag {
  color: #e8edf3;
}

.theme-night .comment {
  color: #98a6b8;
}

.theme-night a {
  color: #d7ba7d;
}

.theme-night .tabs {
  border-color: #263244;
  padding-left: 0;
  margin-left: 0;
}

.theme-night .tab:first-child {
  margin-left: 0;
}

.theme-night .tab {
  background: #172033;
  color: #cfd8e3;
  border-color: #263244;
}

.theme-night .tab.active {
  background: #243047;
  color: #ffffff;
  border-color: #3a4b66;
}

.theme-night .tab .dot {
  background: #98a6b8;
}

.theme-night .tab.active .dot {
  background: #d7ba7d;
}

.theme-night .file-frame {
  background: #243047;
  border-color: transparent;
  box-shadow: none;
}

.theme-night .filename {
  background: #243047;
  border-color: transparent;
}

.theme-night .json {
  background: #243047;
}

.theme-night .divider {
  color: #627084;
}

.theme-night .skill.selected,
.theme-night .skill-group-key.selected,
.theme-night .skill-tag.matched {
  background: rgba(215, 186, 125, .18);
  color: #f2dfb1;
  border-color: rgba(215, 186, 125, .45);
}

.theme-night .skill.dim,
.theme-night .entry.hidden {
  opacity: .34;
}

.theme-night .pill {
  background: #243047;
  color: #e8edf3;
  border-color: #3a4b66;
}

.theme-night .barcode {
  filter: invert(1) opacity(.78);
}
`;
document.head.appendChild(themeStyles);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
