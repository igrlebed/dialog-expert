import { motion } from 'motion/react';
import { TrendingDown, Users, EarOff, ShieldAlert } from 'lucide-react';
import { SplitText, BlurReveal, StaggerContainer, StaggerItem, MagneticCard, ClipReveal } from './motion-utils';

const painPoints = [
  {
    icon: <Users className="w-5 h-5" />,
    stat: "40–60%",
    title: "кассиров не делают допродажу",
    description: "Обязательные предложения по скрипту игнорируются без системного контроля.",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    stat: "~20%",
    title: "колебания среднего чека",
    description: "Выручка нестабильна и напрямую зависит от конкретной смены на точке.",
  },
  {
    icon: <EarOff className="w-5 h-5" />,
    stat: "0%",
    title: "реальных диалогов слышит руководство",
    description: "Без записи и анализа невозможно понять, что происходит на кассе.",
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    stat: "5–8%",
    title: "оборота теряется ежемесячно",
    description: "Деньги, которые бизнес уже заработал, но упустил на этапе общения.",
  },
];

export const PainPoints = () => {
  return (
    <section id="pain" className="relative pt-32 md:pt-40 pb-32 md:pb-40 bg-transparent">
      {/* Top-to-solid background gradient — blends with Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5,10,9,0.4) 15%, rgba(5,10,9,0.85) 30%, #050a09 45%)',
        }}
      />

      {/* Subtle aurora glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[500px] -top-[200px] left-1/2 -translate-x-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <ClipReveal delay={0}>
            <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
              Проблема
            </p>
          </ClipReveal>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
            <SplitText delay={0.1} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
              Почему бизнес теряет&nbsp;деньги
            </SplitText>
          </h2>
          <BlurReveal delay={0.4} y={40}>
            <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em]">
              Без регулярного контроля диалогов вы теряете часть выручки каждый день.
            </p>
          </BlurReveal>
        </div>

        {/* Bento Grid with magnetic cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.08} delay={0.15}>
          {painPoints.map((point, index) => (
            <StaggerItem key={index}>
              <MagneticCard className="h-full">
                <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 overflow-hidden h-full">
                  {/* Hover glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00A84F]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 group-hover:bg-[#00A84F]/15 group-hover:text-[#34D27B] transition-all duration-500">
                        {point.icon}
                      </div>
                      <span className="text-[32px] md:text-[40px] tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-r from-[#00A84F] to-[#34D27B]">
                        {point.stat}
                      </span>
                    </div>
                    <h3 className="text-[17px] text-white/80 mb-3 tracking-[-0.01em] leading-snug first-letter:uppercase">
                      {point.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </MagneticCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default PainPoints;