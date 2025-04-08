"use client"

import { useState } from "react";

// Interface
import { TaskWrapperProps } from "../../_types/types";

// Components
import TaskItem from "~/app/_components/user/daily-task";

// Dummy Data
import { dummyTaskData } from "../../_data/dummy";


const DailyTaskList: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskWrapperProps>(dummyTaskData);

  const handleToggle = (index: number) => {
    const updatedTasks = [...taskData.dailyTask];
    updatedTasks[index] = {
      title: updatedTasks[index]?.title || "",
      description: updatedTasks[index]?.description || "",
      isChecked: !updatedTasks[index]?.isChecked || false
    };
    
    setTaskData({
      ...taskData,
      dailyTask: updatedTasks
    });
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  // api query

  return (
    <div className="w-full space-y-2 pt-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{formatDate(taskData.tanggal)}</h2>
      </div>
      <div className="space-y-2">
        {taskData.dailyTask.map((task, index) => (
          <TaskItem 
            key={index} 
            title={task.title} 
            description={task.description} 
            isChecked={task.isChecked} 
            onToggle={() => handleToggle(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default DailyTaskList;