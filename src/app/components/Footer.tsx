import React from 'react';
import svgPaths from '../../imports/svg-2fzfvhnwda';
import { BlurReveal } from './motion-utils';
import { useSmoothScroll } from './SmoothScroll';
import { scrollToSection } from './scroll-utils';
import { navItems } from './nav-items';

export const Footer = () => {
  const smoothScroll = useSmoothScroll();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href, smoothScroll);
  };

  return (
    <footer className="bg-[#050a09] border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <BlurReveal y={20}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            {/* Logo */}
            <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2.5">
              <svg className="w-7 h-6" fill="none" viewBox="0 0 45 36">
                <path d={svgPaths.p25ebba80} fill="#00A84F" />
                <path d={svgPaths.p20945000} fill="#34D27B" />
              </svg>
              <span className="text-[15px] text-white/80 tracking-[-0.01em]">
                Диалог<span className="text-white/30 ml-0.5">Эксперт</span>
              </span>
            </a>

            {/* Nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[13px] text-white/25 hover:text-white/60 transition-colors tracking-[-0.01em]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </BlurReveal>

        <div className="h-px bg-white/[0.04] mb-8" />

        <BlurReveal delay={0.1} y={15}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-white/25 tracking-[-0.01em]">
              &copy; {new Date().getFullYear()} Диалог Эксперт. Все права защищены.
            </span>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-[13px] text-white/40 hover:text-white/80 tracking-[-0.01em] transition-colors underline-offset-4 hover:underline"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-[13px] text-white/40 hover:text-white/80 tracking-[-0.01em] transition-colors underline-offset-4 hover:underline"
              >
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </BlurReveal>
      </div>
    </footer>
  );
};

export default Footer;