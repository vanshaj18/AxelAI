import type { Interview } from './types';

const JOB_DESCRIPTION_EXAMPLE = `
  Analyst, Business Intelligence  
  Location: Gurgaon (Hybrid) | Team: Data & Strategy

  Coding Ninjas is looking for a sharp, data-driven Analyst to join our Business Intelligence team. In this role, you’ll work at the intersection of data, strategy, and execution—helping product, marketing, and operations teams make smarter decisions faster. You'll play a key part in surfacing insights that drive student engagement, course performance, and platform growth.

  🚀 What You'll Do:
  - Analyze user behavior, product funnels, and course performance to drive data-backed decisions across the org
  - Build intuitive dashboards and automated reports to track business KPIs such as retention, conversion, and CAC-to-LTV
  - Partner with product and growth teams to set up and analyze A/B experiments on features and marketing campaigns
  - Translate raw data into clear narratives and visualizations to support high-stakes business reviews and investor decks
  - Identify bottlenecks in student journeys (from lead to learning to placement) and suggest data-led interventions
  - Monitor data pipelines and work with engineering to improve data integrity, latency, and structure

  🛠 Technical Requirements:
  - Strong SQL skills—comfortable writing optimized, complex queries across multiple tables
  - Basic and Advanced excel skills with good cross sheet handling. VLOOKUP, MERGES and more.
  - Experience with BI tools like Tableau, Power BI, or Google Data Studio; bonus if you've built executive dashboards
  - Working knowledge of Python (Pandas, NumPy, Matplotlib) or R for deep-dive analyses
  - Experience working with event data or product analytics platforms (e.g., Mixpanel, Amplitude) is a plus
  - Basic understanding of statistics and experimentation (A/B tests, t-tests, conversion analysis)

  🤝 What Makes You a Good Fit:
  - 1–3 years of hands-on experience in a business/data analyst role (edtech or consumer tech preferred)
  - You ask the “why” before jumping into the “how”—and you think in terms of systems, not just queries
  - Excellent communicator who can distill technical findings into actionable insights for non-technical teams
  - Self-starter with a strong sense of ownership and willingness to dive into ambiguity
  - Passionate about education, student outcomes, and making learning more data-driven

  🌱 Our Culture:
  - We believe in rapid learning, thoughtful iteration, and celebrating progress  
  - You’ll be joining a team that’s as collaborative as it is driven—we respect opinions, challenge ideas, and build together  
  - Every analyst is empowered to shape product and business outcomes—not just report on them  
  `;
const CANDIDATE_RESUME_EXAMPLE = 
  `
    Priya Kapoor
    Mumbai, India • (982) 302-4456 • priya.kapoor@gmail.com • linkedin.com/in/priyakapoor
    Senior Business Analyst — Fintech

    Summary:
    A seasoned Senior Business Analyst with 7+ years of experience leading cross-functional analytics initiatives in fintech and SaaS domains. Proficient in stakeholder management, KPI design, and data visualization for strategic reporting.

    Experience:

    Senior Business Analyst, NeoBank Technologies (2021–Present)

    Increased customer retention by 20% through user segmentation analytics.

    Built scalable reporting pipelines in SQL and Power BI for leadership reviews.

    Business Analyst, Infogrid Solutions (2016–2021)

    Standardized company-wide data reporting, reducing turnaround time by 30%.

    Conducted customer churn analysis that improved product decisions.

    Skills:
    SQL, Python (pandas, numpy), Power BI, Tableau, Snowflake, Agile, OKRs, Stakeholder Communication

    Education:
    Bachelor of Engineering in Information Technology, University of Pune (2012–2016)

    Certifications:
    Certified Business Analyst Professional (CBAP) — IIBA, 2023
    Microsoft Certified: Data Analyst Associate — 2022

    Projects:

    Customer Segmentation for Retention
    Developed segmentation models using k-means and churn indicators; improved campaign conversion by 12%.

    Executive Dashboard Development
    Built Power BI dashboards with auto-refresh pipelines for KPIs tracking across business units.
  `;



export const mockInterviews: Interview[] = [
  {
    id: '1',
    role: 'Senior Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-10T14:00:00Z',
    status: 'Active',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    shortDescription: 'Data-driven analyst role focused on surfacing insights to drive student engagement and platform growth.',
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  },
  {
    id: '2',
    role: 'Business Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-20T14:00:00Z',
    status: 'Past',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    shortDescription: 'Seeking an experienced business analyst to build dashboards and analyze A/B experiments.',
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  },
  {
    id: '3',
    role: 'Junior Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-22T11:30:00Z',
    status: 'Active',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    shortDescription: 'Entry-level analyst to monitor data pipelines and work with engineering to improve data integrity.',
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  },
  {
    id: '4',
    role: 'Product Analyst',
    company: 'Coding Ninjas',
    date: '2025-09-05T10:00:00Z',
    status: 'Past',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    shortDescription: 'Product-focused analyst to support product teams with data-driven experimentation.',
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  },
  {
    id: '5',
    role: 'Business Intelligence Analyst',
    company: 'Coding Ninjas',
    date: '2025-09-15T15:30:00Z',
    status: 'Past',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    shortDescription: 'BI Analyst to translate complex data into clear business insights for strategic planning.',
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  }  
];
