import { useState, useEffect } from "react";
import sliderData from "../../data/sliderData.json";

const HeroSlidder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = sliderData.length;

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const slide = sliderData[currentSlide];
  const thumb1 = sliderData[(currentSlide + 1) % totalSlides];
  const thumb2 = sliderData[(currentSlide + 2) % totalSlides];

  return (
    <section className="w-full bg-[#f3f3f3] pt-6 pb-8">
      {/* ── "DO IT RIGHT" headline ── */}
      <h1
        className="w-full text-center leading-none font-black tracking-tight mb-3 select-none"
        style={{ fontSize: "clamp(3.75rem, 10vw, 7.5rem)" }}
      >
        <span className="text-black">DO IT </span>
        <span className="text-blue-600">RIGHT</span>
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* ── Main card ── */}
        <div
          className="relative w-full rounded-[28px] overflow-hidden"
          style={{ height: "clamp(320px, 45vw, 480px)" }}
        >
          {/* Slides */}
          {sliderData.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
            </div>
          ))}

          {/* ── Vertical badge – far left ── */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-20">
            <div
              className={`bg-black/70 text-white text-[9px] font-semibold tracking-[0.2em] uppercase py-4 px-[6px] rounded-r-lg transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {slide.badge}
            </div>
          </div>

          {/* ── Bottom-left: subtitle + title + description + CTA ── */}
          <div
            className={`absolute bottom-8 left-10 z-20 max-w-[280px] transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            }`}
          >
            {slide.subtitle && (
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                {slide.subtitle}
              </p>
            )}
            <h2 className="text-white font-black text-3xl md:text-4xl uppercase leading-tight mb-2">
              {slide.title}
            </h2>
            <p className="text-gray-300 text-sm leading-snug mb-5">
              {slide.description}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-bold uppercase tracking-widest px-7 py-2.5 rounded-lg transition-all duration-200">
              {slide.buttonText}
            </button>
          </div>

          {/* ── Right side: two thumbnails stacked ── */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {[thumb1, thumb2].map((t, i) => (
              <button
                key={t.id}
                onClick={() => goToSlide((currentSlide + i + 1) % totalSlides)}
                className="w-[90px] h-[70px] rounded-2xl overflow-hidden  border-white/80 shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* ── Dot indicators ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {sliderData.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-7 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* ── Arrow buttons ── */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-10 bottom-16 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute left-[72px] bottom-16 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlidder;
