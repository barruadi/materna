import SidebarDesktop from "~/app/_components/nakes/sidebar";
import Topbar from "~/app/_components/nakes/topbar";

export default function daftarPasien() {
    return (
      <div className="p-8 space-y-6">
        <Topbar username="Nakes" />
        <div className="">
            <SidebarDesktop />
        </div>
        
        <div className="pl-52 p-8 space-y-6"> {/* padding-left = lebar sidebar */}
            <h1 className="text-2xl font-bold">INI DAFTAR PASIEN</h1>
        </div>
      </div>
    );
  }