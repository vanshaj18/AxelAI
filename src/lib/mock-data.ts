import type { Interview } from './types';

const JOB_DESCRIPTION_EXAMPLE = 
  `
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

const CANDIDATE_RESUME_EXAMPLE = [
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
  `,
  `
    Aarav Mehta
    Bangalore, India • (973) 884-1123 • aarav.mehta@email.com • linkedin.com/in/aaravmehta
    Business Analyst — E-commerce

    Summary:
    Detail-oriented Business Analyst with 3 years in logistics and operations analytics. Adept at building dashboards, process automations, and A/B testing strategies for performance optimization.

    Experience:

    Business Analyst, ShopCart Solutions (2022–Present)

    Automated logistics KPI dashboards; SLA violations reduced by 18%.

    Collaborated with product teams to forecast inventory, reducing stockouts.

    Associate Analyst, FinServe Analytics (2020–2022)

    Conducted trend analysis to improve dynamic pricing models by 10%.

    Skills:
    SQL, Excel, Tableau, Google Analytics, Power BI, JIRA, Agile, Forecasting, A/B Testing

    Education:
    Bachelor of Technology in Industrial Engineering, NIT Trichy (2016–2020)

    Certifications:
    Certified Analytics Professional (CAP) — INFORMS, 2023

    Projects:

    Supply Chain Delay Predictor
    Built regression model to predict shipping delays using order metadata and weather APIs.

    Pricing Elasticity Experimentation
    Analyzed A/B pricing tests across regions to increase average order value.
  `,
  `
    Riya Narayanan
    Chennai, India • (983) 202-9812 • riya.narayanan@iit.ac.in • linkedin.com/in/riyanarayanan
    Analyst (Fresher) — Research/EdTech

    Summary:
    Recent B.S. Physics graduate from IIT with strong research exposure and Python skills. Capable of translating scientific insight into data-driven business analysis.

    Experience:

    Research Intern, Raman Research Institute (2024)

    Simulated quantum dynamics with Python; published internal technical report.

    Undergraduate Thesis, IIT Madras (2023)

    Modeled optical systems using ODE solvers; validated simulation against experimental results.

    Skills:
    Python (pandas, numpy, matplotlib), Excel, Git, LaTeX, SQL (beginner), Critical Thinking

    Education:
    B.S. in Physics, IIT Madras (2019–2024)

    Certifications:
    Data Analytics with Python — Coursera (IBM), 2023

    Projects:

    Quantum System Visualizer
    Developed simulation toolkit for quantum tunneling and wavefunction propagation.

    Physics-to-Business Insights Hackathon
    Won 2nd prize in data challenge interpreting physical modeling for energy demand forecasting.
  `,
  `
    Ananya Deshmukh
    Product Analyst — Fintech | Mumbai, India
    📧 ananya.deshmukh@email.com | linkedin.com/in/ananya-deshmukh

    Summary:
    Results-driven Product Analyst with 5 years of experience in the fintech sector. Specializes in user behavior analytics, KPI optimization, and A/B testing to improve product engagement and conversion. Proven track record of translating complex data into actionable insights.

    Experience:

    Product Analyst, PaySmart Technologies (2021–Present)

    Increased monthly active users by 18% through feature-level engagement analysis.

    Led the redesign of user onboarding using A/B testing, improving retention by 22%.

    Data Analyst, FinanceHub India (2019–2021)

    Built predictive models to forecast transaction fraud risk using Python and XGBoost.

    Education:
    B.Tech in Information Technology, VJTI, Mumbai — 2015–2019

    Projects:

    Built a churn prediction dashboard using Streamlit and scikit-learn

    Modeled user flow drop-offs using session-level Mixpanel data

    Certifications:

    Google Advanced Data Analytics Certificate (2023)

    Pragmatic Institute — Product Analytics (2022)

    Skills:
    SQL, Python, Mixpanel, Looker, A/B Testing, GA4, Product Metrics, Streamlit
  `,
  `
    Varun Nair
    Business Analyst — Healthcare | Bangalore, India
    📧 varun.nair@email.com | linkedin.com/in/varun-nair-analytics

    Summary:
    Business Analyst with 6+ years of experience in the healthcare and insurance industries. Skilled in identifying inefficiencies through claims data analysis, building BI dashboards, and optimizing processes through stakeholder collaboration.

    Experience:

    Business Analyst, MediSure Analytics (2020–Present)

    Reduced claim approval time by 30% by revamping internal workflows based on data audit.

    Created Tableau dashboards for senior leadership to track patient satisfaction KPIs.

    Data Analyst, MaxCare Health Group (2017–2020)

    Built ETL pipelines to centralize patient and billing data across 4 departments.

    Education:
    B.E. in Biomedical Engineering, Manipal Institute of Technology — 2013–2017

    Projects:

    Automated claims anomaly detection system using rule-based Python scripts

    Built real-time patient flow heatmap using hospital RFID data

    Certifications:

    Tableau Desktop Specialist (2023)

    Lean Six Sigma Green Belt (2022)

    Skills:
    SQL, Tableau, Power BI, Excel VBA, Healthcare Data Compliance, Python, ETL
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
    shortDescription: 'Coding Ninjas is looking for a sharp, data-driven Analyst to join our Business Intelligence team. In this role, youll work at the intersection of data, strategy, and execution—helping product, marketing, and operations teams make smarter decisions faster. Youll play a key part in surfacing insights that drive student engagement, course performance, and platform growth.' ,
    candidateResume: CANDIDATE_RESUME_EXAMPLE[0],
    transcript: `Interviewer: Hello, I'm Axel from Coding Ninjas. I will be conducting your interview for the Senior Analyst role. Why don't we start with you telling me a bit about yourself and your experience?
    
    Candidate: Hi Axel, thanks for having me. I'm Priya Kapoor, a Senior Business Analyst with over 7 years of experience in fintech. I specialize in turning data into strategic insights, particularly around user behavior and retention. At NeoBank, I led a project that increased customer retention by 20% by analyzing user segmentation. I'm proficient in SQL, Power BI, and Python.`
  },
  {
    id: '2',
    role: 'Business Analyst',
    company: 'Coding Ninjas',
    date: '2025-08-20T14:00:00Z',
    status: 'Upcoming',
    jobDescription: 'Seeking an experienced business analyst for our business roles ...',
    shortDescription: 'Seeking an experienced business analyst for our business roles ...',
    candidateResume: 'Priya Kapoor resume...',
  },
  {
    id: '3',
    role: 'Junior Analyst',
    company: 'Coding Ninjas',
    date: '2024-08-22T11:30:00Z',
    status: 'Past',
    jobDescription: 'Looking for an analyst who could deliver value to our team and help...',
    shortDescription: 'Looking for an analyst who could deliver value to our team and help...',
    candidateResume: 'Priya Kapoor resume...',
    transcript: `Interviewer: Can you explain the difference between UNION and UNION ALL in SQL?

    Candidate: Both are used to combine result sets from two or more SELECT statements. UNION removes duplicate records, whereas UNION ALL includes all records, including duplicates. So, UNION ALL is faster.`
  },
  {
    id: '4',
    role: 'Product Analyst',
    company: 'Coding Ninjas',
    date: '2020-05-18T10:00:00Z',
    status: 'Past',
    jobDescription: 'We are seeking a product analyst with a strong understanding of user behavior data and experience supporting product teams through data-driven experimentation.',
    shortDescription: 'We are seeking a product analyst with a strong understanding of user behavior data and experience supporting product teams through data-driven experimentation.',
    candidateResume: 'Priya Kapoor resume...',
  },
  {
    id: '5',
    role: 'Business Intelligence Analyst',
    company: 'Coding Ninjas',
    date: '2019-11-07T15:30:00Z',
    status: 'Past',
    jobDescription: 'Looking for a BI Analyst who can translate complex data into clear business insights to support strategic planning and operational improvements.',
    shortDescription: 'Looking for a BI Analyst who can translate complex data into clear business insights to support strategic planning and operational improvements.',
    candidateResume: 'Priya Kapoor resume...',
  }  
];
