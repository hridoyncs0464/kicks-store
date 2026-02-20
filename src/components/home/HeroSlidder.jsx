import { useState, useEffect } from "react";
import sliderData from "../../data/sliderData.json";

const HeroSlider = () => {
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
    <section className="w-full bg-[#f3f3f3]  pt-6 pb-8">
      {/* ── "DO IT RIGHT" headline ── */}

      <h1
        className="w-full text-center   leading-none font-black tracking-tight mb-3 select-none "
        style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
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
              {/* left-side dark gradient for text legibility */}
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
                className="w-[90px] h-[70px] rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none"
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

export default HeroSlider;

// import { useState, useEffect } from 'react';
// import sliderData from '../../data/sliderData.json';

// const HeroSlidder = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const totalSlides = sliderData.length;

//   // Auto-advance slider every 4 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [currentSlide]);

//   const nextSlide = () => {
//     if (!isTransitioning) {
//       setIsTransitioning(true);
//       setCurrentSlide((prev) => (prev + 1) % totalSlides);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   const prevSlide = () => {
//     if (!isTransitioning) {
//       setIsTransitioning(true);
//       setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   const goToSlide = (index) => {
//     if (!isTransitioning && index !== currentSlide) {
//       setIsTransitioning(true);
//       setCurrentSlide(index);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   const getNextSlides = () => {
//     const next1 = (currentSlide + 1) % totalSlides;
//     const next2 = (currentSlide + 2) % totalSlides;
//     return [sliderData[next1], sliderData[next2]];
//   };

//   const currentSlideData = sliderData[currentSlide];
//   const nextSlides = getNextSlides();

//   return (
//     <section className="relative w-full h-[500px] md:h-[600px] bg-gray-100 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//         {/* DO IT RIGHT Headline */}
//         <div className="absolute top-8 left-4 sm:left-8 lg:left-16 z-20">
//           <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none">
//             <span className="text-gray-900">DO IT</span>
//             <br />
//             <span className="text-blue-600">RIGHT</span>
//           </h1>
//         </div>

//         {/* Main Content Container */}
//         <div className="relative h-full flex items-center pt-32 md:pt-40">
//           <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
//             {/* Left Side - Text Content */}
//             <div className="lg:col-span-4 z-10 space-y-4">
//               {/* Badge */}
//               <div
//                 className={`inline-block transition-all duration-500 ${
//                   isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
//                 }`}
//               >
//                 <span className="bg-gray-900 text-white text-xs font-body px-4 py-2 rounded-full">
//                   {currentSlideData.badge}
//                 </span>
//               </div>

//               {/* Product Title */}
//               <div
//                 className={`transition-all duration-500 delay-100 ${
//                   isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
//                 }`}
//               >
//                 <h2 className="font-heading font-bold text-4xl md:text-5xl text-white drop-shadow-lg">
//                   {currentSlideData.title}
//                 </h2>
//               </div>

//               {/* Description */}
//               <div
//                 className={`transition-all duration-500 delay-200 ${
//                   isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
//                 }`}
//               >
//                 <p className="font-body text-sm md:text-base text-gray-200 max-w-md">
//                   {currentSlideData.description}
//                 </p>
//               </div>

//               {/* CTA Button */}
//               <div
//                 className={`transition-all duration-500 delay-300 ${
//                   isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
//                 }`}
//               >
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
//                   {currentSlideData.buttonText}
//                 </button>
//               </div>
//             </div>

//             {/* Center - Main Image */}
//             <div className="lg:col-span-7 relative h-[300px] md:h-[400px] lg:h-[450px]">
//               <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
//                 {sliderData.map((slide, index) => (
//                   <div
//                     key={slide.id}
//                     className={`absolute inset-0 transition-opacity duration-500 ${
//                       index === currentSlide ? 'opacity-100' : 'opacity-0'
//                     }`}
//                   >
//                     <img
//                       src={slide.image}
//                       alt={slide.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
//                   </div>
//                 ))}
//               </div>

//               {/* Arrow Controls */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
//                 aria-label="Previous slide"
//               >
//                 <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
//                 aria-label="Next slide"
//               >
//                 <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>

//             {/* Right Side - Thumbnail Strip */}
//             <div className="hidden lg:flex lg:col-span-1 flex-col gap-4 justify-center">
//               {nextSlides.map((slide, index) => (
//                 <div
//                   key={slide.id}
//                   onClick={() => goToSlide((currentSlide + index + 1) % totalSlides)}
//                   className="w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-white shadow-lg hover:scale-105 transition-transform"
//                 >
//                   <img
//                     src={slide.image}
//                     alt={slide.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Dot Indicators */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//           {sliderData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 index === currentSlide
//                   ? 'w-8 h-3 bg-blue-600'
//                   : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSlidder;
