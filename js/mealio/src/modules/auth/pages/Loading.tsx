import GuestLayout from "@/components/layout/GuestLayout";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <GuestLayout title="">
      <div className="flex flex-col items-center text-muted-foreground py-10">
        <LightningBoltIcon className="h-32 w-full p-4" />
        <span className="text-xl">Loading...</span>
      </div>
    </GuestLayout>
  );
}
