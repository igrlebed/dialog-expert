import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Coins } from 'lucide-react';
import { SplitText, BlurReveal, StaggerContainer, StaggerItem, ScaleReveal, ClipReveal } from './motion-utils';

interface MetricDef {
  label: string;
  numericValue: number;
  prefix?: string;
  suffix: string;
}

const metrics: MetricDef[] = [
  { label: 'Средний чек', numericValue: 850, suffix: ' ₽' },
  { label: 'Заказов / день', numericValue: 300, suffix: '' },
  { label: 'Рост чека', numericValue: 5, prefix: '+', suffix: '%' },
  { label: 'Доп. выручка / мес', numericValue: 378000, suffix: ' ₽' },
];

const roiValue = 252;

function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ');
}

function useCounter(end: number, duration: number = 1.8, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldStart || started.current) return;
    started.current = true;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldStart, end, duration]);

  return count;
}

const MetricCard = ({ metric }: { metric: MetricDef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCounter(metric.numericValue, 1.8, isInView);

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 text-center hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500">
      <span className="text-[13px] text-white/30 tracking-[-0.01em] block mb-2">
        {metric.label}
      </span>
      <span className="text-2xl md:text-3xl tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
        {metric.prefix || ''}{formatNumber(count)}{metric.suffix}
      </span>
    </div>
  );
};

const RoiCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCounter(roiValue, 2, isInView);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 shrink-0 w-full md:w-auto">
      <motion.div
        className="w-full md:w-32 h-28 md:h-32 rounded-2xl border border-[#00A84F]/20 bg-[#00A84F]/10 flex flex-row md:flex-col items-center justify-center gap-3 md:gap-0 px-6 md:px-0"
        animate={{
          boxShadow: [
            '0 0 0px rgba(0,168,79,0)',
            '0 0 40px rgba(0,168,79,0.15)',
            '0 0 0px rgba(0,168,79,0)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowUpRight className="w-8 h-8 text-[#34D27B] mb-1" />
        <span className="text-2xl md:text-3xl text-white tracking-[-0.03em]">
          {count}%
        </span>
      </motion.div>
      <span className="text-[11px] text-white/25 uppercase tracking-wider">
        ROI за месяц
      </span>
    </div>
  );
};

export const Economics = () => {
  return (
    <section id="roi" className="relative py-32 md:py-40 bg-[#050a09]">
      {/* Aurora glow — breathing */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[1000px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.1) 0%, rgba(52,210,123,0.04) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <ClipReveal delay={0}>
            <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
              Экономика пилота
            </p>
          </ClipReveal>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
            <SplitText delay={0.1} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
              Пример расчёта для&nbsp;1&nbsp;точки
            </SplitText>
          </h2>
          <BlurReveal delay={0.4} y={40}>
            <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em]">
              Внедрение аудио-контроля окупается менее чем за месяц за счёт роста конверсии и среднего чека.
            </p>
          </BlurReveal>
        </div>

        {/* Metrics row */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8" staggerDelay={0.06} delay={0.1}>
          {metrics.map((m, i) => (
            <StaggerItem key={i}>
              <MetricCard metric={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ROI Card */}
        <ScaleReveal delay={0.3}>
          <div className="relative rounded-2xl border border-[#00A84F]/20 overflow-hidden">
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A84F]/10 via-[#00A84F]/5 to-transparent" />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00A84F]/15 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#34D27B]" />
                  </div>
                  <span className="text-[13px] text-[#34D27B] uppercase tracking-wide">
                    Результат внедрения
                  </span>
                </div>
                <h3 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.04em] leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-3">
                  ROI &lt; 1 месяца
                </h3>
                <p className="text-white/35 text-base leading-relaxed max-w-lg tracking-[-0.01em]">
                  При стоимости пилота <span className="text-white/60">150 000 ₽ / точка</span>, дополнительная выручка составляет <span className="text-white/60">378 000 ₽ / мес</span> — окупаемость с первого месяца.
                </p>
              </div>

              <RoiCounter />
            </div>
          </div>
        </ScaleReveal>
      </div>
    </section>
  );
};

export default Economics;