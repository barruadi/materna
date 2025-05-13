"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

import DailyTaskList from "./task-wrapper";
import { DailyTaskProps } from "~/app/_types/types";

import tasks from "~/app/pasien/daily-task/_dummy-task.json"

function DailyTasksPage () {

  const {data: session} = useSession();

  const { data: groupedTasks, isLoading } = api.task.getTasksByPatient.useQuery({
    pasienId: session?.user?.id || "prototipe",
  });

  if (groupedTasks === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    )
  }

  const dailyTask: DailyTaskProps[] = tasks;
  return (
    <div className="flex flex-col w-full h-screen">
      {dailyTask.length !== 0 &&
        tasks.map((item, index) => {
          return (
            <DailyTaskList
            key={index}
            tanggal={new Date}
            dailyTask={tasks}
            />
          )
        })
      }
      
    </div>
  )
}

export default DailyTasksPage;