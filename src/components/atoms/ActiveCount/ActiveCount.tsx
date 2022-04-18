interface ActiveCountProps {
  count?: number;
}

const ActiveCount = ({ count }: ActiveCountProps) => {
  return <p className="ml-3 font-light text-main-300">{count}</p>;
};

export default ActiveCount;
