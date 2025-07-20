import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });
      const data = await res.json();
      setResponse(data.result);
    } catch {
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 flex flex-col items-center justify-center px-8 py-16 font-sans text-gray-900">
      <header className="text-center mb-14 max-w-xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-purple-700 drop-shadow-md">
          🌱 WonderSeedToday
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Create magical, heartwarming stories for children — instantly.
        </p>
      </header>

      <section className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-10 space-y-8">
        <textarea
          className="w-full h-40 p-5 rounded-xl border border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400 resize-none text-lg transition"
          placeholder="Enter a topic, feeling, or idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition"
        >
          {loading ? "Generating story..." : "Generate Story"}
        </button>

        {response && (
          <article className="prose prose-purple max-h-[400px] overflow-y-auto bg-purple-50 p-6 rounded-xl shadow-inner border border-purple-200 whitespace-pre-wrap text-lg">
            {response}
          </article>
        )}
      </section>

      <footer className="mt-16 text-center text-sm text-gray-400 select-none">
        Made with 💜 by WonderSeedToday

     
     
      </footer>
    </main>
  );
}

