interface ButtonProps {
  text?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue text-slate-100 font-medium px-8 py-1 rounded-md"
    >
      {text}
    </button>
  );
};

export default Button;
