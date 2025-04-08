import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { NavbarUser } from "~/app/_components/user/navbar-user";
import AdsSlider from "./_components/user/ads-slider";
import HistoryUser from "./_components/user/history-user";

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
      </div>
      <AdsSlider />
      <NavbarUser />
    </div>
  );
}
