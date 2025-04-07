const UserMessage = ({ text }: { text: string }) => {
  return (
    <div>
      <div
        className={`inline-block w-full p-2.5 bg-[#d4af37] text-[#36402c] text-3xl font-extrabold break-words break-all max-md:text-2xl`}
      >
        {text}
      </div>
    </div>
  );
};

export default UserMessage;