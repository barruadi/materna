"use client"

// Interface
import { TaskWrapperProps } from "../../_types/types";

// Components
import TaskItem from "~/app/pasien/daily-task/daily-task";

// utils
import { api } from "~/trpc/react";


const DailyTaskList = ({
  tanggal,
  dailyTask
}: TaskWrapperProps) => {
  const { mutate: toggleTaskStatus, error } = api.task.setTaskStatus.useMutation();

  function handleClick(taskId: string) {
    toggleTaskStatus({ taskId });
    const index = dailyTask.findIndex(task => task.id === taskId);

    if (index !== -1) {
      if (dailyTask[index] !== undefined) {
        dailyTask[index].status = !dailyTask[index].status;
      }
    } else {
      console.log('Task not found.');
    }
  }

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  if (dailyTask.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-md pt-4">No tasks available</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 pt-4">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{formatDate(tanggal)}</h2>
      </div>
      <div className="space-y-2">
        {dailyTask.map((task, index) => (
          <TaskItem 
            key={index} 
            title={task.title} 
            description={task.description} 
            isChecked={task.status} 
            onToggle={() => handleClick(task.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default DailyTaskList;