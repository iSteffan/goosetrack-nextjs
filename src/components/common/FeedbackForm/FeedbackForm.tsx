import ReactStars from 'react-stars';

export const FeedbackForm = () => {
  return (
    <div>
      <div className="mb-[20px] md:mb-[24px]">
        <p className="text-blackText text-[12px] leading-[1.16]">Rating</p>
        <ReactStars
          count={5}
          size={30}
          color2={'#FFAC33'}
          color1={'#CEC9C1'}
          value={0}
          half={true}
        />
      </div>
      FeedbackForm
    </div>
  );
};
