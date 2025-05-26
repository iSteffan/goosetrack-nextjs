'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  LabelProps,
} from 'recharts';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

interface Task {
  _id: string;
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

interface StatisticsChartProps {
  tasks: Task[];
  selectedDate: string;
}

export const StatisticsChart = ({
  tasks,
  selectedDate,
}: StatisticsChartProps) => {
  const t = useTranslations('StatisticsChart');

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const selected = parseISO(selectedDate);

  const byDay = tasks.filter(task => isSameDay(parseISO(task.date), selected));
  const byMonth = tasks.filter(task =>
    isSameMonth(parseISO(task.date), selected),
  );

  const count = (list: Task[], category: Task['category']) =>
    list.filter(task => task.category === category).length;

  const dayTotal = byDay.length || 1;
  const monthTotal = byMonth.length || 1;

  const categoryMap: Record<Task['category'], string> = {
    'To Do': t('todo'),
    'In Progress': t('inProgress'),
    Done: t('done'),
  };

  const data = ['To Do', 'In Progress', 'Done'].map(name => {
    const dayCount = count(byDay, name as Task['category']);
    const monthCount = count(byMonth, name as Task['category']);

    return {
      name: categoryMap[name as Task['category']],
      byDay: Math.round((dayCount / dayTotal) * 100),
      byMonth: Math.round((monthCount / monthTotal) * 100),
    };
  });

  const CustomLabel = ({ x, y, width, value }: LabelProps) => {
    if (!value || value === 0) return null;

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const numX = typeof x === 'string' ? parseFloat(x) : (x ?? 0);
    const numY = typeof y === 'string' ? parseFloat(y) : (y ?? 0);
    const numWidth =
      typeof width === 'string' ? parseFloat(width) : (width ?? 0);

    const adjustedY = numValue >= 95 ? numY + 20 : numY - 6;

    return (
      <text
        x={numX + numWidth / 2}
        y={adjustedY}
        // fill="#000"
        fill={isDarkMode ? '#fff' : '#343434'}
        fontSize={12}
        textAnchor="middle"
        fontWeight={500}
      >
        {numValue}%
      </text>
    );
  };

  return (
    <div className="rounded-[20px] border-[0.8px] border-bluePale px-[14px] py-[40px] dark:border-[#E3F3FF26] md:p-[32px]">
      <ResponsiveContainer height={300}>
        <BarChart
          data={data}
          margin={{ top: 45, right: 10, left: 10, bottom: 10 }}
          barCategoryGap={75}
          barGap={10}
          barSize={27}
        >
          <defs>
            <linearGradient id="colorDay" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(255, 210, 221)"
                stopOpacity={0}
              />
              <stop
                offset="100%"
                stopColor="rgb(255, 210, 221)"
                stopOpacity={1}
              />
            </linearGradient>
            <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(62, 133, 243)" stopOpacity={0} />
              <stop
                offset="100%"
                stopColor="rgb(62, 133, 243)"
                stopOpacity={1}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke={isDarkMode ? '#E3F3FF26' : '#E3F3FF'}
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tickSize={0}
            tickMargin={16}
            axisLine={false}
            fontSize={14}
            stroke={isDarkMode ? '#fff' : '#343434'}
          />
          <YAxis
            ticks={[0, 20, 40, 60, 80, 100]}
            orientation="left"
            axisLine={false}
            tickLine={false}
            tickCount={6}
            tickMargin={20}
            fontFamily="InterNormal, sans-serif"
            fontSize={'14'}
            stroke={isDarkMode ? '#fff' : '#343434'}
          >
            <Label
              position="top"
              dy={-28}
              fontFamily="InterNormal, sans-serif"
              fontSize={'14'}
              fontWeight={600}
              fill={isDarkMode ? '#fff' : '#343434'}
            >
              {t('tasks')}
            </Label>
          </YAxis>
          <Tooltip formatter={value => `${value}%`} />

          <Bar
            dataKey="byDay"
            fill="url(#colorDay)"
            radius={10}
            minPointSize={10}
            label={<CustomLabel />}
          />
          <Bar
            dataKey="byMonth"
            fill="url(#colorMonth)"
            radius={10}
            minPointSize={10}
            label={<CustomLabel />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
