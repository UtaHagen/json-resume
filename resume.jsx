/* global React, ReactDOM */

const { useState, useMemo } = React;


// ─────────────────────────────────────────────────────────────────────
// RESUME DATA — edit me. Skills inside projects/activities MUST exist
// in the top-level `skills` arrays for filtering to find them.
// ─────────────────────────────────────────────────────────────────────
const RESUME = {
  name: "Xialin Huang",
  server: "Anywhere",
  poweredBy: "Coffee & curiosity & friends' cats",
  Links: "forever student · artist · problem solver · entrepreneur",
  endpoint: "https://yourname.dev/resume",

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
    tools: [
      "duckdb",
      "git",
      "github",
      "figma",
      "canva",
    ],
  },

  education: [
    {
      school: "Middle Tennessee State University",
      degree: "B.S. Computer Science",
      dates:  "Aug 2023 — May 2027",
      detail: "GPA 3.8 / Dean's List / Honors College",
    },
  ],

  experience: [
    {
      role:    "Software Engineering Intern",
      company: "Acme Labs",
      dates:   "May 2025 — Aug 2025",
      bullets: [
        "Shipped a real-time dashboard used by 40+ internal users",
        "Cut p95 API latency by 38% with a Redis cache layer",
        "Wrote 200+ unit tests; raised coverage from 51% → 86%",
      ],
      skills: ["typescript", "react", "node.js", "postgres", "docker", "aws"],
    },
    {
      role:    "Undergraduate Research Assistant",
      company: "MTSU CS Dept.",
      dates:   "Jan 2025 — Present",
      bullets: [
        "Built an ML pipeline classifying 12K+ research abstracts",
        "Co-author on a paper accepted to a regional conference",
      ],
      skills: ["python", "flask", "postgres", "linux"],
    },
  ],

  projects: [
    {
      name:    "Trailmix",
      tagline: "Crowdsourced hiking trail conditions",
      detail:  "Mobile-first map app with user-submitted condition reports & offline caching.",
      skills:  ["react", "next.js", "typescript", "mongodb", "tailwind"],
      link:    "github.com/you/trailmix",
    },
    {
      name:    "ledger.sh",
      tagline: "CLI personal-finance ledger",
      detail:  "Plain-text accounting tool. 4-week sprint, 1.2K LOC, ~120 GitHub stars.",
      skills:  ["python", "sql", "linux", "git"],
      link:    "github.com/you/ledger-sh",
    },
    {
      name:    "Stagelight",
      tagline: "Live-event seat-finder bot",
      detail:  "Polls ticket APIs, alerts on resale dips. Currently watching 8 venues.",
      skills:  ["node.js", "express", "typescript", "postgres", "docker"],
      link:    "github.com/you/stagelight",
    },
    {
      name:    "Paperwhite",
      tagline: "Daily reading-streak tracker",
      detail:  "Side-project that became how I read 40 books last year. PWA, no signup.",
      skills:  ["react", "javascript", "html/css", "tailwind"],
      link:    "paperwhite.app",
    },
    {
      name:    "abstract-sort",
      tagline: "Research paper classifier",
      detail:  "BERT-based labeler for ML research abstracts. 91% F1 on holdout set.",
      skills:  ["python", "flask", "postgres"],
      link:    "github.com/you/abstract-sort",
    },
    {
      name:    "Pinpoint",
      tagline: "Lost-and-found for college campuses",
      detail:  "Hackathon winner — Hack MT 2024. Built in 36 hours by a team of 3.",
      skills:  ["java", "c++", "sql", "figma"],
      link:    "devpost.com/pinpoint",
    },
  ],

  activities: [
    {
      name:   "ACM @ MTSU — Vice President",
      dates:  "2024 — Present",
      detail: "Run weekly workshops; organize the annual hackathon (200+ attendees).",
      skills: ["python", "javascript", "git", "figma"],
    },
    {
      name:   "Open Source — react-tinypath",
      dates:  "2024",
      detail: "Maintainer. 80+ stars, used in 14 downstream packages on npm.",
      skills: ["typescript", "react"],
    },
    {
      name:   "Tutoring — University Learning Center",
      dates:  "2023 — 2024",
      detail: "Tutored ~30 students/week in intro programming & data structures.",
      skills: ["java", "c++", "python"],
    },
    {
      name:   "Hackathon — Hack MT 2024 (1st place)",
      dates:  "Oct 2024",
      detail: "Built Pinpoint. Awarded best campus-life project.",
      skills: ["java", "c++", "sql", "figma"],
    },
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

const PAGES = [
  { id: "skills",     file: "skills.json",     mode: "interactive" },
  { id: "background", file: "background.json", mode: "read-only"   },
];

function App() {
  const [selected, setSelected] = useState(() => new Set());
  const [page, setPage] = useState("skills");
  const activePage = PAGES.find((p) => p.id === page);
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
    <div className="receipt-wrap">
      <div className="receipt">

        {/* brand */}
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"></div>
          <div className="brand-name">{RESUME.name}</div>
        </div>

        {/* curl */}
        <div className="curl">
          <span className="verb">curl -X GET </span>
          <span className="quote">"{RESUME.endpoint}/{activePage.file}"</span>
        </div>

        {/* http headers */}
        <div className="headers">
          <div><span className="h-key">Server:</span>      <span className="h-val">{RESUME.server}</span></div>
          <div><span className="h-key">X-Powered-By:</span><span className="h-val">{RESUME.poweredBy}</span></div>
          <div><span className="h-key">Model:</span>       <span className="h-val">{RESUME.model}</span></div>
        </div>

        {/* file tabs */}
        <div className="tabs" role="tablist">
          {PAGES.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={page === p.id}
              className={"tab" + (page === p.id ? " active" : "")}
              onClick={() => setPage(p.id)}
            >
              <span className="dot" aria-hidden="true"></span>{p.file}
            </button>
          ))}
        </div>

        <div className="file-frame">
          <div className="filename">
            <span>~/resume/{activePage.file}</span>
            <span>{activePage.mode}</span>
          </div>

          {/* ── skills tab ── */}
          {page === "skills" && (
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
              <div className="row indent-1"><span className="punc">]</span></div>

              <div className="brace">{"}"}</div>
            </div>
          )}

          {/* ── background tab ── */}
          {page === "background" && (
            <div className="json">
              <div className="brace">{"{"}</div>

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
          )}
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
