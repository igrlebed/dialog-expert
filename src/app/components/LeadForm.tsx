import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import svgPaths from '../../imports/svg-2fzfvhnwda';
import { SplitText, BlurReveal, ScaleReveal } from './motion-utils';

interface TooltipState {
  message: string;
  top: number;
  left: number;
  width: number;
}

const validationMessages: Record<string, string> = {
  name: 'Введите ваше имя',
  phone: 'Введите номер телефона',
  email: 'Введите корректный email',
  locations: 'Укажите количество точек (≥ 1)',
  avgCheck: 'Укажите средний чек (≥ 1)',
};

export const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const clearTooltip = useCallback(() => {
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    setTooltip(null);
  }, []);

  // Hide tooltip on scroll or outside click
  useEffect(() => {
    if (!tooltip) return;
    const hide = () => clearTooltip();
    window.addEventListener('scroll', hide, true);
    window.addEventListener('mousedown', hide, true);
    return () => {
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('mousedown', hide, true);
    };
  }, [tooltip, clearTooltip]);

  const showTooltipForField = (fieldName: string) => {
    if (!formRef.current || !formContainerRef.current) return;
    const input = formRef.current.elements.namedItem(fieldName) as HTMLInputElement | null;
    if (!input) return;

    const inputRect = input.getBoundingClientRect();
    const containerRect = formContainerRef.current.getBoundingClientRect();

    setTooltip({
      message: validationMessages[fieldName] || 'Заполните это поле',
      top: inputRect.bottom - containerRect.top + 8,
      left: inputRect.left - containerRect.left,
      width: inputRect.width,
    });

    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => setTooltip(null), 4000);
  };

  const validateField = (input: HTMLInputElement, name: string): boolean => {
    if (name === 'email') {
      if (!input.value.trim()) return false;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }
    if (input.type === 'number') {
      return input.value.trim() !== '' && Number(input.value) >= 1;
    }
    return input.value.trim() !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearTooltip();

    const requiredFields = ['name', 'phone', 'email', 'locations', 'avgCheck'];
    const newErrors: Record<string, boolean> = {};
    let firstInvalid: string | null = null;

    requiredFields.forEach((name) => {
      const input = formRef.current?.elements.namedItem(name) as HTMLInputElement | null;
      if (input && !validateField(input, name)) {
        newErrors[name] = true;
        if (!firstInvalid) firstInvalid = name;
      }
    });

    setErrors(newErrors);

    if (firstInvalid) {
      // Focus the first invalid input
      const input = formRef.current?.elements.namedItem(firstInvalid) as HTMLInputElement | null;
      input?.focus();
      // Show tooltip after a tick so layout settles
      setTimeout(() => showTooltipForField(firstInvalid!), 50);
      return;
    }

    setIsSubmitted(true);
  };

  const handleInputChange = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (tooltip) clearTooltip();
  };

  const handleInputFocus = (field: string) => {
    if (errors[field]) {
      setTimeout(() => showTooltipForField(field), 50);
    }
  };

  const getInputClass = (field: string) => {
    const base =
      "w-full px-4 py-3 rounded-xl bg-white/[0.03] border outline-none transition-all duration-300 placeholder:text-white/15 text-white/80 text-[15px] tracking-[-0.01em]";
    if (errors[field]) {
      return `${base} border-red-500/70 shadow-[0_0_0_1px_rgba(239,68,68,0.25)] focus:border-red-400 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.4)]`;
    }
    return `${base} border-white/[0.08] focus:border-[#00A84F]/40 focus:ring-1 focus:ring-[#00A84F]/20`;
  };

  return (
    <section id="form" className="relative py-32 md:py-40 bg-[#050a09]">
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[600px] bottom-0 left-1/2 -translate-x-1/2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,168,79,0.1) 0%, rgba(52,210,123,0.04) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <BlurReveal delay={0}>
              <p className="text-[13px] text-[#00A84F] tracking-wide uppercase mb-4">
                Заявка
              </p>
            </BlurReveal>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1.1] mb-6">
              <SplitText delay={0.1} staggerDelay={0.06} wordClassName="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
                Узнайте, сколько вы теряете
              </SplitText>
            </h2>
            <BlurReveal delay={0.4} y={40}>
              <p className="text-base text-white/35 leading-relaxed tracking-[-0.01em] mb-10 max-w-md">
                Оставьте заявку, и мы бесплатно рассчитаем потенциальный рост вашей выручки после внедрения аудио-контроля.
              </p>
            </BlurReveal>

            <BlurReveal delay={0.45} y={20}>
              <ul className="space-y-4">
                {[
                  'Расчёт экономики за 1 час',
                  'Оценка сроков пилота',
                  'План внедрения без ИТ-доработок',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-white/40 tracking-[-0.01em]">
                    <CheckCircle2 className="w-4 h-4 text-[#00A84F]/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BlurReveal>
          </div>

          {/* Right — Form */}
          <ScaleReveal delay={0.2}>
            <div
              ref={formContainerRef}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10"
            >
              {/* Custom Tooltip */}
              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute z-50 pointer-events-none"
                    style={{
                      top: tooltip.top,
                      left: tooltip.left,
                      width: tooltip.width,
                    }}
                  >
                    {/* Arrow */}
                    <div className="flex justify-start pl-5">
                      <div
                        className="w-2.5 h-2.5 -mb-[5px] rotate-45"
                        style={{
                          background: 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(30,10,10,0.95) 100%)',
                          borderTop: '1px solid rgba(239,68,68,0.35)',
                          borderLeft: '1px solid rgba(239,68,68,0.35)',
                        }}
                      />
                    </div>
                    {/* Body */}
                    <div
                      className="rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30,10,10,0.95) 0%, rgba(20,8,8,0.98) 100%)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(239,68,68,0.08)',
                        backdropFilter: 'blur(16px)',
                      }}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-[12.5px] text-red-300/90 tracking-[-0.01em]">
                        {tooltip.message}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-[#00A84F]/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#34D27B]" />
                  </div>
                  <h3 className="text-2xl text-white/85 mb-3 tracking-[-0.02em]">
                    Заявка принята
                  </h3>
                  <p className="text-[15px] text-white/35 max-w-sm">
                    Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="field-name" className="text-[13px] text-white/40 tracking-[-0.01em]">Имя</label>
                      <input
                        id="field-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={getInputClass('name')}
                        placeholder="Александр"
                        onChange={() => handleInputChange('name')}
                        onFocus={() => handleInputFocus('name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="field-phone" className="text-[13px] text-white/40 tracking-[-0.01em]">Телефон</label>
                      <input
                        id="field-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={getInputClass('phone')}
                        placeholder="+7 (999) 000-00-00"
                        onChange={() => handleInputChange('phone')}
                        onFocus={() => handleInputFocus('phone')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="field-email" className="text-[13px] text-white/40 tracking-[-0.01em]">Email</label>
                      <input
                        id="field-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={getInputClass('email')}
                        placeholder="work@company.ru"
                        onChange={() => handleInputChange('email')}
                        onFocus={() => handleInputFocus('email')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="field-position" className="text-[13px] text-white/40 tracking-[-0.01em]">Должность</label>
                      <input
                        id="field-position"
                        name="position"
                        type="text"
                        autoComplete="organization-title"
                        className={getInputClass('position')}
                        placeholder="Операционный директор"
                      />
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.05] my-2" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="field-locations" className="text-[13px] text-white/40 tracking-[-0.01em]">Количество точек</label>
                      <input
                        id="field-locations"
                        name="locations"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        className={getInputClass('locations')}
                        placeholder="50"
                        onChange={() => handleInputChange('locations')}
                        onFocus={() => handleInputFocus('locations')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="field-avgCheck" className="text-[13px] text-white/40 tracking-[-0.01em]">Средний чек, ₽</label>
                      <input
                        id="field-avgCheck"
                        name="avgCheck"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        className={getInputClass('avgCheck')}
                        placeholder="850"
                        onChange={() => handleInputChange('avgCheck')}
                        onFocus={() => handleInputFocus('avgCheck')}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#00A84F] hover:bg-[#00C85A] text-[15px] text-white tracking-[-0.01em] transition-all duration-300 shadow-[0_0_40px_rgba(0,168,79,0.3)] hover:shadow-[0_0_60px_rgba(0,168,79,0.5)] mt-4"
                  >
                    Получить расчёт роста выручки
                    <svg className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d={svgPaths.p2c221f00} fill="currentColor" />
                    </svg>
                  </button>

                  <p className="text-[11px] text-white/15 text-center flex items-center justify-center gap-1.5 mt-4">
                    <Lock className="w-3 h-3" />
                    Данные защищены в соответствии с 152-ФЗ
                  </p>
                </form>
              )}
            </div>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;