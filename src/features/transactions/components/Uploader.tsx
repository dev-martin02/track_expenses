import { Button } from "@/shared/components/ui/button";
import { uploadTransactions } from "../api/api";

export function UploaderForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const file = formData.get("file") as File;
    await uploadTransactions(file);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <form
        className="bg-white rounded-xl border border-gray-200 p-6"
        onSubmit={handleSubmit}
      >
        <input type="file" className="w-full" name="file" />
        <Button className="bg-finance-green-accent hover:bg-finance-green-accent/90 text-white rounded-xl px-6">
          Upload
        </Button>
        <Button className="bg-red-500 hover:bg-red-500/90 text-white rounded-xl px-6">
          Cancel
        </Button>
      </form>
    </div>
  );
}
