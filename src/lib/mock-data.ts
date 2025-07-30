import type { Interview } from './types';

const JOB_DESCRIPTION_EXAMPLE = `
  Analyst, Business

  We are looking for a detail-oriented and analytically driven Analyst to join our fast-paced, collaborative team at Coding Ninjas. The ideal candidate has strong data interpretation skills, technical proficiency in analytical tools, and a proactive mindset for solving business challenges. You will work closely with product, marketing, and operations teams to uncover actionable insights and support strategic decision-making.

  Responsibilities:
  - Analyze large datasets to derive meaningful insights and trends that inform product and business strategies
  - Collaborate cross-functionally with engineering, product, and marketing teams to identify key metrics and track performance
  - Build dashboards and reporting tools to monitor KPIs, user behavior, and operational efficiency
  - Conduct ad hoc analyses to support strategic projects and new feature launches
  - Communicate findings and recommendations to stakeholders in a clear and structured manner
  - Ensure data quality, integrity, and governance in all reporting outputs

  Technical Skills:
  - Proficiency in SQL and Excel for data extraction and manipulation
  - Experience with data visualization tools (e.g., Tableau, Power BI, or Looker)
  - Familiarity with programming languages such as Python or R for analytical tasks
  - Understanding of statistical concepts and A/B testing methodologies
  - Knowledge of web analytics tools (e.g., Google Analytics, Mixpanel) is a plus

  Behaviour Competenties
  - Strong problem-solving skills with an analytical and curious mindset
  - Excellent written and verbal communication; able to explain complex findings to non-technical stakeholders
  - High attention to detail and commitment to delivering accurate results
  - Adaptable and comfortable working in a fast-changing, data-driven environment
  - Demonstrated ownership, initiative, and a bias toward action

  Culture Fit
  - Collaborative team player who thrives in a feedback-driven environment
  - Self-motivated, with a willingness to learn and contribute beyond defined responsibilities
  - Empathetic and respectful communicator who values different perspectives
  - Driven by a passion for education, technology, and data-backed innovation

`;

const CANDIDATE_RESUME_EXAMPLE = [`
  Priya Kapoor  
  Senior Business Analyst — Fintech

  Summary:  
  A seasoned Senior Business Analyst with 7+ years of experience leading analytical initiatives in fintech and SaaS domains. Skilled in stakeholder management, data strategy, and defining KPIs that align with product and business goals.

  Experience:
  - Senior Business Analyst, NeoBank Technologies (2021–Present)  
    - Led cross-functional analytics initiatives resulting in a 20% increase in customer retention.  
    - Designed scalable reporting frameworks using SQL and Power BI for leadership.

  - Business Analyst, Infogrid Solutions (2016–2021)  
    - Standardized data collection and analysis processes across teams, improving decision cycles.

  Skills:  
  Advanced SQL, Python (pandas, numpy), Power BI, Tableau, Snowflake, Agile, Product Metrics, Stakeholder Communication  
  `,

    `
  Aarav Mehta  
  Business Analyst — E-commerce

  Summary:  
  A detail-oriented and data-driven Business Analyst with 3 years of experience in using SQL, Excel, and data visualization tools to support business decisions. Adept at translating business requirements into technical solutions and driving process improvements across operations and logistics.

  Experience:
  - Business Analyst, ShopCart Solutions (2022–Present)  
    - Automated dashboard reporting to track logistics KPIs and reduce SLA violations by 18%.  
    - Partnered with inventory and product teams to improve supply forecasting.

  - Associate Analyst, FinServe Analytics (2020–2022)  
    - Conducted regional market trend analyses to support dynamic pricing strategies.

  Skills:  
  SQL, Excel, Tableau, Power BI, Google Analytics, A/B Testing, Agile, JIRA, Supply Chain Analytics  
  `,

    `
  Ishaan Roy  
  Product Analyst — EdTech

  Summary:  
  A results-oriented Product Analyst with 4 years of experience in analyzing user behavior, improving product features, and supporting data-driven product decisions. Strong foundation in data modeling, experimentation, and product lifecycle analysis.

  Experience:
  - Product Analyst, Coding Ninjas (2021–Present)  
    - Conducted user funnel analysis that led to a 10% boost in course completion rates.  
    - Worked closely with product managers to A/B test onboarding flows and improve activation metrics.

  - Junior Product Analyst, SkillForge (2019–2021)  
    - Developed dashboards in Looker to monitor engagement across student cohorts.

  Skills:  
  SQL, Python, Looker, Mixpanel, GA4, Product Analytics, Cohort Analysis, A/B Testing, User Retention Analysis  
  `,

    `
  Sanya Verma  
  Business Analyst — Software/SaaS

  Summary:  
  An analytical Business Analyst with 4 years of experience in SaaS-based solutions. Experienced in data wrangling, user behavior analysis, and optimizing subscription lifecycles. Adept at working with engineering and product teams to convert metrics into growth levers.

  Experience:
  - Business Analyst, SaaSly (2021–Present)  
    - Reduced churn by 12% by integrating customer usage data into subscription renewal modeling.  
    - Implemented product telemetry dashboards using Mixpanel and Metabase.

  - Analyst Intern, CloudNet Systems (2019–2021)  
    - Mapped customer feedback data to product roadmap priorities.

  Skills:  
  SQL, Python, Metabase, Mixpanel, JIRA, API Data Feeds, SaaS KPIs, Churn Modeling, Agile Practices  
  `,

    `
  Riya Narayanan  
  Analyst (Fresher) — Research/EdTech

  Summary:  
  A recent graduate from IIT with a B.S. in Physics and a strong foundation in analytical thinking, data interpretation, and scientific problem-solving. Experienced in research-based projects with exposure to Python and data tools. Eager to apply quantitative skills to business and product analytics.

  Experience:
  - Research Intern, Raman Research Institute (2024)  
    - Simulated quantum dynamics in Python to model physical systems.  
    - Wrote technical reports and presented findings in weekly colloquia.

  - Undergraduate Thesis, IIT
    - Modeled time-dependent behavior of optical systems using differential equation solvers and matplotlib visualizations.

  Skills:  
  Python (numpy, pandas, matplotlib), Excel, Git, LaTeX, Research Writing, Problem Solving, SQL (beginner), Data Interpretation  
  `
];

export const mockInterviews: Interview[] = [
  {
    id: '1',
    role: 'Senior Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-10T14:00:00Z',
    status: 'Active',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    candidateResume: CANDIDATE_RESUME_EXAMPLE[0],
  },
  {
    id: '2',
    role: 'Junior Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-12T14:00:00Z',
    status: 'Past',
    jobDescription: 'Seeking an experienced product manager to lead our mobile application team...',
    candidateResume: 'John Smith resume...',
  },
  // {
  //   id: '3',
  //   role: 'UX/UI Designer',
  //   company: 'Creative Labs',
  //   date: '2024-08-22T11:30:00Z',
  //   status: 'Upcoming',
  //   jobDescription: 'We need a designer with a passion for creating beautiful and intuitive user experiences...',
  //   candidateResume: 'Emily White resume...',
  // },
  // {
  //   id: '4',
  //   role: 'Backend Developer',
  //   company: 'Data Systems',
  //   date: '2024-07-30T09:00:00Z',
  //   status: 'Past',
  //   jobDescription: 'Backend developer skilled in Node.js and database management...',
  //   candidateResume: 'Michael Brown resume...',
  // },
  // {
  //   id: '5',
  //   role: 'DevOps Engineer',
  //   company: 'Cloud Services',
  //   date: '2024-07-25T16:00:00Z',
  //   status: 'Past',
  //   jobDescription: 'Experienced DevOps engineer to manage our CI/CD pipeline and cloud infrastructure...',
  //   candidateResume: 'Sarah Green resume...',
  // },
];
