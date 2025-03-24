import PulseLoader from 'react-spinners/PulseLoader';

import 'react-loading-skeleton/dist/skeleton.css';

export const HeaderLoader = () => {
  return (
    <div className="flex h-[32px] items-center justify-around md:h-[44px]">
      <PulseLoader size={20} color="var(--loader-base)" />
    </div>
  );
};
