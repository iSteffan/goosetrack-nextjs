// export const TaskForm = ({ title }: TaskFormProps) => {
//   return (
//     <div>
//       TaskForm
//       {title}
//     </div>
//   );
// };

'use client';

import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
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
      <p>{category}</p>
      <p>{selectedDate}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[16px] md:mb-[18px]">
          <label
            htmlFor="title"
            className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
          >
            Title
          </label>
          <input
            id="title"
            {...register('title', { required: true, maxLength: 250 })}
            className="w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white"
          />
          {errors.title && (
            <p className="text-red-500">
              Title is required (max 250 characters)
            </p>
          )}
        </div>

        <div className="mb-[16px] md:mb-[28px]">
          <div>
            <label
              htmlFor="start"
              className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
            >
              Start
            </label>
            <input
              id="start"
              type="time"
              {...register('start', { required: true })}
              className="w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white"
            />
            {errors.start && (
              <p className="text-red-500">Start time is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="end"
              className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme"
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
              className="w-full rounded-[8px] border-[1px] border-transparent bg-[#F6F6F6] px-[18px] py-[14px] text-[14px] font-600 leading-[1.28] text-blackText dark:border-darkThemeBorder dark:bg-transparent dark:text-white"
            />
          </div>
        </div>

        <div className="mb-[32px]">
          <label htmlFor="priority" className="">
            Priority
          </label>
          <div className="flex gap-[16px]">
            {['Low', 'Medium', 'High'].map(priority => (
              <label
                key={priority}
                className="flex items-center gap-[6px] text-[12px] font-600 leading-[1.16] text-blackText dark:text-white"
              >
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="priority"
                      type="checkbox"
                      checked={selectedPriority === priority}
                      onChange={() => field.onChange(priority)}
                    />
                  )}
                />
                {priority}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="btnEffect rounded-[8px] bg-blueMain px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-white"
          >
            {initialData ? 'Edit' : 'Add'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] bg-[#EFEFEF] px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-blackText transition-colors hover:bg-gray-300 dark:bg-[#21222C] dark:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
