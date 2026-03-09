import { motion, useScroll, useTransform } from 'motion/react';
import svgPaths from '../../imports/svg-2fzfvhnwda';
import imgDashboard from "figma:asset/efd27c719fc59bd773a877eb7264540ab8646a50.png";
import { Constellation } from './Constellation';
import { FloatingElement, SplitText, TextShimmer, ease } from './motion-utils';
import { useSmoothScroll } from './SmoothScroll';
import { scrollToSection } from './scroll-utils';

const easeOut = ease.out as unknown as number[];

/**
 * Hero section.
 * `ready` prop gates all entrance animations — they stay in initial state
 * until preloader signals completion, then play sequentially.
 */
export const Hero = ({ ready = true }: { ready?: boolean }) => {
  const smoothScroll = useSmoothScroll();
  const { scrollY } = useScroll();

  // Dashboard parallax — gentle, long range
  const dashboardY = useTransform(scrollY, [0, 1200], [0, -60]);
  const dashboardScale = useTransform(scrollY, [0, 1200], [1, 0.97]);
  const dashboardOpacity = useTransform(scrollY, [300, 1000], [1, 0]);
  const dashboardRotateX = useTransform(scrollY, [0, 1000], [0, 3]);

  // Text parallax — separate from dashboard
  const textY = useTransform(scrollY, [0, 800], [0, -30]);
  const textOpacity = useTransform(scrollY, [200, 700], [1, 0]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href, smoothScroll);
  };

  // Animation targets — stay at initial state until ready
  const show = (values: Record<string, unknown>) => ready ? values : undefined;

  return (
    <section className="relative min-h-screen bg-[#050a09] flex flex-col items-center overflow-hidden">
      <Constellation />

      {/* Aurora gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement duration={8} distance={30} delay={0}>
          <motion.div
            className="absolute w-[900px] h-[600px] top-[10%] left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.15) 0%, rgba(0,168,79,0.05) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </FloatingElement>
        <FloatingElement duration={10} distance={20} delay={2}>
          <motion.div
            className="absolute w-[600px] h-[400px] top-[30%] left-[10%]"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,100,60,0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </FloatingElement>
        <FloatingElement duration={9} distance={25} delay={1}>
          <motion.div
            className="absolute w-[500px] h-[400px] top-[20%] right-[5%]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(52,210,123,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </FloatingElement>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-24 md:pt-28 lg:pt-32 pb-10 flex flex-col items-center">
        {/* ── Text block: own parallax wrapper ── */}
        <motion.div
          className="flex flex-col items-center w-full"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={show({ opacity: 1, y: 0, scale: 1 })}
            transition={{ duration: 0.8, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A84F] animate-pulse" />
            <span className="text-[13px] text-white/50 tracking-[-0.01em]">
              Пилот на 2–10 точках без интеграции с кассой
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-center mb-5 max-w-4xl">
            {ready && (
              <TextShimmer>
                <span className="text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.04em] leading-[0.7]">
                  <SplitText delay={0.1} staggerDelay={0.07} immediate wordClassName="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40">
                    Аудио-контроль сотрудников
                  </SplitText>
                </span>
              </TextShimmer>
            )}
            {!ready && (
              <span className="text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.04em] leading-[0.6] bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40 opacity-0">
                Аудио-контроль сотрудников
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 1.0, delay: 0.4, ease: easeOut }}
            className="text-[clamp(1rem,1.8vw,1.25rem)] text-white/40 text-center max-w-3xl leading-snug tracking-[-0.01em] mb-8"
          >
            «Диалог Эксперт» записывает и анализирует разговоры сотрудников с&nbsp;клиентами, показывает потери в&nbsp;продажах и помогает повышать средний чек.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 1.0, delay: 0.55, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-4"
          >
            <motion.a
              href="#form"
              onClick={(e) => handleClick(e, '#form')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-[#00A84F] hover:bg-[#00C85A] text-[15px] text-white tracking-[-0.01em] transition-colors duration-300 shadow-[0_0_40px_rgba(0,168,79,0.35)] hover:shadow-[0_0_60px_rgba(0,168,79,0.5)]"
            >
              Получить расчёт пилота
              <svg className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                <path d={svgPaths.p2c221f00} fill="currentColor" />
              </svg>
            </motion.a>
            <motion.a
              href="#roi"
              onClick={(e) => handleClick(e, '#roi')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] text-[15px] text-white/50 hover:text-white/80 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              Смотреть экономику
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={show({ opacity: 1 })}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="text-[12px] text-white/25 tracking-wide mb-10"
          >
            Запуск за 1 день &middot; 152-ФЗ &middot; Без изменений IT
          </motion.p>
        </motion.div>

        {/* ── Dashboard: own parallax wrapper (NOT inside text wrapper) ── */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={show({ opacity: 1, y: 0, scale: 1 })}
          transition={{ duration: 1.4, delay: 0.3, ease: easeOut }}
          className="w-full relative"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            style={{
              y: dashboardY,
              scale: dashboardScale,
              opacity: dashboardOpacity,
              rotateX: dashboardRotateX,
              transformOrigin: 'center top',
            }}
          >
            {/* Glow behind dashboard */}
            <motion.div
              className="absolute -inset-20 z-0"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,168,79,0.2) 0%, rgba(52,210,123,0.08) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Browser frame */}
            <div
              className="relative z-10 rounded-t-2xl rounded-b-none border border-b-0 border-white/[0.08] bg-[#0a1210]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50 max-h-[45vh] md:max-h-[50vh]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              {/* Browser top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="max-w-xs mx-auto h-6 rounded-md bg-white/[0.04] flex items-center justify-center">
                    <span className="text-[11px] text-white/20">app.dialog-expert.ru/dashboard</span>
                  </div>
                </div>
              </div>

              <img
                ref={(el) => {
                  if (el) el.setAttribute('fetchpriority', 'high');
                }}
                src={imgDashboard}
                alt="Панель управления ДиалогЭксперт — аналитика диалогов и метрики продаж"
                width={1200}
                height={675}
                className="w-full h-auto"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};