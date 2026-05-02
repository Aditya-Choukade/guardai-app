import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0f0f] pt-20">
      <SignIn />
    </div>
  );
}
