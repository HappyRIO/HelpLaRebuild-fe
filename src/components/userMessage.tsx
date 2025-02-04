

const UserMessage = ({text}:{text: string}) => {
    return (
        <div>
              <div className={`inline-block w-full p-2 rounded-lg bg-[#2b2f30] text-white`}>
                {text}
              </div>
        </div>
    )
}

export default UserMessage;