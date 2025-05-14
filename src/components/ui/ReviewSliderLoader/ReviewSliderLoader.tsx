import SyncLoader from 'react-spinners/SyncLoader';

export const ReviewSliderLoader = () => {
  return (
    <div className="flex h-[257px] items-center justify-around md:h-[268px]">
      <SyncLoader size={26} margin={14} color="var(--loader-base)" />
    </div>
  );
};
