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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Talk to ChatGPT</h1>

      <input
        type="text"
        value={input}
        placeholder="Ask me anything..."
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "300px", padding: "0.5rem" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Send
      </button>

      {loading && <p>Loading...</p>}
      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
