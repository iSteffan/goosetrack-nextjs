interface IBtnProps {
  onOpen: () => void;
}

export const AddFeedbackBtn = ({ onOpen }: IBtnProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="btnEffect rounded-[10px] bg-blueMain px-[20px] py-[8px] text-[12px] font-600 leading-[1.33] text-white md:px-[32px] md:py-[12px] md:text-[14px] md:leading-[1.28]"
      >
        Feedback
      </button>
    </>
  );
};
