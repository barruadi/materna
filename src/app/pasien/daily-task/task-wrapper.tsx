"use client"

import { useState } from "react";

// Interface
import { TaskWrapperProps } from "../../_types/types";

// Components
import TaskItem from "~/app/_components/user/daily-task";

// Dummy Data
import { dummyTaskData } from "../../_data/dummy";


const DailyTaskList = ({
  tanggal,
  dailyTask
}: TaskWrapperProps) => {

  const handleToggle = async (index: number) => {
    const updateId = dailyTask[index]?.id;

    const response = await fetch("/api/pasien/dailytask", {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: updateId,
      })
    });
    if (!response.ok) {
      console.error("Error updating daily task");
    } else {
      console.log("Daily task updated successfully");
      console.log("Response:", response);
    }
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
        <h2 className="text-lg font-semibold">{formatDate(tanggal)}</h2>
      </div>
      <div className="space-y-2">
        {dailyTask.map((task, index) => (
          <TaskItem 
            key={index} 
            title={task.title} 
            description={task.description} 
            isChecked={task.status} 
            onToggle={() => handleToggle(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default DailyTaskList;