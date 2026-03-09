import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SplitText, BlurReveal, ClipReveal } from './motion-utils';

const cases = [
  {
    title: "Сеть доставки суши",
    subtitle: "Москва · 60 дней",
    results: [
      { label: "Средний чек доставки", value: "1 950 → 2 200 ₽ (+12,8%)" },
      { label: "Допродажи при встрече", value: "4% → 17% (+13%)" },
      { label: "Доля приветствий", value: "60% → 94% (+34%)" },
      { label: "Повторные заказы за 7 дней", value: "22% → 29% (+7%)" },
    ],
    context: "Сеть с собственной курьерской службой столкнулась с жалобами на общение при доставке.",
    goal: "Повысить лояльность получателей за счёт качества общения курьеров и увеличить спонтанные допродажи.",
  },
  {
    title: "Паназиатский фуд-корт",
    subtitle: "Москва · 30 дней",
    results: [
      { label: "Средний чек", value: "590 → 645 ₽ (+9,3%)" },
      { label: "Продажа соусов и напитков", value: "12% → 24% (+12%)" },
      { label: "Индекс вежливости", value: "65% → 88% (+23%)" },
    ],
    context: "Высокий трафик, постоянная очередь, кассиры работают в интенсивном режиме.",
    goal: "Увеличить средний чек за счёт допродаж соусов и лимонадов в момент общения у кассы.",
  },
  {
    title: "Хостел",
    subtitle: "Москва · 90 дней",
    results: [
      { label: "Средний чек допуслуг", value: "200 → 295 ₽ (+47,5%)" },
      { label: "Общий средний чек", value: "1 100 → 1 195 ₽ (+8,6%)" },
      { label: "Продление бронирования", value: "12% → 21% (+9%)" },
    ],
    context: "Бюджетный хостел, высокая текучка администраторов. Гости жалуются на «уставший персонал».",
    goal: "Увеличить продажи дополнительных услуг за счёт корректировки скриптов общения.",
  },
  {
    title: "Ювелирная сеть",
    subtitle: "300+ магазинов · 60 дней",
    results: [
      { label: "Средний чек", value: "8 500 → 9 350 ₽ (+10%)" },
      { label: "Продажа доп. услуг", value: "7% → 18% (+11%)" },
      { label: "Индекс эмоциональности", value: "40% → 75% (+35%)" },
    ],
    context: "Федеральная сеть. «Тайные покупатели» давали лишь точечные срезы, а не системную картину.",
    goal: "Выявить фразы и модели поведения, ведущие к покупке, и масштабировать их на всех продавцов.",
  },
  {
    title: "ЖД-кассы",
    subtitle: "Крупный город · 90 дней",
    results: [
      { label: "Конверсия в страховку", value: "8% → 22% (+14%)" },
      { label: "Конверсия в питание", value: "9% → 20% (+11%)" },
      { label: "Индекс вежливости", value: "55% → 82% (+27%)" },
      { label: "Жалобы на кассиров", value: "24 → 8 в мес. (−57%)" },
    ],
    context: "Вокзал крупного города, высокий пассажиропоток, частые очереди и раздражение пассажиров.",
    goal: "Снизить количество конфликтов, повысить вежливость и увеличить родажи д��п. продуктов.",
  },
  {
    title: "Аптечная сеть",
    subtitle: "200+ точек · 60 дней",
    results: [
      { label: "Средний чек", value: "780 → 865 ₽ (+10,9%)" },
      { label: "Чеки с доп. товаром", value: "8% → 22% (+14%)" },
      { label: "Нарушения рецептурных", value: "7 → 1 случай (−86%)" },
      { label: "Соблюдение стандартов", value: "65% → 92% (+27%)" },
    ],
    context: "Федеральная сеть. Высокая конкуренция, низкая маржинальность, регуляторные риски.",
    goal: "Увеличить средний чек за счёт допродаж, снизить регуляторные риски.",
  },
  {
    title: "B2B-консалтинг",
    subtitle: "120 дней",
    results: [
      { label: "Talk ratio", value: "75% → 55% (−20%)" },
      { label: "Конверсия встреча → сделка", value: "22% → 29% (+7%)" },
    ],
    context: "Крупная консалтинговая компания. Качество десятков еженедельных встреч оценивалось субъективно.",
    goal: "Выявить оптимальные паттерны ведения переговров, которые ведут к сделке.",
  },
  {
    title: "Банковские отделения",
    subtitle: "180 дней",
    results: [
      { label: "Длительность консультации", value: "8,5 → 7,6 мин (−10%)" },
      { label: "Выявление жалоб", value: "0% → 85% (+85%)" },
    ],
    context: "Крупный розничный банк. Контроль качества был выборочным — менее 5% диалогов у стойки.",
    goal: "Внедрить 100% контроль качества обслуживания в отделениях.",
  },
  {
    title: "Страховая компания",
    subtitle: "120 дней",
    results: [
      { label: "Конверсия в сложные продукты", value: "8% → 11% (+3%)" },
      { label: "Выявление некорректных консультаций", value: "20% → 85% (+65%)" },
    ],
    context: "Крупная страховая компания. Сложные продукты требуют качественных личных консультаций.",
    goal: "Повысить качество консультаций и увеличить конверсию в продажи сложных продуктов.",
  },
  {
    title: "Автодилерская сеть",
    subtitle: "20+ шоурумов · 120 дней",
    results: [
      { label: "Продажи доп. продуктов", value: "3% → 20% (+17%)" },
      { label: "Общая выручка сети", value: "+5%" },
    ],
    context: "Федеральная сеть автосалонов. Менеджеры общаются лично в залах и на тест-драйвах.",
    goal: "Повысить продажи за счёт контроля качества общения в залах и переговорных.",
  },
  {
    title: "Инфостойка аэропорта",
    subtitle: "90 дней",
    results: [
      { label: "Конверсия в трансферы", value: "4% → 15% (+11%)" },
      { label: "Конверсия в VIP-залы", value: "2% → 9% (+7%)" },
      { label: "Индекс вежливости", value: "60% → 88% (+28%)" },
      { label: "Жалобы на стойку", value: "18 → 4 в мес. (−78%)" },
    ],
    context: "Международный аэропорт, высокий пассажиропоток. Контроль ограничивался жалобами.",
    goal: "Повысить качество информирования, снизить конфликты и увеличить продажи доп. услуг.",
  },
];

const AUTO_SCROLL_INTERVAL = 10000; // 10 seconds

export const Cases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      setVisibleCount(getVisibleCount());
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, cases.length - visibleCount);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => {
      if (i >= maxIndex) return 0; // loop back to start
      return i + 1;
    });
  }, [maxIndex]);

  // Auto-scroll: pause on hover
  useEffect(() => {
    if (isHovered) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      return;
    }
    autoScrollRef.current = setInterval(() => {
      next();
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isHovered, next]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      next();
    } else if (diff < -threshold) {
      prev();
    }
  }, [next, prev]);

  return (
    <section id="cases" className="relative py-32 md:py-40 bg-[#050a09]">
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[500px] top-0 right-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div className="max-w-2xl">
            <ClipReveal delay={0}>
              <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
                Кейсы
              </p>
            </ClipReveal>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-5">
              <SplitText delay={0.1} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
                Реализованные проекты
              </SplitText>
            </h2>
            <BlurReveal delay={0.4} y={40}>
              <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em]">
                Результаты внедрения аудио-контроля в различных сферах бизнеса.
              </p>
            </BlurReveal>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mt-8 md:mt-0 ml-auto md:ml-0"
          >
            <span className="text-[13px] text-white/25 mr-2 tabular-nums">
              {currentIndex + 1}–{Math.min(currentIndex + visibleCount, cases.length)} из {cases.length}
            </span>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label="Предыдущий кейс"
              className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Следующий кейс"
              className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4"
              style={{
                transform: containerWidth > 0
                  ? `translateX(-${currentIndex * ((containerWidth - (visibleCount - 1) * 16) / visibleCount + 16)}px)`
                  : 'translateX(0)',
                transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
              }}
            >
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-[background,border-color] duration-500 overflow-hidden flex flex-col flex-shrink-0"
                  style={{
                    width: `calc((100% - ${(visibleCount - 1) * 16}px) / ${visibleCount})`,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,168,79,0.06) 0%, transparent 60%)' }} />

                  {/* Header */}
                  <div className="relative z-10 p-8 pb-0">
                    <div className="mb-6">
                      <h3 className="text-[19px] text-white/85 tracking-[-0.01em] mb-1">
                        {caseItem.title}
                      </h3>
                      <span className="text-[13px] text-white/30">
                        {caseItem.subtitle}
                      </span>
                    </div>

                    {/* Results */}
                    <div className="space-y-0">
                      {caseItem.results.map((res, i) => (
                        <div key={i} className="flex items-baseline justify-between gap-4 py-3.5 border-t border-white/[0.05]">
                          <span className="text-[13px] text-white/30 text-left shrink min-w-0">
                            {res.label}
                          </span>
                          <span className="text-[15px] text-white/70 tracking-[-0.01em] text-right shrink-0 whitespace-nowrap">
                            {res.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Context & Goal */}
                  <div className="relative z-10 mt-auto p-8 pt-6">
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-5">
                      <p className="text-[13px] text-white/25 mb-2">
                        <span className="text-white/40">Контекст:</span> {caseItem.context}
                      </p>
                      <p className="text-[13px] text-white/25">
                        <span className="text-white/40">Цель:</span> {caseItem.goal}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress bar + Dots */}
        <div className="mt-10">
          <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Навигация по кейсам">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Кейс ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? 'w-6 bg-[#00A84F]'
                    : 'w-1.5 bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;