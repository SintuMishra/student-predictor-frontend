import { useState } from "react";

export default function App() {
  const [hours, setHours] = useState("");
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("https://student-predictor-backend-dsz3.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hours: Number(hours),
        attendance: Number(attendance),
        marks: Number(marks),
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/90 rounded-2xl shadow-soft p-8 w-full max-w-md transition duration-300 hover:scale-105">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🎓 Student Predictor
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          ML-powered performance prediction
        </p>

        {/* Inputs */}
        <input
          type="number"
          placeholder="📘 Study Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          type="number"
          placeholder="📊 Attendance (%)"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <input
          type="number"
          placeholder="📝 Previous Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="w-full mb-5 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />

        {/* Button */}
        <button
          onClick={handlePredict}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 active:scale-95 transition duration-200"
        >
          {loading ? "Predicting..." : "Predict Result"}
        </button>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 text-center py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              result === "Pass"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {result === "Pass" ? "✅ Pass" : "❌ Fail"}
          </div>
        )}
      </div>
    </div>
  );
}