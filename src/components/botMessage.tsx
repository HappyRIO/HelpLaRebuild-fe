import ReactMarkdown from "react-markdown";

const BotMessage = ({ text }: { text: string }) => {
  return (
    <div className="bg-[#2a3524] border-[6px] border-[#d4af37] p-2">
      <h1 className="p-2 text-[#d4af37] text-3xl">Answer</h1>
      <div
        className={`inline-block w-full p-2 text-[#d4af37] text-2xl markdown-body`}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {props.children}
              </a>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BotMessage;
