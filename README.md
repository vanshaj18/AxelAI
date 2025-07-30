# Axel AI – Interview Simulator

Axel AI is a lightweight AI-powered Interview Simulator built using Firebase Studio and Gemini LLM. It offers a smooth, minimal experience for candidates to simulate behavioral and technical interviews in real time, with contextual evaluation, feedback generation, and interview tracking.

## 🚀 Features

### 🔐 Login Flow
- Email-based login (no password)
- Temporary 8-character hexadecimal code is generated and sent to the user's email
- Code verification system (valid for 15 minutes)
- Seamless transition to the dashboard post verification

### 📊 Dashboard
- Displays:
  - **Current Interviews**: Start interviews in progress
  - **Upcoming Interviews**: Scheduled simulations
  - **Previous Interviews**: Access past performance
- Interview cards show position, date, time, focus area
- Expandable cards for in-depth view and action buttons

### 💬 Interview Screen
- Real-time interaction with Gemini LLM:
  - Role-specific technical and behavioral questions
  - Progress bar for interview session
  - Score tracking and question number
  - Interactive chat UI with smart prompts
- Utility Icons:
  - ℹ️ Info icon for interview guidelines and tips
  - ❌ End Interview button

### 🧠 LLM-Driven Modules
- **Conversation Orchestrator**: Controls session flow, question sequencing, and state
- **Excel Knowledge Engine**: Evaluates technical answers using contextual embeddings
- **Behavioral Assessment Module**: Judges soft skills and problem-solving strategy
- **Feedback Generator**: Crafts actionable performance reports with score summaries
- **Learning System**: Learns from historical interview data for smarter questions

---

## 🛠️ Tech Stack

| Component            | Technology                     |
|----------------------|--------------------------------|
| Frontend UI          | Firebase Studio + Tailwind     |
| Backend              | Firebase Functions + Firestore |
| LLM Integration      | Gemini Model (via API)         |
| Auth System (POC)    | Email + Temporary Code         |
| Deployment           | Firebase Hosting               |

---

## 📁 Project Structure (Simplified)
AxelAI/
├── public/
│ └── assets/logo.png
├── functions/
│ ├── generateLoginCode.js
│ └── verifyLoginCode.js
├── firestore.rules
├── src/
│ ├── screens/
│ │ ├── LoginScreen.js
│ │ ├── DashboardScreen.js
│ │ └── InterviewScreen.js
│ └── components/
│ ├── InterviewCard.js
│ └── ChatWindow.js
└── README.md
