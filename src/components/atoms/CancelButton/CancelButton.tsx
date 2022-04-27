import tw from "tailwind-styled-components";

interface CancelButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  const CancelButton = tw.button`
    bg-transparent 
    border
    border-main-300
    text-slate-100 
    font-medium 
    px-8
    py-1 
    rounded-md
    ml-4
    `;

  return <CancelButton onClick={onClick}>cancel</CancelButton>;
};

export default CancelButton;
