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

    // setMessages((prev) => [...prev, { text: input, type: "user" }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ msg: input }),
      });

      const data = await response.json();
      console.log(data);

      setMessages((prev) => [
        { text: input, type: "user" },
        { text: data.response, sources: data.sources, type: "bot" },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setMessages((prev) => [
        { text: input, type: "user" },
        {
          text: "Sorry, I can't provide answer. Please try again.",
          type: "bot",
        },
        ...prev,
      ]);
    }

    setThinking(false);
    setInput("");
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = 0;
    }
  }, [thinking, messages]);

  return (
    <div className="flex flex-col h-screen w-screen bg-inherit 1bg-[#ebe2d9] text-black">
      <div className={`w-full self-center bg-transparent`}>
        <form onSubmit={handleSubmit} className="relative flex p-4 pr-6 max-md:p-2">
          <input
            type="text"
            // disabled={thinking}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full p-12 py-8 mr-44 rounded-full border-[6px] border-[#d4af37] focus:outline-none bg-[#2a3524] text-[#d4af37] text-3xl font-extrabold max-md:p-2 max-md:mr-[72px] max-md:text-2xl"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="absolute right-8 top-1/2 -translate-y-1/2 py-8 px-12 text-3xl text-[#2a3524] bg-[#d4af37] border-[6px] border-[#2a3524] rounded-full hover:bg-[#f5f2eb] max-md:p-2 max-md:text-2xl max-md:right-2"
            aria-label="Send message"
          >
            HELP
          </button>
        </form>
      </div>

      {/* Chat Area */}
      <div
        id="chat-container"
        className="w-screen flex flex-col items-center self-center overflow-y-auto space-y-4"
      >
        <div className="flex-1 w-full items-center self-center p-4 pb-2 space-y-4 max-md:p-2 max-md:space-y-2">
          {thinking && 
          <div>
            <UserMessage text={input} />
            <Thinking />
          </div>}
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
        </div>
      </div>
    </div>
  );
}

export default App;
