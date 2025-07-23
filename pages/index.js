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
    <main className="main">
      <header className="header">
        <h1 className="title">🌱 WonderSeed</h1>
        <p className="subtitle">
          Nurturing emotional intelligence — one bedtime story at a time.
        </p>
      </header>

      <section className="form-container">
        <textarea
          className="input"
          placeholder="Enter a topic, feeling, or idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="button"
        >
          {loading ? "Generating story..." : "Generate Story"}
        </button>

        {response && (
          <article className="output">
            {response}
          </article>
        )}
      </section>

      <footer className="footer">
       
      </footer>
    </main>
  );
}
