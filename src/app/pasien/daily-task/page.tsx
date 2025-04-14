"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

import DailyTaskList from "./task-wrapper";
import { DailyTaskProps } from "~/app/_types/types";


function DailyTasksPage () {

  const {data: session} = useSession();

  const { data: groupedTasks, isLoading } = api.task.getTasksByPatient.useQuery({
    pasienId: session?.user?.id || "",
  });

  if (groupedTasks === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    )
  }

  const dailyTask: DailyTaskProps[] = groupedTasks[0]?.dailyTask ?? [];
  return (
    <div className="flex flex-col w-full">
      {dailyTask.length !== 0 &&
        groupedTasks.map((item, index) => {
          return (
            <DailyTaskList
            key={index}
            tanggal={item.tanggal}
            dailyTask={item.dailyTask}
            />
          )
        })
      }
      
    </div>
  )
}

export default DailyTasksPage;