"use client";

// import { useEffect } from "react";
import { useSession } from "next-auth/react";

// import { auth } from "~/app/api/auth/[...nextauth]/route";

// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";

function DailyTasksPage () {

  const {data: session} = useSession();
  console.log("Session:", session);
  const userId = session?.user?.id;
  console.log("User ID:", userId);

  const { data: groupedTasks, isLoading } = api.task.getTasksByPatient.useQuery({
    pasienId: session?.user?.id || "cm9a1vkuc0001sbqv5wzq5i4z",
  });

  return (
    <>
      
    </>
  );
}

export default DailyTasksPage;