"use client";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .glow-circle {
          animation: pulse-glow 8s ease-in-out infinite;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .glass-card {
          background: rgba(26, 28, 28, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(57, 255, 20, 0.4);
        }
      `}</style>
      {/* We don't need TopNavBar since layout.tsx has it */}
      <main className="pt-16 bg-[#0c0f0f]">
        
<section className="relative min-height-[100vh] pt-32 pb-20 overflow-hidden" data-purpose="hero-section">
{/* Background Glow Elements */}
<div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px] glow-circle"></div>
<div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[100px] glow-circle"></div>
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-12 gap-8 relative z-10">
{/* Left Vertical Text */}
<div className="col-span-1 hidden lg:flex flex-col justify-center items-center">
<div className="vertical-text text-[10px] tracking-[1em] text-gray-500 uppercase">
          Adaptive Security
        </div>
</div>
{/* Main Content */}
<div className="col-span-12 lg:col-span-10">
<div className="flex items-center space-x-2 mb-8">
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium">Cryptocurrency</span>
<div className="w-1.5 h-1.5 bg-primary-container rounded-full"></div>
</div>
<h1 className="text-6xl md:text-8xl font-medium leading-[0.9] tracking-tighter mb-12">
          CYBER DEFENSE<br/>
          THAT EVOLVES<br/>
<span className="text-primary-container italic">DAILY.</span>
</h1>
<div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-12">
<div className="relative group cursor-pointer">
<div className="w-16 h-16 rounded-full border border-primary-container/40 flex items-center justify-center group-hover:scale-110 transition-transform">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
<svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
</div>
</div>
</div>
<div className="max-w-md">
<p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-driven protection that learns, adapts, and grows stronger every single day—so you stay one step ahead of every digital threat.
            </p>
<div className="flex items-center space-x-4">
<div className="h-[1px] w-20 bg-gray-700"></div>
<SignUpButton forceRedirectUrl="/dashboard">
  <button className="bg-primary-container text-black text-[11px] font-bold px-6 py-2 rounded-full flex items-center">
    Get Protected Today
  </button>
</SignUpButton>
</div>
</div>
</div>
</div>
</div>
{/* Stats Row */}
<div className="max-w-[1280px] mx-auto px-8 mt-24 flex justify-end space-x-12">
<div className="text-right">
<div className="text-2xl font-medium">1,600+</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest">User Active</div>
</div>
<div className="text-primary-container text-xl mt-1">+</div>
<div className="text-right">
<div className="text-2xl font-medium">300+</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest">Technologies</div>
</div>
</div>
</section>
{/* END: HeroSection */}
{/* BEGIN: WhoWeAre */}
<section className="py-24 bg-[#0c0f0f]" data-purpose="about-section">
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
<div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container">
<img alt="Security Analyst" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBigMG5t7RDhXgecz-tSPkpsn0f6HDkim_3L4KhpmiS2HylPzP5OmOzQnTTc1sIZpjMCWDrSdrK2f9enF2n5Zpk_pTwcoGPtvu8mqpbKN_BYBu2S8pzvcV4O2LukCwGAmKjhAZ4azuw4ipZql5qV9hle_pr_wHMlkMrvLrxkz_CEaOIxYQMhkxHIpH78KQvv7nw7KOfqiC2sBEvUpMgzfFa89-O5Z8U5JrwPOOqcU_28ANk3ib9Y3p6U-XVnDgU4EFepmMcK1d_KKE-"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
<svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
</div>
</div>
<div className="absolute bottom-6 left-6 text-[10px] text-gray-400 uppercase tracking-widest">
          We Don't Just Defend. We Adapt.
        </div>
</div>
<div>
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium mb-6 inline-block">Who We Are</span>
<h2 className="text-3xl md:text-4xl font-medium leading-tight mb-8 uppercase">
          At GuardAI, we believe cyber threats don't sleep and neither should your defense. We build intelligent, evolving security systems powered by AI and real-time data.
        </h2>
<div className="grid grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-12">
<div>
<div className="text-2xl font-bold">200+</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">AI Intelligence</div>
</div>
<div>
<div className="text-2xl font-bold">1,600+</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Approval Rate</div>
</div>
<div>
<div className="text-2xl font-bold">300+</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Partners Protected</div>
</div>
</div>
</div>
</div>
</section>
{/* END: WhoWeAre */}
{/* BEGIN: Features */}
<section className="py-24 bg-[#0c0f0f]" data-purpose="features-section">
<div className="max-w-[1280px] mx-auto px-8 text-center mb-20">
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium mb-4 inline-block">Features</span>
<h2 className="text-4xl md:text-5xl font-medium">Smarter Each Day,<br/>Stronger Every Hour</h2>
</div>
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Feature Card 1 */}
<div className="glass-card rounded-2xl p-8 flex flex-col h-full border-white/5">
<div className="flex space-x-2 mb-8">
<div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
<div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg></div>
</div>
<img alt="Threat Detection UI" className="rounded-lg mb-8 opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjc475GEWGmDoY3fF2MFHjghBCvOqQEQt3RYFBUSYhUG8OI9Kl-r9cb_hGJJVmocPVq83PH3yl5j_lI381ks7LeDoESRS5xpmdT8mF_wku2yJ02Q2yJl8cPDQKC6LJA9Z9acnwN0msx1QqidvpZmrvTatqfMEv1DDYLQWWjad1O1YWM60cA-NTNoFK4TbiFOPbhg2q98NbfaWR7-6mOU25KrarL6wZYLqaiYf6TIVyMn4bpKqRedSfK61BH4AXYREz5cF-f7AvaN7Q"/>
<h3 className="text-xl font-medium mb-4">Real-Time Threat Detection</h3>
<div className="mt-auto flex justify-end">
<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
</div>
</div>
{/* Feature Card 2 (Highlighted) */}
<div className="bg-primary-container/5 border border-primary-container/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
<h3 className="text-2xl font-medium mb-6">Self-Learning AI Engine</h3>
<SignUpButton forceRedirectUrl="/dashboard">
  <button className="bg-primary-container text-black font-bold px-8 py-3 rounded-full text-xs mb-8">Get Started</button>
</SignUpButton>
<p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
          GuardAI learns from threats to enhance your defense.
        </p>
</div>
{/* Feature Card 3 */}
<div className="glass-card rounded-2xl p-8 flex flex-col h-full">
<img alt="Cloud Security UI" className="rounded-lg mb-8 opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-an1_UNazlxC3enMG8dgwU67Q16ldnZf8Rq86CZ5CadCJHplPK_1GMUKE7vrMledPbnW-6ok2gdwwzdny88PQKVgnJMwb_-6bXCwDNJloqbwWUoWxPc21YnBZ9D52buUrF3FklIChOCY07wf_L2MU4NoIuELu4MGB1ofSjSknSVIsYCu76aUD-m8N9fKjj0IbHZlAkmrdA-I_LVTv8ntxMSXfb0-rvvfNQ4Lr_YXTZNrbjT-KcicMCwe1HCotR5ZrhWWvDlyqO8cw"/>
<h3 className="text-xl font-medium mb-4">Multi-Cloud Protection</h3>
<div className="mt-auto flex justify-end">
<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
</div>
</div>
</div>
</section>
{/* END: Features */}
{/* BEGIN: BenefitSection */}
<section className="py-24 bg-[#0c0f0f]" data-purpose="benefits-section">
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
<div>
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium mb-4 inline-block">Benefit</span>
<h2 className="text-4xl md:text-5xl font-medium leading-tight">Protection That Gets<br/>Smarter With You</h2>
</div>
<div className="flex items-center">
<p className="text-gray-500 text-sm max-w-sm leading-relaxed">
          Because staying secure shouldn't mean staying still. Our evolving defense gives you peace of mind—and room to grow.
        </p>
</div>
</div>
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
{/* Left Stack */}
<div className="space-y-4">
<div className="glass-card rounded-2xl p-8 h-1/2 flex flex-col justify-end">
<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
<svg className="w-4 h-4 text-primary-container" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
</div>
<h4 className="text-xl font-medium mb-2">Future-Proof<br/>Your Security</h4>
</div>
<div className="hidden md:block h-1/2"></div>
</div>
{/* Middle Stack */}
<div className="space-y-4">
<div className="hidden md:block h-1/2"></div>
<div className="glass-card rounded-2xl p-8 h-1/2 flex flex-col justify-end">
<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary-container">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
</div>
<h4 className="text-xl font-medium mb-2">Stay Safe, Even<br/>While You Sleep</h4>
</div>
</div>
{/* Right Stack */}
<div className="space-y-4">
<div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-8 h-1/2 flex flex-col justify-end relative overflow-hidden group">
<div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center mb-4 text-primary-container">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="7" width="7" x="3" y="3"></rect><rect height="7" width="7" x="14" y="3"></rect><rect height="7" width="7" x="14" y="14"></rect><rect height="7" width="7" x="3" y="14"></rect></svg>
</div>
<h4 className="text-xl font-medium mb-2">Scale<br/>Without Fear</h4>
<p className="text-[10px] text-gray-400 mt-2">GuardAI grows with your needs,<br/>no added complexity.</p>
</div>
<div className="glass-card rounded-2xl p-8 h-1/2 flex flex-col justify-end">
<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary-container">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
</div>
<h4 className="text-xl font-medium mb-2">Compliance<br/>Made Simple</h4>
</div>
</div>
</div>
</section>
{/* END: BenefitSection */}
{/* BEGIN: WhyChooseUs */}
<section className="py-24 bg-[#0c0f0f]" data-purpose="why-us-section">
<div className="max-w-[1280px] mx-auto px-8 mb-20 flex flex-col md:flex-row justify-between items-end">
<div className="max-w-xs mb-8 md:mb-0">
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium mb-4 inline-block">Why Choose Us</span>
<p className="text-gray-500 text-xs leading-relaxed uppercase">
          GuardAI is a cybersecurity platform that learns and adapts daily, ensuring your business stays protected.
        </p>
</div>
<h2 className="text-5xl md:text-6xl font-medium text-right uppercase">
        We Evolve So You're<br/>Untouchable
      </h2>
</div>
<div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Logic Card 1 */}
<div className="bg-white/5 rounded-2xl p-8 border border-white/5">
<h4 className="text-lg font-medium mb-8">Built on Adaptive Intelligence</h4>
<div className="aspect-video bg-surface rounded-xl overflow-hidden relative mb-8">
<img alt="AI Logic" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Jcvo4WVQKdLiNqH5rAA8pSz77BsYAa8YQl6e_YjL01qFM7QkRV2SWQcbyvUgsJ3fn2YDH1H6-3-JnFyTg2s3gUDcASg5FJhbw-EZkQG7dPoiVg-73dvNFPYfJ6wxxHVz8Rz1yYPPR5-TtuLFsZv9Ie73NL2c3QF370LO2tIDI_r9Z6x9vu9VII6MEWjuJQyOgCe9TA2308pKdNqf064bEV4D4zwyxKC-ZCojmW5hZV4MQSYmXY4eShJDDzw780AgkA3OYspDFOen"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
<svg className="w-3 h-3 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
</div>
</div>
</div>
<p className="text-[10px] text-gray-500 leading-relaxed">
          We don't use static rules—we use self-learning AI that evolves with every attack vector and data input.
        </p>
</div>
{/* Logic Card 2 */}
<div className="bg-white/5 rounded-2xl p-8 border border-white/5">
<h4 className="text-lg font-medium mb-8">Defense in Real-Time, All the Time</h4>
<div className="aspect-video bg-surface rounded-xl overflow-hidden relative mb-8">
<img alt="Monitoring" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX9VHoZHpPkb1Q562vKvA3owKUkxifYLXvw3dN1AIgFdGj881VudKyr2acYGFJRv5HWT6WfLyx-dPObFQmaGjDJYs-m1azjXPaem6XC-Sr7noDRDUv4mTVHfWhI1-tSbkyum_rSqnbdwS99JIRSUsh7FUlfSI9Q4-F-p1FzB1cCMCmDXxDe9epLTNSR_DKFkT9t_SYwFjB2VBuWXJoxNi28FotPgGgFc3e2Q_Rixg7568M3_RUatOwH7BU2EVS0uAsP3fSHp7FZ_c5"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
<svg className="w-3 h-3 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
</div>
</div>
</div>
<p className="text-[10px] text-gray-500 leading-relaxed">
          No lag. No delay. Our monitoring and response are continuous, instant, and relentless.
        </p>
</div>
{/* Logic Card 3 */}
<div className="bg-white/5 rounded-2xl p-8 border border-white/5">
<h4 className="text-lg font-medium mb-8">Seamless Across Any Stack</h4>
<div className="aspect-video bg-surface rounded-xl overflow-hidden relative mb-8">
<img alt="Integration" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkXlDXzlvyQ6u7G9-wQjMubtPa8HDT-DjxJ_ktHjFv-RpJ8wfB4LIMICNnPD5ymTR3nrL8rFvQV96oe5o8N-Gl0H4dwzKnwCwUk8tXQqlriAhi3uKBVPOgMfvgoEtXNwnEEE3WTt6NB1pmfIWiqHFL3GnQWw_g3tnojTUWACwA5EBcHBW9zgwesbbWv1ddVvUGZHRkxRAC2bB4p3iqaMPO-jLoY2n3qhtO7ISLZiMC34m-6s2DVeIBwJ68w0L2CdPexjps2lt81x9v"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
<svg className="w-3 h-3 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
</div>
</div>
</div>
<p className="text-[10px] text-gray-500 leading-relaxed">
          From cloud-native to hybrid setups, GuardAI integrates with your existing infrastructure—fast and frictionless.
        </p>
</div>
</div>
</section>
{/* END: WhyChooseUs */}
{/* BEGIN: Testimonials */}
<section className="py-24 bg-[#0c0f0f]" data-purpose="testimonials-section">
<div className="max-w-[1280px] mx-auto px-8">
<div className="mb-16">
<span className="px-3 py-1 border border-primary-container/30 rounded-full text-[10px] text-primary-container uppercase font-medium mb-4 inline-block">Testimonials</span>
<h2 className="text-4xl md:text-5xl font-medium">Trusted by<br/>the Vigilant</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Testimonial 1 */}
<div className="bg-white/5 rounded-2xl p-12 flex flex-col border border-white/5">
<div className="text-primary-container mb-8">
<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017C10.4647 12 10.017 11.5523 10.017 11V9C10.017 6.23858 12.2556 4 15.017 4H19.017C21.7784 4 24.017 6.23858 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0.017 21L0.017 18C0.017 16.8954 0.912422 16 2.017 16H5.017C5.56928 16 6.017 15.5523 6.017 15V9C6.017 8.44772 5.56928 8 5.017 8H1.017C0.464722 8 0.017 8.44772 0.017 9V11C0.017 11.5523 -0.430278 12 -0.982556 12H-2.98256C-3.53484 12 -3.98256 11.5523 -3.98256 11V9C-3.98256 6.23858 -1.74397 4 1.017 4H5.017C7.77842 4 10.017 6.23858 10.017 9V15C10.017 18.3137 7.33072 21 4.017 21H0.017Z"></path></svg>
</div>
<p className="text-sm text-gray-400 mb-12 leading-relaxed">
            GuardAI adapts faster than our team ever could. We've seen a 90% drop in attempted intrusions.
          </p>
<div className="mt-auto">
<div className="font-bold text-sm">Lina M.</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Founder of FlowTech</div>
</div>
</div>
{/* Testimonial 2 */}
<div className="bg-white/5 rounded-2xl p-12 flex flex-col border border-white/5">
<div className="text-primary-container mb-8">
<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017C10.4647 12 10.017 11.5523 10.017 11V9C10.017 6.23858 12.2556 4 15.017 4H19.017C21.7784 4 24.017 6.23858 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0.017 21L0.017 18C0.017 16.8954 0.912422 16 2.017 16H5.017C5.56928 16 6.017 15.5523 6.017 15V9C6.017 8.44772 5.56928 8 5.017 8H1.017C0.464722 8 0.017 8.44772 0.017 9V11C0.017 11.5523 -0.430278 12 -0.982556 12H-2.98256C-3.53484 12 -3.98256 11.5523 -3.98256 11V9C-3.98256 6.23858 -1.74397 4 1.017 4H5.017C7.77842 4 10.017 6.23858 10.017 9V15C10.017 18.3137 7.33072 21 4.017 21H0.017Z"></path></svg>
</div>
<p className="text-sm text-gray-400 mb-12 leading-relaxed">
            Our old security was reactive. GuardAI is proactive—and it just works. We don't worry anymore.
          </p>
<div className="mt-auto">
<div className="font-bold text-sm">James R.</div>
<div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">NovaSupply</div>
</div>
</div>
</div>
{/* Controls */}
<div className="flex space-x-4 mt-12">
<button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
</button>
<button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
</button>
</div>
</div>
</section>
{/* END: Testimonials */}
{/* BEGIN: CTASection */}
<section className="py-24" data-purpose="cta-section">
<div className="max-w-[1280px] mx-auto px-8">
<div className="relative overflow-hidden rounded-3xl bg-surface-container min-h-[500px] grid grid-cols-1 md:grid-cols-2">
{/* Content Side */}
<div className="p-16 flex flex-col justify-center relative z-10 bg-surface-container">
<div className="flex space-x-4 mb-12">
<div className="w-8 h-8 rounded bg-primary-container/20 flex items-center justify-center text-primary-container"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div>
<div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></div>
<div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></div>
</div>
<h2 className="text-4xl md:text-5xl font-medium leading-tight mb-12">
            Ready to Outsmart<br/>Tomorrow's<br/>Threats?
          </h2>
<SignUpButton forceRedirectUrl="/dashboard">
  <button className="w-fit bg-primary-container text-black font-bold px-8 py-3 rounded-md flex items-center space-x-3 hover:brightness-110 transition-all">
  <span>Get Started Now</span>
  <svg className="w-4 h-4 transform rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
  </button>
</SignUpButton>
</div>
{/* Visual Side */}
<div className="relative bg-[#0c0f0f] p-8 hidden md:flex flex-col gap-4 overflow-hidden">
<img alt="Matrix Background" className="absolute inset-0 opacity-20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUfHxi4SHYvYNCBQWe7hcvhCHV3Aal8y4tEn8pTMJhzjNkmaMbhHH1xJfqTRlJ48FG8ZpzRVldzsOfAkKucadbwBiPsNE8kg5tUMuLkvAXMaquoNCBns6g1BnfGJEf8J8J0Gn0GwuSeN7enzsGHnhz8XCZ8Cj1ks0TSziUlzTRifbBnlJ3eYvU7B3eJh10ObxGDqHjWoOHF1FthXwkyIXexyueuHuYvfXRaJPc-E8eRnlO-QsfxU-svbEFAThb-8ISCpTlm7_sW5Nw"/>
<div className="grid grid-cols-2 gap-4 h-full relative z-10">
<div className="rounded-xl overflow-hidden border border-white/5">
<img alt="Data" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfQHLvEgs2Qdgbgg4ZPIMq-ROt4wyQiE-pF7yLTVb_e6_4eXxPm-Cbx8JIxX3sDv9rrdMtK5HkD-9ElcI_TcOogdOw8NLBf2OIp3ib4z-vysNn6PS0F-MaJa3jiIZmaD5N74h8h7L5agd6jJH0voyGTUExxHDX85mNJOrhE-FpcFI58mhKvUtpw2orc1m2dBgd44zMb3m2ObfRlFC9utLV1pSSnhlCmFdJOqHtTP6B8LgaFexdmyUB8GBnsfDEUFVE5SgQGN3miMii"/>
</div>
<div className="flex flex-col gap-4">
<div className="rounded-xl overflow-hidden border border-white/5 flex-grow">
<img alt="Stats" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3L6I66uOk0T7Xh6eqJyyjmXrmC3SPTD4Jfld9Q1HxDTK1Haz5MyB-izi5nKzUI2v3zufFVB8ICJrMYZWY40cdY6Uz-deZnvaHo7YPOCkvRbE9g-lpc6vDFGFP43jylwxStnHazS5XfU-Bub-YLl6HL5WeQ9EzNEftwTKt7YkirZf4OfaHT46BQ0QNSun34beIdC35fMFJTkCKZYHXiitsrOLex0cwW6XVH364W0QQTPsiavFNTulFOePxmPQZ1h7LhC0qWeMzbES7"/>
</div>
<div className="rounded-xl overflow-hidden border border-white/5 flex-grow">
<img alt="Interface" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqT4F_-Vas4lcwKRKJ1gWQPOmAHULJKY4I22uk8Te4TbJvs4Ms9no12PgV-5huhcYgtBc39TUlmBSBhywD1sCUG-M0K-AQLVHTwe6x1PBclKRXdlgcU93_g0LvJznd5f2MPtlQ1X6xnuNZOgqGAyx4JFKlYHq66TZyK2iXjmLy3Vn3Fn4LlfNoPbKhMm2n8GaI4PgnPKEco7O0mouhKEuCuitfQjmNuphjAlY5q3AHsv_7oVvfSIEH3_FoANxvlO8_R3vEdNKIIQZq"/>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* END: CTASection */}
{/* BEGIN: Footer */}
<footer className="bg-[#0D0D0D] border-t border-[#1A1A1A] mt-[120px] text-gray-500 font-sans text-sm uppercase tracking-wider" data-purpose="site-footer">
<div className="max-w-[1280px] mx-auto px-8 py-20">
<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
{/* Newsletter */}
<div className="md:col-span-1">
<h3 className="text-white font-bold mb-8 normal-case">Subscribe to our newsletter</h3>
<div className="relative">
<input suppressHydrationWarning className="w-full bg-transparent border-b border-gray-700 pb-2 text-xs focus:ring-0 focus:border-primary-container transition-colors outline-none lowercase" placeholder="obscura@email.ru" type="email"/>
<button className="absolute right-0 top-0 text-gray-400 hover:text-primary-container"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>
</div>
</div>
{/* Links Column 1 */}
<div className="md:col-span-1 flex flex-col space-y-4">
<a className="text-white hover:text-primary-container transition-all" href="#">For applicants</a>
<a className="text-white hover:text-primary-container transition-all" href="#">For Customer</a>
<div className="pt-8">
<span className="text-[10px] text-gray-600 block mb-4">Info</span>
<a className="block hover:text-white transition-colors mb-2" href="#">Contact Us</a>
<a className="block hover:text-white transition-colors" href="#">FAQs ↗</a>
</div>
</div>
{/* Links Column 2 */}
<div className="md:col-span-1">
<span className="text-[10px] text-gray-600 block mb-4">Additional Link</span>
<div className="flex flex-col space-y-2">
<a className="hover:text-white transition-colors" href="#">Our Work</a>
<a className="hover:text-white transition-colors" href="#">Expert Team</a>
<a className="hover:text-white transition-colors" href="#">Testimonials</a>
</div>
</div>
{/* Contact Info */}
<div className="md:col-span-1 grid grid-cols-2 gap-4">
<div>
<span className="text-[10px] text-gray-600 block mb-2">Corporate Office</span>
<div className="text-[11px] text-white">+62 899 077 632</div>
</div>
<div>
<span className="text-[10px] text-gray-600 block mb-2">Phone</span>
<div className="text-[11px] text-white">+62 556 783 472</div>
</div>
<div className="col-span-2 pt-4">
<span className="text-[10px] text-gray-600 block mb-2">Email</span>
<div className="text-[11px] text-white lowercase">yourwebsite@gmail.com</div>
</div>
</div>
</div>
<div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
<div>
<span className="text-[10px] text-gray-600 block mb-1">Address</span>
<div className="text-[11px] normal-case">123 Fashion Street, Jakarta, NY 10001, Indonesia</div>
</div>
<div className="text-[10px] text-gray-600">© 2024 - Copyright</div>
<div className="flex space-x-4 text-[10px] font-bold">
<a className="text-white" href="#">EN</a>
<a className="hover:text-white" href="#">SE</a>
<a className="hover:text-white" href="#">DE</a>
</div>
</div>
</div>
</footer>
{/* END: Footer */}

      </main>
    </>
  );
}
