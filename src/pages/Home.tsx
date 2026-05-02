import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { ChevronRight, ArrowUpRight, ChevronLeft, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { ASSETS, REVIEWS } from "../constants";
import { useInquiry } from "../contexts/InquiryContext";

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Home = ({ isSplashVisible }: { isSplashVisible: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openModal } = useInquiry();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ASSETS.HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ASSETS.HERO_SLIDES.length) % ASSETS.HERO_SLIDES.length);
  };

  useEffect(() => {
    const heroTimer = setInterval(nextSlide, 5000);
    return () => {
      clearInterval(heroTimer);
    };
  }, []);

  const slideVariants = {
    enter: {
      scale: 1.1,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.9,
      opacity: 0,
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden bg-primary">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0"
          >
            <img
              src={ASSETS.HERO_SLIDES[currentSlide]}
              alt={`Slide ${currentSlide}`}
              className="h-full w-full object-cover brightness-100"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay - Darkened for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-left z-10 pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0, filter: "blur(12px)" }}
            animate={(isSplashVisible === false) ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ 
              duration: 1.2,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="pointer-events-auto"
          >
            <h1 className="text-[60px] font-display font-light text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-[1.05] mb-10 tracking-tight">
              감각을 깨우는 <br />
              <span className="text-secondary font-semibold">공간</span>의 가치
            </h1>
            <div className="pl-2">
              <p className="text-white/95 text-[18px] font-medium mb-12 max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                아르코 인테리어는 주거 공간과 상업 공간의 본질을 이해하고, 새로운 가치를 창조합니다.
              </p>
              <div className="flex justify-start gap-4">
                <button 
                  onClick={openModal}
                  className="px-12 py-5 bg-secondary text-white font-bold tracking-[0.3em] uppercase text-[11px] hover:bg-white hover:text-primary transition-all duration-500 shadow-xl"
                >
                  CONSULTATION
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls Cluster */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20 pointer-events-auto">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20 active:scale-95 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20 active:scale-95 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>


      </header>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-20 right-0 text-[18vw] font-display font-bold text-primary/[0.01] select-none pointer-events-none translate-x-1/4">
          CRAFT
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] md:text-[11px] font-bold text-[#8D8174] uppercase tracking-[0.4em] mb-4 block">OUR SERVICE</span>
            <h2 className="text-4xl md:text-6xl font-display font-light text-primary tracking-[0.1em] uppercase">SOLUTIONS</h2>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            {[
              {
                title: "주거 리노베이션",
                headline: "당신의 삶이 머무는\n지극히 사적인 예술",
                description: "집은 단순한 거주지를 넘어 개인의 세계를 대변합니다. 아르코는 깊이 있는 심미안으로 당신의 일상이 영감이 되는 최상의 안식처를 디자인합니다.",
              },
              {
                title: "커머셜 디자인",
                headline: "브랜드의 정체성을\n완성하는 전략적 건축",
                description: "상업 공간은 브랜드가 고객과 만나는 첫 번째 접점입니다. 감각적인 연출과 효율적인 동선 설계를 통해 비즈니스의 성공적인 미래를 제시합니다.",
              },
              {
                title: "마스터 플래닝",
                headline: "대지의 잠재력을\n일깨우는 건축 솔루션",
                description: "공존과 지속 가능성을 기본으로, 대지가 가진 숨은 가치를 탐색합니다. 기획부터 준공까지 모든 과정을 건축 전문가의 시선으로 이끌어갑니다.",
              },
              {
                title: "공간 스타일링",
                headline: "피니시의 미학이\n부여하는 공간의 깊이",
                description: "가구, 조명, 자재의 하모니는 공간의 품격을 결정짓는 마지막 열쇠입니다. 아르코만의 셀렉션으로 완성도 높은 미학적 경험을 선사합니다.",
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-12 -m-4 transition-all duration-500 rounded-3xl overflow-hidden cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/20"
              >
                {/* Background Inversion Layer */}
                <div 
                  className="absolute inset-0 bg-primary z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl scale-95 group-hover:scale-100"
                />
                
                {/* Numbering Label */}
                <div className="absolute -top-4 -left-4 text-9xl font-display font-bold text-primary/[0.04] group-hover:text-white/[0.04] transition-all duration-1000 group-hover:-translate-y-4 select-none pointer-events-none z-10">
                  0{idx + 1}
                </div>

                <div className="relative space-y-10 z-20">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-secondary">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      transition={{ delay: 0.8 + (idx * 0.1), duration: 1 }}
                      className="h-[1px] bg-secondary" 
                    />
                    <span className="whitespace-pre-line">{service.title}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-display font-light text-primary group-hover:text-white leading-[1.15] transition-all duration-700">
                    {service.headline.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </h2>
                  
                  <p className="text-primary/60 font-light text-lg leading-relaxed max-w-md group-hover:text-white/70 transition-colors duration-500">
                    {service.description}
                  </p>
                  
                  <div className="pt-6">
                    <Link to="/portfolio" className="group/link inline-flex items-center gap-5 text-[11px] font-bold tracking-[0.2em] uppercase text-primary group-hover:text-secondary border-b border-primary/20 group-hover:border-secondary/50 pb-3 transition-all duration-500">
                      <span>프로젝트 탐색</span>
                      <ArrowUpRight size={16} className="group-hover/link:translate-x-1.5 group-hover/link:-translate-y-1.5 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/20 translate-x-12 translate-y-12 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOOD & IMAGERY Section */}
      <section className="py-24 md:py-32 bg-[#FAF9F6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-transparent">
            {/* Header matching Portfolio design */}
            <div className="flex justify-between items-center pb-12 border-b border-surface-high/50 mb-12">
              <div className="text-[10px] font-bold text-[#8D8174] tracking-[0.5em] uppercase">Mood & Imagery</div>
              <div className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-light">Visual Narrative</div>
            </div>
            
            {/* Gallery Marquee */}
            <div className="relative flex overflow-hidden group cursor-grab active:cursor-grabbing mb-12">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 40, 
                  ease: "linear" 
                }}
                className="flex"
              >
                {[...ASSETS.MOOD_IMAGES, ...ASSETS.MOOD_IMAGES].map((src, i) => (
                  <div 
                    key={i}
                    className="w-[400px] md:w-[600px] aspect-[4/3] flex-shrink-0 overflow-hidden pr-4"
                  >
                    <img 
                      src={src} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt="Mood" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="py-20 border-t border-surface-high/30">
              <div className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-16 text-center lg:text-left">Brand Essence</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-high/30 border border-surface-high/30">
                {[
                  { title: "Essential", text: "공간의 본질을 이해합니다" },
                  { title: "Lifestyle", text: "고객 라이프 스타일을 담습니다" },
                  { title: "Harmony", text: "균형과 조화를 디자인합니다" },
                  { title: "Value", text: "가치 있는 공간을 완성합니다" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="bg-white p-12 space-y-6 group cursor-pointer transition-all duration-700 hover:bg-primary"
                  >
                    <div className="text-[9px] font-bold text-secondary uppercase tracking-[0.3em] group-hover:text-white/40 transition-colors">0{i + 1} / {item.title}</div>
                    <div className="text-sm md:text-base font-light text-primary/80 leading-snug group-hover:text-white transition-colors duration-500 whitespace-pre-line">
                      {item.text}
                    </div>
                    <div className="w-8 h-[1px] bg-secondary group-hover:w-full group-hover:bg-white/20 transition-all duration-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-6">아카이브</h2>
              <h3 className="text-4xl font-display font-light text-primary tracking-tight">주요 프로젝트</h3>
            </div>
            <Link to="/portfolio" className="text-[10px] font-bold tracking-widest uppercase text-primary/40 hover:text-primary transition-colors">
              전체 보기
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {ASSETS.PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-high">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-1000 ease-out" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  </div>
                  {/* Decorative border reveal */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 m-4" />
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <h4 className="text-xl font-medium text-primary mb-1 group-hover:text-secondary transition-colors duration-300">{project.title}</h4>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-primary/30 group-hover:text-primary/50 transition-colors duration-300">
                      {project.type === "Residential" ? "주거" : "상업"} &middot; {project.year}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Marquee Section */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <h2 className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-6">고객의 목소리</h2>
              <h3 className="text-4xl font-display font-light text-primary">완성된 공간, 만족의 기록</h3>
            </div>
            <div className="flex gap-16">
              <div className="text-center md:text-left">
                <div className="text-4xl font-display font-light text-primary mb-2">
                  <Counter value={1280} />+
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-primary/30">구매 건수</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-display font-light text-primary mb-2">
                  <Counter value={452} />+
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-primary/30">고객후기 건수</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 50, 
              ease: "linear" 
            }}
            className="flex gap-10 whitespace-nowrap"
          >
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div 
                key={idx}
                className="w-[480px] bg-white border border-surface-high flex-shrink-0 group overflow-hidden transition-all duration-500 hover:bg-primary"
              >
                <div className="h-56 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <motion.img 
                    src={review.image} 
                    alt={review.project} 
                    className="w-full h-full object-cover scale-110"
                    animate={{ x: ["-2%", "2%", "-2%"] }}
                    transition={{ duration: 15 + (idx % 3), repeat: Infinity, ease: "linear" }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-10">
                  <div className="flex gap-1 text-secondary mb-6 group-hover:text-white transition-colors">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-primary/70 font-light leading-relaxed mb-10 whitespace-normal h-24 overflow-hidden group-hover:text-white/80 transition-colors">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-white transition-colors" />
                    <div>
                      <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5 group-hover:text-white transition-colors">{review.author}</div>
                      <div className="text-[10px] text-primary/30 uppercase tracking-tighter group-hover:text-white/40 transition-colors">{review.type === "Residential" ? "주거" : "상업"}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 bg-white border-y border-surface-high">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12 flex justify-center">
               <div className="w-12 h-12 flex items-center justify-center bg-secondary text-white transform rotate-45">
                 <ArrowUpRight className="transform -rotate-45" size={24} />
               </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-primary leading-tight mb-8">
              공간을 위한 전문적인 <br /> 손길을 경험해보세요
            </h2>
            <p className="text-primary/50 font-light mb-12 max-w-xl mx-auto">
              우리의 건축가 및 디자이너 팀은 당신의 비전을 기대 이상의 현실로 바꿀 준비가 되어 있습니다. 전문가의 상담 없이 여정을 시작하지 마세요.
            </p>
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-primary text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-secondary transition-all"
            >
              문의하기
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
