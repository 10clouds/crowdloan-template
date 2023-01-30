interface Props {
  min: number | string;
  tokenSymbol: string;
  max: number | string;
}

const ContributionMinInfo = ({ min, max, tokenSymbol }: Props) => {
  return (
    <div className="flex rounded-2xl bg-secondary px-8 py-6">
      <div className="w-1/2 ">
        <div className="text-xs text-gray-dark">minimum allowed</div>
        <div>
          {min}&nbsp;
          {tokenSymbol}
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-xs text-gray-dark">Remaining till cap</div>
        <div>
          {max}&nbsp;
          {tokenSymbol}
        </div>
      </div>
    </div>
  );
};

export default ContributionMinInfo;
