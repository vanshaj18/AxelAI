import type { Interview } from './types';

const JOB_DESCRIPTION_EXAMPLE = `
Software Engineer, Frontend

We are looking for a skilled Frontend Software Engineer to join our dynamic team. The ideal candidate will be responsible for developing and implementing user interface components using React.js. You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.

Responsibilities:
- Developing new user-facing features using React.js
- Building reusable components and front-end libraries for future use
- Translating designs and wireframes into high-quality code
- Optimizing components for maximum performance across a vast array of web-capable devices and browsers

Qualifications:
- Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
- Thorough understanding of React.js and its core principles
- Experience with popular React.js workflows (such as Flux or Redux)
- Familiarity with newer specifications of EcmaScript
- Experience with data structure libraries (e.g., Immutable.js)
- Knowledge of modern authorization mechanisms, such as JSON Web Token
`;

const CANDIDATE_RESUME_EXAMPLE = `
Jane Doe
Software Engineer

Summary:
A highly motivated and experienced software engineer with 5 years of experience in front-end development, specializing in React.js and modern JavaScript frameworks. Proven ability to lead projects and deliver high-quality, scalable applications.

Experience:
- Senior Frontend Engineer, TechCorp (2020-Present)
  - Led the development of a new customer-facing dashboard using React, Redux, and TypeScript.
  - Improved application performance by 30% through code splitting and lazy loading.
- Frontend Developer, WebSolutions (2018-2020)
  - Developed and maintained UI components for a large-scale e-commerce platform.

Skills:
- JavaScript, TypeScript, React, Redux, Next.js, HTML, CSS, Git
`;

export const mockInterviews: Interview[] = [
  {
    id: '1',
    role: 'Frontend Engineer',
    company: 'Innovate Inc.',
    date: '2024-08-15T14:00:00Z',
    status: 'Active',
    jobDescription: JOB_DESCRIPTION_EXAMPLE,
    candidateResume: CANDIDATE_RESUME_EXAMPLE,
  },
  {
    id: '2',
    role: 'Product Manager',
    company: 'Solutions Co.',
    date: '2024-08-20T10:00:00Z',
    status: 'Upcoming',
    jobDescription: 'Seeking an experienced product manager to lead our mobile application team...',
    candidateResume: 'John Smith resume...',
  },
  {
    id: '3',
    role: 'UX/UI Designer',
    company: 'Creative Labs',
    date: '2024-08-22T11:30:00Z',
    status: 'Upcoming',
    jobDescription: 'We need a designer with a passion for creating beautiful and intuitive user experiences...',
    candidateResume: 'Emily White resume...',
  },
  {
    id: '4',
    role: 'Backend Developer',
    company: 'Data Systems',
    date: '2024-07-30T09:00:00Z',
    status: 'Past',
    jobDescription: 'Backend developer skilled in Node.js and database management...',
    candidateResume: 'Michael Brown resume...',
  },
  {
    id: '5',
    role: 'DevOps Engineer',
    company: 'Cloud Services',
    date: '2024-07-25T16:00:00Z',
    status: 'Past',
    jobDescription: 'Experienced DevOps engineer to manage our CI/CD pipeline and cloud infrastructure...',
    candidateResume: 'Sarah Green resume...',
  },
];
