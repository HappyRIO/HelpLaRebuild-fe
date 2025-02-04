const BotMessage = ({text}:{text: string}) => {
    return (
        <div className="bg-[#1b1f1f] rounded-lg p-2">
            <div className="font-bold p-2 text-white text-xl">Answer</div>
              <div className={`inline-block w-full p-2 text-white`}>
                {text}
              </div>
        </div>
    )
}

export default BotMessage;