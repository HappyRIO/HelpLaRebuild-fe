import { useState, useEffect } from "react";
import UserMessage from "../components/userMessage";
import BotMessage from "../components/botMessage";
import SourceMessage from "../components/sourceMessage";
import Thinking from "../components/thinking";

interface Message {
  text: string;
  type: "user" | "bot";
  sources?: string[];
}

function App() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setThinking(true);
    e.preventDefault();

    if (!input) return;

    setMessages((prev) => [...prev, { text: input, type: "user" }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
        method: "POST",
        mode: "no-cros",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ msg: input }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.response, sources: data.sources, type: "bot" },
      ]);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I can't provide answer. Please try again.",
          type: "bot",
        },
      ]);
    }

    setThinking(false);
    setInput("");
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [input, messages]);

  return (
    <div className="flex flex-col h-screen w-screen bg-inherit 1bg-[#ebe2d9] text-black">
      <div className={`w-full p-4  self-center max-w-7xl bg-transparent`}>
        <form onSubmit={handleSubmit} className="relative flex px-4 pr-6">
          <input
            type="text"
            disabled={thinking}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full p-12 py-8 mr-44 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 bg-[#f5f2eb] 1shadow-[0_0_15px_rgba(0,0,0,0.5)] 1shadow-white text-[#574c3f] text-2xl"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="absolute right-8 top-1/2 -translate-y-1/2 py-8 px-12 text-3xl text-[#342f29] bg-[#b9a590]  rounded-full hover:bg-[#f5f2eb]"
            aria-label="Send message"
          >
            HELP
          </button>
        </form>
      </div>

      {/* Chat Area */}
      <div
        id="chat-container"
        className="w-screen flex flex-col items-center self-center overflow-y-auto p-4 space-y-4"
      >
        <div className="flex-1 max-w-7xl w-full items-center self-center p-4 pb-2 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === "user" ? "" : ""}>
              {msg.type === "user" ? (
                <UserMessage text={msg.text} />
              ) : (
                <div>
                  <BotMessage text={msg.text} />
                  {msg.sources?.length && (
                    <SourceMessage sources={msg.sources} />
                  )}
                </div>
              )}
            </div>
          ))}
          {thinking && <Thinking />}
        </div>
      </div>
    </div>
  );
}

export default App;
