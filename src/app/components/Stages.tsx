import { useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue, MotionValue } from 'motion/react';
import { Settings, Database, LineChart, Scaling } from 'lucide-react';
import { SplitText, BlurReveal } from './motion-utils';

const stages = [
  {
    step: "01",
    title: "Подключение",
    duration: "1 день",
    description: "Установка и настройка без изменений IT-инфраструктуры.",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "Сбор данных",
    duration: "30 дней",
    description: "Накопление и анализ аудиозаписей со всех точек.",
    icon: <Database className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "Отчётность",
    duration: "3 дня",
    description: "Отчёт с финансовыми и операционными метриками.",
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    step: "04",
    title: "Масштабирование",
    duration: "по решению",
    description: "Развертывание на всю сеть по доказанному ROI.",
    icon: <Scaling className="w-5 h-5" />,
  },
];

/* ── Stage card with scroll-driven animation ── */
function StageCard({
  stage,
  index,
  progress,
}: {
  stage: (typeof stages)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const total = stages.length;
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, peak, end], [0, 1, 1]);
  const y = useTransform(progress, [start, peak], [60, 0]);
  const scale = useTransform(progress, [start, peak], [0.95, 1]);
  const blur = useTransform(progress, [start, peak], [10, 0]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  const glowOpacity = useTransform(
    progress,
    [start, peak, end],
    [0, 1, 0.3]
  );

  const borderColor = useTransform(glowOpacity, (v) =>
    `rgba(0, 168, 79, ${v * 0.4})`
  );
  const cardBorderColor = useTransform(glowOpacity, (v) =>
    `rgba(255, 255, 255, ${0.06 + v * 0.06})`
  );
  const cardBgColor = useTransform(glowOpacity, (v) =>
    `rgba(255, 255, 255, ${0.02 + v * 0.03})`
  );
  const iconBgColor = useTransform(glowOpacity, (v) =>
    v > 0.5
      ? `rgba(0, 168, 79, ${v * 0.15})`
      : `rgba(255, 255, 255, 0.06)`
  );
  const iconColor = useTransform(glowOpacity, (v) =>
    v > 0.5 ? '#34D27B' : 'rgba(255,255,255,0.3)'
  );

  const stepTextColor = useTransform(glowOpacity, (v) =>
    v > 0.5 ? '#34D27B' : 'rgba(255,255,255,0.4)'
  );

  const stepCircleBg = useTransform(glowOpacity, (v) =>
    v > 0.5 ? 'rgba(0, 168, 79, 0.1)' : 'transparent'
  );

  const stepCircleShadow = useTransform(glowOpacity, (v) =>
    v > 0.5 ? '0 0 20px rgba(0, 168, 79, 0.2)' : '0 0 0px transparent'
  );

  return (
    <motion.div
      style={{ opacity, y, scale, filter: filterBlur }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4 pl-7">
        <motion.div
          className="relative z-10 w-10 h-10 rounded-full border bg-[#050a09] flex items-center justify-center"
          style={{ borderColor, backgroundColor: stepCircleBg, boxShadow: stepCircleShadow }}
        >
          <motion.span
            className="text-[13px]"
            style={{ color: stepTextColor }}
          >
            {stage.step}
          </motion.span>
        </motion.div>
        <span className="text-[11px] text-white/20 uppercase tracking-wider">
          {stage.duration}
        </span>
      </div>

      <motion.div
        className="rounded-2xl border p-7"
        style={{
          borderColor: cardBorderColor,
          backgroundColor: cardBgColor,
        }}
      >
        <motion.div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
          style={{
            backgroundColor: iconBgColor,
            color: iconColor,
          }}
        >
          {stage.icon}
        </motion.div>
        <h3 className="text-[17px] text-white/80 mb-2 tracking-[-0.01em]">
          {stage.title}
        </h3>
        <p className="text-sm text-white/30 leading-relaxed">
          {stage.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Progress line ── */
function ProgressLine({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="absolute top-0 left-0 right-0 h-px">
      <div className="absolute inset-0 bg-white/[0.04]" />
      <motion.div
        className="absolute inset-y-0 left-0 right-0 origin-left"
        style={{
          scaleX,
          background:
            'linear-gradient(90deg, #00A84F 0%, #34D27B 60%, transparent 100%)',
        }}
      />
    </div>
  );
}

/* ── Step dot indicator ── */
function StepDot({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const isActive = useTransform(progress, (v: number) =>
    v >= start && v < end ? 1 : v >= end ? 0.5 : 0
  );

  const bgColor = useTransform(isActive, (v: number) =>
    v === 1 ? '#00A84F' : v === 0.5 ? 'rgba(0, 168, 79, 0.3)' : 'rgba(255, 255, 255, 0.1)'
  );

  const width = useTransform(isActive, (v: number) => (v === 1 ? '24px' : '8px'));

  return (
    <motion.div
      className="h-2 rounded-full"
      style={{
        backgroundColor: bgColor,
        width,
      }}
    />
  );
}

/* ── Mobile fallback ── */
function MobileStages() {
  return (
    <div className="lg:hidden">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <BlurReveal delay={0}>
          <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
            Процесс
          </p>
        </BlurReveal>
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
          <SplitText delay={0.1} staggerDelay={0.05} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
            4 шага к&nbsp;результату
          </SplitText>
        </h2>
        <BlurReveal delay={0.35} y={20}>
          <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em] max-w-xl mx-auto">
            Прозрачный и безопасный процесс запуска.
            <br />
            Если пилот не покажет результат — масштабирование не&nbsp;требуется.
          </p>
        </BlurReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
          >
            <div className="flex items-center gap-3 mb-6 pl-7">
              <div className="relative z-10 w-10 h-10 rounded-full border border-white/[0.08] bg-[#050a09] flex items-center justify-center group-hover:border-[#00A84F]/30 transition-colors duration-500">
                <span className="text-[13px] text-white/40 group-hover:text-[#34D27B] transition-colors">
                  {stage.step}
                </span>
              </div>
              <span className="text-[11px] text-white/20 uppercase tracking-wider">
                {stage.duration}
              </span>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/30 mb-5 group-hover:bg-[#00A84F]/15 group-hover:text-[#34D27B] transition-all duration-500">
                {stage.icon}
              </div>
              <h3 className="text-[17px] text-white/80 mb-2 tracking-[-0.01em]">
                {stage.title}
              </h3>
              <p className="text-sm text-white/30 leading-relaxed">
                {stage.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Desktop sticky scroll reveal ── */
function DesktopStages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const computeProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = rect.height;
      const scrollStart = containerTop;
      const scrollEnd = containerTop + containerHeight - window.innerHeight;
      if (scrollEnd <= scrollStart) {
        progress.set(0);
        return;
      }
      const p = Math.min(1, Math.max(0, (window.scrollY - scrollStart) / (scrollEnd - scrollStart)));
      progress.set(p);
    };

    computeProgress();
    window.addEventListener('scroll', computeProgress, { passive: true });
    window.addEventListener('resize', computeProgress);
    return () => {
      window.removeEventListener('scroll', computeProgress);
      window.removeEventListener('resize', computeProgress);
    };
  }, [progress]);

  return (
    <div ref={containerRef} className="hidden lg:block relative" style={{ height: '250vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-12 gap-12 items-start">
            {/* Left: sticky title */}
            <div className="col-span-4">
              <BlurReveal delay={0}>
                <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
                  Процесс
                </p>
              </BlurReveal>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
                <SplitText delay={0.1} staggerDelay={0.05} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
                  4 шага к&nbsp;результату
                </SplitText>
              </h2>
              <BlurReveal delay={0.35} y={20}>
                <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em] max-w-xs">
                  Прозрачный и безопасный процесс запуска.
                  Если пилот не покажет результат — масштабирование не&nbsp;требуется.
                </p>
              </BlurReveal>
              {/* Step indicators */}
              <div className="flex gap-2 mt-10">
                {stages.map((_, i) => {
                  const start = i / stages.length;
                  const end = (i + 1) / stages.length;
                  return (
                    <StepDot key={i} progress={progress} start={start} end={end} />
                  );
                })}
              </div>
            </div>

            {/* Right: cards */}
            <div className="col-span-8 relative">
              <ProgressLine progress={progress} />
              <div className="grid grid-cols-2 gap-4 pt-6">
                {stages.map((stage, index) => (
                  <StageCard
                    key={index}
                    stage={stage}
                    index={index}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Stages = () => {
  return (
    <section id="stages" className="relative bg-[#050a09]">
      {/* Subtle glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[500px] top-1/2 -translate-y-1/2 -left-[200px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,168,79,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Mobile */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 md:py-40 lg:py-0">
        <MobileStages />
      </div>

      {/* Desktop */}
      <div className="relative z-10">
        <DesktopStages />
      </div>
    </section>
  );
};

export default Stages;