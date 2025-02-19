import Image from 'next/image';

import data from '@/data/common.json';

export const DescriptionSection = () => {
  const { descriptionData } = data;

  return (
    <section className="pb-[32px] pt-[64px]">
      <div className="container">
        <ul className="flex flex-col gap-[64px]">
          {descriptionData.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col items-center ${index === 1 ? 'xl:flex-row-reverse' : 'xl:flex-row'}`}
              // className="flex flex-col items-center xl:flex-row"
            >
              <div
                // className="md:w-[275px]"
                className={`md:w-[275px] ${index === 1 ? 'ml-auto' : 'mr-auto'}`}
              >
                <p className="mb-[14px] text-[80px] font-700 leading-[1] tracking-[-4px] text-blueMain md:text-[104px]">
                  {item.number}
                </p>

                {item.title && (
                  <p className="mb-[8px] inline-block rounded-[44px] bg-blueLight px-[18px] py-[8px] text-[32px] font-700 leading-[1.25] text-blueMain md:py-[6px] md:text-[40px] md:leading-[1.1]">
                    {item.title}
                  </p>
                )}

                <p className="mb-[24px] text-[40px] font-700 leading-[1.1]">
                  {item.subtitle}
                </p>

                <p className="mb-[40px] text-[14px] leading-[1.28] md:mb-[48px]">
                  {item.text}
                </p>
              </div>

              <Image
                src={item.image}
                alt={item.alt}
                width={335}
                height={457}
                className="h-[457px] rounded-[40px] object-cover md:h-[700px] md:w-[704px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
