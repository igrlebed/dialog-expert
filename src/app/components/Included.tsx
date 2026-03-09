import { Target, CheckCircle2, Percent, TrendingUp, Users2, FileText } from 'lucide-react';
import { SplitText, BlurReveal, StaggerContainer, StaggerItem, MagneticCard, ClipReveal } from './motion-utils';

const features = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Подключение 2–10 точек",
    description: "Быстрый старт для тестирования гипотез.",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "Анализ 100% диалогов",
    description: "Каждый разговор записывается и анализируется ИИ в реальном времени.",
  },
  {
    icon: <Percent className="w-5 h-5" />,
    title: "Процент выполнения скрипта",
    description: "Метрика соблюдения стандартов по каждому сотруднику и смене.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Индекс апсейла",
    description: "Оценка частоты и качества допродаж.",
  },
  {
    icon: <Users2 className="w-5 h-5" />,
    title: "Рейтинг кассиров",
    description: "Оценка персонала на основе данных.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Финансовый отчёт",
    description: "Аналитика влияния диалогов на выручку.",
  },
];

export const Included = () => {
  // Checkerboard bento pattern
  const spanPattern = [1, 2, 2, 1, 1, 2];

  return (
    <section className="relative py-32 md:py-40 bg-[#050a09]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <ClipReveal delay={0}>
            <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
              Что входит в пилот
            </p>
          </ClipReveal>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
            <SplitText delay={0.1} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
              Полный набор метрик
            </SplitText>
            <br />
            <SplitText delay={0.35} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
              за 30 дней
            </SplitText>
          </h2>
          <BlurReveal delay={0.4} y={40}>
            <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em]">
              Конкретный набор метрик и управленческих результатов для вашего бизнеса.
            </p>
          </BlurReveal>
        </div>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.06} delay={0.15}>
          {features.map((feature, index) => {
            const colSpan = spanPattern[index % spanPattern.length];
            return (
              <StaggerItem
                key={index}
                className={colSpan === 2 ? 'md:col-span-2' : ''}
              >
                <MagneticCard className="h-full" intensity={6}>
                  <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 mb-5 group-hover:bg-[#00A84F]/15 group-hover:text-[#34D27B] transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-[17px] text-white/80 mb-2 tracking-[-0.01em]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </MagneticCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Included;