const BotMessage = ({text}:{text: string}) => {
    return (
        <div className="bg-[#f6f3ec] rounded-lg p-2">
            <h1 className="font-bold p-2 text-[#35302a] text-xl">Answer</h1>
              <div className={`inline-block w-full p-2 text-[#574c3f]`}>
                {text}
              </div>
        </div>
    )
}

export default BotMessage;