import { useState, useEffect } from "react";
import UserMessage from "../components/userMessage";
import BotMessage from "../components/botMessage";
import SourceMessage from "../components/sourceMessage";
// import { ArrowRight } from "lucide-react";
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

    // Append user message to messages
    setMessages((prev) => [...prev, { text: input, type: "user" }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ msg: input }),
      });

      const data = await response.json();
      console.log(data);
      // Append bot response to messages
      setMessages((prev) => [
        ...prev,
        { text: data.response, sources: data.sources, type: "bot" },
      ]);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response.", type: "bot" },
      ]);
    }

    // Clear input
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
    <div className="flex flex-col h-screen w-screen bg-transparent pt-20 text-black">
      {/* <button
        onClick={handleNewThread}
        className="absolute w-fit rounded-lg bg-gray-500 px-4 py-2 mx-4 text-white hover:bg-gray-600"
      >
        New Chat
      </button> */}
      {/* Chat Area */}
        <div
          id="chat-container"
          className="w-screen flex flex-col items-center self-center overflow-y-auto p-4 space-y-4"
        >
          <div className="flex-1 max-w-4xl w-full items-center self-center p-4 pb-2 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type === "user" ? "" : ""}>
                {/* <span className={`inline-block p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {msg.text}
              </span> */}
                {msg.type === "user" ? (
                  <UserMessage text={msg.text} />
                ) : (
                  <div>
                    <BotMessage text={msg.text} />
                    {msg.sources?.length && (
                      <SourceMessage sources={msg.sources} />
                    )}
                    {/* <hr className='my-10 border-[#35302a]' /> */}
                  </div>
                )}
              </div>
            ))}
            {thinking && <Thinking />}
          </div>
        </div>

      {/* Footer */}
      <div
        className={`fixed bottom-0 w-full p-4  self-center max-w-4xl bg-transparent`}
      >
        <form onSubmit={handleSubmit} className="relative flex px-4 pr-6">
          <textarea
            disabled={thinking}
            // placeholder="Ask a follow-up question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full p-4 mr-32 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 bg-[#f5f2eb] 1shadow-[0_0_15px_rgba(0,0,0,0.5)] 1shadow-white text-[#574c3f]"
            rows={1}
            style={{ resize: "none" }}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="absolute right-8 top-1/2 -translate-y-1/2 p-3.5 px-6 text-xl text-[#794444] bg-[#342f29] rounded-full hover:text-[#794444]"
            aria-label="Send message"
          >
            Search
            {/* <ArrowRight /> */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
