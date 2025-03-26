import PasienForm from "~/app/_components/pasien-form";
import PasienList from "~/app/_components/pasien-list";

export default function PasienPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Manajemen Pasien</h1>
      <PasienForm />
      <PasienList />
    </div>
  );
}
