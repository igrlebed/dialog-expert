import { motion } from 'motion/react';
import { ShieldCheck, Server, FileSignature, LockKeyhole } from 'lucide-react';
import { SplitText, BlurReveal, StaggerContainer, StaggerItem, MagneticCard, ClipReveal } from './motion-utils';

const securityFeatures = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "152-ФЗ",
    description: "Полное соответствие закону о персональных данных. Данные защищены по стандартам ГОСТ.",
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: "On-Premise",
    description: "Развертывание решения на серверах вашей компании.",
  },
  {
    icon: <FileSignature className="w-5 h-5" />,
    title: "NDA",
    description: "Соглашение о неразглашении конфиденциальной информации до старта.",
  },
  {
    icon: <LockKeyhole className="w-5 h-5" />,
    title: "Контур клиента",
    description: "Хранение и обработка аудиозаписей внутри закрытого контура.",
  },
];

export const Security = () => {
  return (
    <section id="security" className="relative py-32 md:py-40 bg-[#050a09]">
      {/* Breathing aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <ClipReveal delay={0}>
            <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
              Безопасность
            </p>
          </ClipReveal>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
            <SplitText delay={0.05} staggerDelay={0.04} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
              Enterprise-уровень защиты данных
            </SplitText>
          </h2>
          <BlurReveal delay={0.5} y={40}>
            <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em]">
              Мы понимаем важность коммерческой тайны, поэтому решение готово для корпоративного внедрения.
            </p>
          </BlurReveal>
        </div>

        {/* Grid — 2x2 bento with magnetic */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto" staggerDelay={0.08} delay={0.8}>
          {securityFeatures.map((feature, index) => (
            <StaggerItem key={index}>
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
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Security;