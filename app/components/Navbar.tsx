import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-black/80 backdrop-blur-md border-b border-zinc-900/50">
      <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-primary-container transition-colors">GuardAI</Link>
      
      <div className="flex items-center gap-6">
        <Show when="signed-out">
          <SignInButton forceRedirectUrl="/dashboard">
            <button className="font-space-grotesk tracking-tight text-xs font-medium text-zinc-400 hover:text-white transition-colors">Login</button>
          </SignInButton>
          <SignUpButton forceRedirectUrl="/dashboard">
            <button className="font-space-grotesk tracking-widest uppercase text-[10px] font-bold text-black bg-primary-container hover:bg-white transition-all px-4 py-2 rounded-full active:scale-95">Get Started</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link href="/dashboard" className="font-space-grotesk tracking-tight text-xs font-medium text-zinc-400 hover:text-white transition-colors mr-4">Dashboard</Link>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
