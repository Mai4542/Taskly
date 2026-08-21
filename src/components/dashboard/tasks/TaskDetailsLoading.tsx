import { useEffect, useState } from 'react';

const TaskDetailsLoading = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div
        className="relative w-full max-w-[390px] max-h-[92vh] bg-white/70 backdrop-blur-[10px] rounded-t-3xl border-t border-white/40 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'none', transition: 'none' }}
      >
        <div className="flex flex-col items-center px-0 pt-3 pb-2 shrink-0">
          <div className="w-10 h-1 bg-neutral-low/50 rounded-xl mb-2" />
          <div className="flex flex-row justify-between items-center px-6 w-full h-[30px]">
            <span className="label-xs text-neutral-medium uppercase tracking-[1.1px]">
              Task Details
            </span>
          </div>
        </div>

        <div className="flex-1 px-6 pt-2 pb-[118.75px] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="animate-pulse h-8 w-24 rounded bg-surface-low" />
            <div className="animate-pulse h-[30px] w-3/4 rounded bg-surface-low" />
            <div className="animate-pulse h-6 w-32 rounded bg-surface-low" />
          </div>

          <div className="grid grid-cols-2 gap-[11.5px]">
            <div className="animate-pulse h-[81px] rounded-lg bg-surface-low" />
            <div className="animate-pulse h-[81px] rounded-lg bg-surface-low" />
            <div className="animate-pulse h-[81px] rounded-lg bg-surface-low" />
            <div className="animate-pulse h-[81px] rounded-lg bg-surface-low" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="animate-pulse h-5 w-24 rounded bg-surface-low" />
            <div className="animate-pulse h-[156px] rounded-lg bg-surface-low" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-[95%] sm:max-w-[420px] md:max-w-[85%] lg:max-w-[896px] max-h-[92vh] md:h-[870px] bg-white shadow-2xl rounded-lg flex flex-col md:flex-row overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      style={{ animation: 'none', transition: 'none' }}
    >
      <div className="w-full md:w-[576px] h-full flex flex-col">
        <div className="flex flex-col items-start px-5 py-4 md:px-8 md:py-6 gap-2 border-b border-border">
          <div className="animate-pulse h-5 w-24 rounded bg-surface-low" />
          <div className="animate-pulse h-9 w-2/3 rounded bg-surface-low" />
        </div>
        <div className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="animate-pulse h-48 md:h-[472px] rounded-xl bg-surface-low" />
        </div>
        <div className="flex flex-row justify-between items-center px-5 py-4 md:px-8 bg-surface-low">
          <div className="animate-pulse h-8 w-24 rounded bg-white" />
          <div className="animate-pulse h-8 w-20 rounded bg-surface-highest" />
        </div>
      </div>

      <div className="w-full md:w-[320px] h-full bg-surface-low md:border-l border-border p-5 md:p-8 flex flex-col gap-6">
        <div className="animate-pulse h-6 w-20 rounded bg-white" />
        <div className="animate-pulse h-10 w-full rounded bg-white" />
        <div className="animate-pulse h-6 w-24 rounded bg-white" />
        <div className="animate-pulse h-10 w-full rounded bg-white" />
        <div className="animate-pulse h-6 w-20 rounded bg-white" />
        <div className="animate-pulse h-10 w-full rounded bg-white" />
      </div>
    </div>
  );
};

export default TaskDetailsLoading;
