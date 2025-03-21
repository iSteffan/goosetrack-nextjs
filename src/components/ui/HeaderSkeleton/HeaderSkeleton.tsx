import 'react-loading-skeleton/dist/skeleton.css';

import PulseLoader from 'react-spinners/PulseLoader';

export const HeaderSkeleton = () => {
  return (
    <div className="flex h-[32px] items-center justify-around md:h-[44px]">
      <PulseLoader size={20} color="#444" />{' '}
    </div>
  );
};
