const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const MonthCalendarHead = () => {
  return (
    <ul className="cardBorder mb-[14px] flex justify-between rounded-[8px] border-[1px] bg-white px-[18px] py-[14px] dark:bg-blackAccentBg md:mb-[16px] md:px-[32px] md:py-[10px] xl:px-[46px]">
      {weekDays.map((day, id) => {
        const isBlue = id >= 5;
        return (
          <li
            key={id}
            className={`w-[28px] text-center md:w-[50px] ${isBlue ? 'text-blue-500' : 'text-blackText dark:text-grayTheme'}`}
          >
            <p className="block text-center text-[16px] font-600 leading-[1.12] md:hidden md:text-[14px] md:leading-[1.28]">
              {day[0]}
            </p>
            <p className="hidden text-center text-[16px] font-600 leading-[1.12] md:block md:text-[14px] md:leading-[1.28]">
              {day}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
