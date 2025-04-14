'use client';

import { useForm, useWatch, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';

import EditIcon from '@/public/icon/pencil.svg';
import PlusIcon from '@/public/icon/plus.svg';
import { createTask, updateTask } from '@/utils/getTask';
import { useTasksStore } from '@/store/tasksStore';

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
    _id: string;
    title: string;
    start: string;
    end: string;
    priority: 'Low' | 'Medium' | 'High';
  };
  onClose: () => void;
  selectedDate: string;
}

export type TaskFormData = {
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
};

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
  } = useForm<TaskFormData>({
    defaultValues: initialData || {
      title: '',
      start: '',
      end: '',
      priority: 'Low',
    },
  });

  const queryClient = useQueryClient();
  const { addTask, updateTask: updateStoreTask } = useTasksStore();

  useEffect(() => {
    if (initialData) {
      const keys = ['title', 'start', 'end', 'priority'] as const;

      keys.forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const selectedPriority = watch('priority');

  const { mutate: createMutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: newTask => {
      addTask(newTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: error => {
      console.error('Failed to create task', error);
    },
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: { taskId: string; updates: TaskFormData }) =>
      updateTask(data.taskId, data.updates),
    onSuccess: updatedTask => {
      updateStoreTask(updatedTask._id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: error => {
      console.error('Failed to update task', error);
    },
  });

  const watchedValues = useWatch<TaskFormData>({ control });

  const initialFormValues: Partial<TaskFormData> = {
    title: initialData?.title,
    start: initialData?.start,
    end: initialData?.end,
    priority: initialData?.priority,
  };

  const isFormChanged = (
    Object.keys(initialFormValues) as (keyof TaskFormData)[]
  ).some(key => watchedValues[key] !== initialFormValues[key]);

  const onSubmit = (data: TaskFormData) => {
    const commonData = {
      ...data,
      category,
      date: selectedDate,
    };

    if (initialData?._id) {
      updateMutate({ taskId: initialData._id, updates: commonData });
    } else {
      createMutate(commonData);
    }
  };

  const submitBtnStyles = classNames(
    'flex items-center gap-[8px] rounded-[8px] bg-blueMain px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-white disabled:cursor-not-allowed  md:px-[64px] md:py-[15px]',
    {
      'disabled:bg-[#EFEFEF] disabled:text-blackText': !isFormChanged,
      btnEffect: isFormChanged || !isPending || !isUpdating,
    },
  );

  const iconStyles = classNames('h-[18px] w-[18px]', {
    'stroke-blackText': !isFormChanged,
    'stroke-white': isFormChanged,
  });

  return (
    <div className="w-[267px] md:w-[340px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-[16px] md:mb-[18px]">
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
            <p className="inputError">Title is required (max 250 characters)</p>
          )}
        </div>

        <div className="mb-[16px] flex gap-[14px] md:mb-[28px]">
          <div className="relative w-full">
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
              <p className="inputError">Start time is required</p>
            )}
          </div>

          <div className="relative w-full">
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
            {errors.end && <p className="inputError">End &gt; Start time</p>}
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
            disabled={isPending || isUpdating || !isFormChanged}
            className={submitBtnStyles}
          >
            <>
              {isPending || isUpdating ? (
                <div className="h-[18px] w-[18px] animate-spin rounded-full border-[2px] border-white border-t-transparent" />
              ) : initialData ? (
                <EditIcon className={iconStyles} />
              ) : (
                <PlusIcon className={iconStyles} />
              )}
              <p>{initialData ? 'Edit' : 'Add'}</p>
            </>
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending || isUpdating}
            className="rounded-[8px] bg-[#EFEFEF] px-[42px] py-[12px] text-[14px] font-600 leading-[1.28] text-blackText transition-colors hover:bg-gray-300 dark:bg-[#21222C] dark:text-white md:px-[48px] md:py-[15px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
