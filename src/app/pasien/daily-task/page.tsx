"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

import DailyTaskList from "./task-wrapper";
import { DailyTaskProps } from "~/app/_types/types";
import { group } from "console";
function DailyTasksPage () {

  const {data: session} = useSession();
  console.log("Session:", session);
  const userId = session?.user?.id;
  console.log("User ID:", userId);

  const { data: groupedTasks, isLoading } = api.task.getTasksByPatient.useQuery({
    pasienId: session?.user?.id || "cm9a1vkuc0001sbqv5wzq5i4z",
  });
  console.log(groupedTasks);

  if (groupedTasks === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    )
  }

  const dailyTask: DailyTaskProps[] = groupedTasks[0]?.dailyTask ?? [];
  return (
    <>
      <DailyTaskList
        tanggal={groupedTasks[0]?.tanggal ?? new Date()}
        dailyTask={dailyTask}
      />
    </>
  )
}

export default DailyTasksPage;