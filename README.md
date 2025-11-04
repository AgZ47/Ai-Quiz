# 🤖 AI-Quizzer

AI-Quizzer is an **AI-powered quiz generator app** built with **React + TypeScript** and **Google’s Gemini API**.  
Just enter a topic (like “Quantum Physics” or “React Hooks”) and the number of questions you want —  
the app will instantly generate a quiz, let you answer it, and show your results with explanations.

---

## 🧠 Features

✅ Generate quizzes on **any topic** using **Gemini AI**  
✅ Automatically formats questions, options, and correct answers  
✅ Beautiful and responsive UI  
✅ Instant feedback with explanations for every question  
✅ Easy to use — no backend setup required

---

## 🛠️ Tech Stack

- **React (Vite + TypeScript)**
- **Google Gemini AI (via `@google/genai`)**
- **CSS3 for styling**
- **Vite environment variables (`.env` file)**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-quizzer.git
cd ai-quizzer
2. Install Dependencies
bash
Copy code
npm install
Make sure you have Node.js (v18 or above) installed.

```
## 🔑 Setting Up the Gemini API Key
This app uses Google’s Gemini API via the @google/genai package.
You’ll need an API key from the Google AI Studio.

Steps to Set Up:
1. Go to Google AI Studio.

2. Sign in with your Google account.

3. Navigate to “Get API Key” → “Create API Key in Google Cloud project.”

4. Copy your API key.

### 3. Create a .env File
In your project root (same folder as package.json), create a file named .env:
```bash
ini
Copy code
VITE_REACT_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
⚠️ Replace YOUR_GEMINI_API_KEY_HERE with the key you copied.

### 4. Run the App

Copy code
```bash 
npm run dev
```
Then open the app in your browser at the URL shown in the terminal (usually http://localhost:5173).

## 📁 Project Structure
```bash
Copy code
📦 ai-quizzer
├── 📄 Quiz.tsx         # Main quiz component
├── 🎨 Quiz.css         # Styling for the quiz UI
├── 📄 main.tsx         # React entry point
├── 📄 index.html       # App HTML template
├── 📄 vite.config.ts   # Vite configuration
├── 📄 package.json     # Dependencies and scripts
└── 📄 .env.example     # Example env file (create your own .env)
```
## 🧩 Example .env File
```bash
# .env
VITE_REACT_GEMINI_API_KEY=AIzaSyExampleKey1234567890
```

## 🧰 Available Scripts
Command	Description
- **npm run dev	Starts the app in development mode**
- **npm run build	Builds the app for production**
- **npm run preview	Previews the production build locally**

## 🎨 UI Preview

<img width="1920" height="947" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/364137e8-495a-4c59-b634-f6f562f1ae29" />
<img width="1920" height="950" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/6b0fe2cc-d731-4a8a-89da-73ca1b203fd4" />
<img width="1920" height="948" alt="Screenshot (2)" src="https://github.com/user-attachments/assets/e9d06f6c-efb5-4f0e-af5b-f36827625e43" />
<img width="1920" height="947" alt="Screenshot (1)" src="https://github.com/user-attachments/assets/e8eac93e-be3c-4c5c-836f-10fc551baf72" />


⚠️ Troubleshooting
1. Quiz not generating?
Check your .env file — make sure your API key is correct and not expired.

2. “Error calling Gemini API” message?
You might have exceeded your free quota on Gemini or entered a wrong key.

3. JSON Parsing Error in Console?
Sometimes the API might respond with extra text. Try again — the parser will clean up most issues automatically.
