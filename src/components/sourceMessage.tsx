const SourceMessage = ({sources}:{sources: string[]}) => {
    return (
        <div className="bg-[#1b1f1f] rounded-lg p-2">
            <div className="font-bold p-2 text-white text-xl">Sources</div>
              <div className={`inline-block w-full p-2 rounded-lg text-white`}>
                {sources.map((source, index) => (
                    <li key={index}>
                        <a href={source} target="_blank" rel="noopener noreferrer">
                            {source}
                        </a>
                    </li>
                ))}
              </div>
        </div>
    )
}

export default SourceMessage;