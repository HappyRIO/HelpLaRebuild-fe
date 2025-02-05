

const UserMessage = ({text}:{text: string}) => {
    return (
        <div>
              <div className={`inline-block w-full p-2 rounded-lg bg-[#35302a] text-[#f6f3ec]`}>
                {text}
              </div>
        </div>
    )
}

export default UserMessage;