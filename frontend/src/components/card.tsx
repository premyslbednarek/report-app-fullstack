const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="max-w-lg mx-auto p-5 shadow-md rounded-md space-y-2 border border-gray-300"
      {...props}
    />
  );
};

export default Card;
