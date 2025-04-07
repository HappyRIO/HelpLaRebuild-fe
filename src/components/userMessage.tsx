const UserMessage = ({ text }: { text: string }) => {
  return (
    <div>
      <div
        className={`inline-block w-full p-2.5 bg-[#d4af37] text-[#36402c] text-3xl font-extrabold`}
      >
        {text}
      </div>
    </div>
  );
};

export default UserMessage;