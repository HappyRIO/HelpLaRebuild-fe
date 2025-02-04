import { useState, useEffect } from 'react';
import UserMessage from '../components/userMessage';
import BotMessage from '../components/botMessage';
import SourceMessage from '../components/sourceMessage';
import { ArrowRight } from 'lucide-react';
import Thinking from '../components/thinking';

interface Message {
  text: string;
  type: 'user' | 'bot';
  sources?: string[];
}

function App() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setThinking(true);
    e.preventDefault();

    if (!input) return;

    // Append user message to messages
    setMessages((prev) => [...prev, { text: input, type: 'user' }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ msg: input }),
      });

      const data = await response.json();
      console.log(data);
      // Append bot response to messages
      setMessages((prev) => [...prev, { text: data.response, sources: data.sources, type: 'bot' }]);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setMessages((prev) => [...prev, { text: "Error fetching response.", type: 'bot' }]);
    }

    // Clear input
    setThinking(false);
    setInput('');
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [input, messages]);


  return (
    <div className="flex flex-col h-screen w-screen bg-[#232627] pt-20 text-black">
      {/* <button
        onClick={handleNewThread}
        className="absolute w-fit rounded-lg bg-gray-500 px-4 py-2 mx-4 text-white hover:bg-gray-600"
      >
        New Chat
      </button> */}
      {/* Chat Area */}
      {messages.length ? (
        <div
          id="chat-container"
          className="w-full flex-1 self-center overflow-y-auto max-w-3xl p-4 space-y-4"
        >
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'user' ? '' : ''}>
              {/* <span className={`inline-block p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {msg.text}
              </span> */}  
              {msg.type === 'user' ? (
                <UserMessage text={msg.text} />
              ) : (
                <div>
                  <BotMessage text={msg.text} />
                  { msg.sources?.length && <SourceMessage sources={msg.sources} />}
                  <hr className='my-10'/>
                </div>
              )}
            </div>
          ))}
          {thinking && <Thinking />}
        </div>
      ) : (
        <div className="text-center text-3xl text-white pt-20">
          What can I help you with?
          <span>As you know, Communication is difficult on Upwork because it is not a chat tool.
So if possible, how about telegram communication?
my ID: @higodev</span>
        </div>
      )}
      
      {/* Footer */}
      <div
        className={`w-full p-4 self-center max-w-3xl ${
          messages.length ? "border-t" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="relative flex">
          <textarea
            disabled={thinking}
            placeholder="Ask a follow-up question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full p-4 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 bg-[#1b1f1f] shadow-[0_0_15px_rgba(0,0,0,0.5)] shadow-white text-white"
            rows={2}
            style={{ resize: 'none' }}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 bg-gray-500 hover:text-gray-600"
            aria-label="Send message"
          >
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
