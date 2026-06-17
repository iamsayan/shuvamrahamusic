import { LuMusic } from 'react-icons/lu';

export default function SectionLoader({ message = 'Loading content...' }: { message?: string }) {
  return (
    <div className="relative flex min-h-120 w-full flex-col items-center justify-center bg-transparent py-20">
      {/* Background glows */}
      <div className="absolute size-64 rounded-full bg-cyan-500/5 blur-[80px]" />
      
      {/* Loader Content */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated Icon Ring */}
        <div className="relative flex size-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full border border-cyan-500/20 opacity-75" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full border-t border-r border-transparent border-t-cyan-400 border-r-cyan-400/30 animate-spin" style={{ animationDuration: '1.2s' }} />
          <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <LuMusic className="size-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">{message}</p>
      </div>
    </div>
  );
}
