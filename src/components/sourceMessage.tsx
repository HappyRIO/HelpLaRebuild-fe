const SourceMessage = ({ sources }: { sources: string[] }) => {
  return (
    <div className="bg-[#2a3524] border-[6px] border-[#d4af37] p-2 mt-2 text-xl">
      <h1 className="font-bold p-2 text-[#d4af37] text-3xl">Sources</h1>
      <div className={`inline-block w-full p-2 rounded-lg text-[#574c3f] break-words break-all`}>
        {sources.map((source, index) => (
          <ul key={index}>
            <a className="text-[#3366cc] text-2xl" href={source} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SourceMessage;