'use client';

import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

import EditIcon from '@/public/icon/feedbackEdit.svg';
import PlusIcon from '@/public/icon/plus.svg';

const priorityArr = [
  {
    label: 'Low',
    borderColor: 'border-radioLow',
    bgColor: 'bg-radioLow',
  },
  {
    label: 'Medium',
    borderColor: 'border-radioMed',
    bgColor: 'bg-radioMed',
  },
  {
    label: 'High',
    borderColor: 'border-radioHigh',
    bgColor: 'bg-radioHigh',
  },
];

interface TaskFormProps {
  category: 'To Do' | 'In Progress' | 'Done';
  initialData?: {
    title: string;
    start: string;
    end: string;
    priority: 'Low' | 'Medium' | 'High';
  };
  onClose: () => void;
  selectedDate: string;
}
export const TaskForm = ({
  initialData,
  onClose,
  category,
  selectedDate,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      start: '',
      end: '',
      priority: 'Low',
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const selectedPriority = watch('priority');

  const onSubmit = data => {
    console.log('Form submitted:', data);
    onClose();
  };

  return (
    <div className="w-[267px] md:w-[340px]">
      {/* <p>{category}</p>
      <p>{selectedDate}</p> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[16px] md:mb-[18px]">
          <label
            htmlFor="title"
            className="mb-[8px] inline-block text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
          >
            Title
          </label>
          <input
            id="title"
            {...register('title', { required: true, maxLength: 250 })}
            className="h-[42px] w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white md:h-[46px]"
          />
          {errors.title && (
            <p className="text-red-500">
              Title is required (max 250 characters)
            </p>
          )}
        </div>

        <div className="mb-[16px] flex gap-[14px] md:mb-[28px]">
          <div className="w-full">
            <label
              htmlFor="start"
              className="mb-[8px] inline-block text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
            >
              Start
            </label>
            <input
              id="start"
              type="time"
              {...register('start', { required: true })}
              className="h-[42px] w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white md:h-[46px]"
            />
            {errors.start && (
              <p className="text-red-500">Start time is required</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="end"
              className="mb-[8px] inline-block text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
            >
              End
            </label>
            <input
              id="end"
              type="time"
              {...register('end', {
                required: true,
                validate: value =>
                  value > watch('start') || 'End time must be after start time',
              })}
              className="h-[42px] w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white md:h-[46px]"
            />
          </div>
        </div>

        <div className="mb-[32px] flex gap-[16px]">
          {priorityArr.map(({ label, borderColor, bgColor }) => (
            <label
              key={label}
              className="flex items-center gap-[6px] text-[12px] font-600 text-blackText dark:text-white"
            >
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div
                    className={`relative flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 ${borderColor}`}
                  >
                    <input
                      type="radio"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      checked={selectedPriority === label}
                      onChange={() => field.onChange(label)}
                    />
                    {selectedPriority === label && (
                      <div
                        className={`h-[8px] w-[8px] rounded-full ${bgColor}`}
                      />
                    )}
                  </div>
                )}
              />
              {label}
            </label>
          ))}
        </div>

        <div className="flex justify-between gap-[14px]">
          <button
            type="submit"
            className="btnEffect flex items-center gap-[8px] rounded-[8px] bg-blueMain px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-white md:px-[64px] md:py-[15px]"
          >
            {initialData ? (
              <>
                <EditIcon className="h-[16px] w-[16px] stroke-white" />
                <p>Edit</p>
              </>
            ) : (
              <>
                <PlusIcon className="h-[18px] w-[18px] stroke-white" />
                <p>Add</p>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] bg-[#EFEFEF] px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-blackText transition-colors hover:bg-gray-300 dark:bg-[#21222C] dark:text-white md:px-[48px] md:py-[15px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
