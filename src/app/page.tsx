import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { NavbarUser } from "~/app/_components/user/navbar-user";
import TaskItem from "./_components/user/daily-task";
import AdsSlider from "./_components/user/ads-slider";
import HistoryUser from "./_components/user/history-user";
import SliderUser from "./_components/user/slider-user";
import TextboxUser from "./_components/user/textbox-user";
import { use } from "react";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  function setInputText(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div className="space-y-3 p-4">
        <TaskItem text="Daily Task 1" />
        <TaskItem text="Daily Task 2" />
        <TaskItem text="Daily Task 3" />
      </div>
      <AdsSlider />
      <HistoryUser faskes="Faskes" nakes="Nakes" resiko="Resiko" />
      <NavbarUser />
    </div>
  );
}
