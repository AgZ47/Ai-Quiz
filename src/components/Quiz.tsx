import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "./Quiz.css";

function Quiz() {
  const [inputValue, setinputvalue] = useState("");
  const [inputnumber, setinputnumber] = useState("0");
  const [loading, setloading] = useState(false);
  const [quiz, setquiz] = useState({
    quiztitle: "Ai-Quizzer",
    questions: [
      {
        id: 1,
        question: "sample question",
        options: [{ optionstr: "option1" }],
        chosenoption: -1,
        correctanswerindex: 1,
        explanation: "sample explanation",
      },
    ],
  });
  const [completed, setcompleted] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_REACT_GEMINI_API_KEY,
  });

  const parser = (t: string) => {
    try {
      const cleanstring = t.replace(/^\s*```json\s*|\s*```\s*$/g, "");
      const quizdata = JSON.parse(cleanstring);
      setquiz(quizdata);
    } catch (error) {
      console.log("Error parsing String: ", error);
    }
  };

  const handleComplete = () => {
    setcompleted(true);
  };

  const handleoptions = (questionid: number, chosenno: number) => {
    setquiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) => {
        if (question.id === questionid) {
          return {
            ...question,
            chosenoption: chosenno,
          };
        }
        return question;
      }),
    }));
  };

  const handleSubmit = async () => {
    setloading(true);
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
          "give me a " +
          inputnumber +
          " question quiz on " +
          inputValue +
          " The output MUST be a strict JSON object that follows the provided schema. {'quiztitle':str,'questions':[{'id':int,'question':str,'options':[{'optionstr':str},{'optionstr':str},{'optionstr':str},{'optionstr':str}],'chosenoption':int,'correctanswerindex':int,'explanation':str},]}, the chosenoption value should always be -1",
      });
      parser(result.text!);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="screen">
      <h1>{quiz.quiztitle}</h1>
      <div className="quiz-container">
        {completed == false && (
          <div>
            {quiz.quiztitle == "Ai-Quizzer" && (
              <div className="input-group">
                {" "}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setinputvalue(e.target.value)}
                  placeholder="Quiz Topic (e.g., Quantum Physics, React Hooks)"
                  className="quiinput"
                />
                <input
                  type="number"
                  value={inputnumber}
                  onChange={(e) => setinputnumber(e.target.value)}
                  placeholder="Number of Questions (e.g., 5)"
                  className="quiinput"
                  min="1"
                />
                <button
                  className="button"
                  onClick={handleSubmit}
                  disabled={
                    loading || !inputValue || parseInt(inputnumber) <= 0
                  }
                >
                  {loading ? "Loading..." : "Generate Quiz"}
                </button>
              </div>
            )}
            {quiz.quiztitle != "Ai-Quizzer" && (
              <div className="qui">
                {quiz.questions.map((item, index) => (
                  <div key={item.id} className="question-item">
                    {" "}
                    <p>{index + 1 + ". " + item.question}</p>
                    {item.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-wrapper">
                        {" "}
                        <label>
                          <input
                            className="radio-wrapper-15"
                            type="radio"
                            name={`question-${item.id}`}
                            value={option.optionstr}
                            checked={item.chosenoption === optionIndex}
                            onChange={() => handleoptions(item.id, optionIndex)}
                          />
                          {option.optionstr}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {quiz.quiztitle != "Ai-Quizzer" && (
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  className="button"
                  onClick={handleComplete}
                  disabled={loading}
                >
                  {"Done! See Results"}
                </button>
              </div>
            )}
          </div>
        )}
        {completed && (
          <div className="results">
            <h2>Quiz Results</h2>
            {quiz.questions.map((item, index) => {
              const isCorrect = item.chosenoption === item.correctanswerindex;
              return (
                <div
                  key={item.id}
                  className={`result-message ${
                    isCorrect ? "correct" : "wrong"
                  }`}
                >
                  <p>
                    <strong>Question {index + 1}:</strong>{" "}
                    {isCorrect ? "✅ Correct!" : "❌ Wrong."}
                  </p>
                  <p>
                    **Your Answer:**{" "}
                    {item.chosenoption !== -1
                      ? item.options[item.chosenoption].optionstr
                      : "No Answer"}
                  </p>
                  <p>
                    **Correct Answer:**{" "}
                    {item.options[item.correctanswerindex].optionstr}
                  </p>
                  <p>**Explanation:** {item.explanation}</p>
                  <hr style={{ border: "none", borderTop: "1px solid #ddd" }} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
