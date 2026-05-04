import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, MapPin, Maximize, Clock, ChevronRight, Loader2 } from "lucide-react";
import { ASSETS } from "../constants";
import { subscribeNewsletter } from "../services/firebaseService";

const BEFORE_AFTER_DATA = [
  {
    id: 1,
    category: "아파트",
    title: "30평 아파트 리모델링",
    location: "경기 성남시",
    size: "30평",
    duration: "4주",
    tags: ["모던", "미니멀", "아파트"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMTgx/MDAxNzc3NjQ4NDQxNjIw.w6yGDt0jhJFXcJCsfP7ldNhFaDYL723c0urXC9yxkZgg.mtVWuuAkK50cl-w6RJd-QBoaHgO_9WxwxDuXykw5aDog.PNG/1.png?type=w3840",
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMjE2/MDAxNzc3NjQ4NDQwNTcw.eQSHbGPNFPoX6h2oB6ur46SWp4bZpId2PX38_x46dVUg.oUmaVUk2DicAF9T-fqARq8bxMJtm_AWrp0yWOvAsLlYg.PNG/2.png?type=w3840"
  },
  {
    id: 2,
    category: "부분 리모델링",
    title: "40평 주방 리모델링",
    location: "서울 강남구",
    size: "40평",
    duration: "3주",
    tags: ["주방", "모던", "우드"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMTcw/MDAxNzc3NjQ4NDQwMzI4.pdcIT6xrGJ4PAJflVL1eGFj9yG7wpHlFjr9Jl97wBTUg.A7EwdpjDZvQTLc0ii9RIwv34beKbBVl4VzTHeyxlwMMg.PNG/3.png?type=w3840", 
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMTgy/MDAxNzc3NjQ4NDQwNzIw.Jk7VH2Q-IRZmrIEXNLysuOFeZD2LOoSscDzfIS5QGecg.cK-rK3Jm4sDXS2ClfChJgB7LMhQv1K9402f7ADMiiscg.PNG/4.png?type=w3840"
  },
  {
    id: 3,
    category: "부분 리모델링",
    title: "욕실 리모델링",
    location: "인천 연수구",
    size: "20평",
    duration: "2주",
    tags: ["욕실", "호텔식", "대리석"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMTY2/MDAxNzc3NjQ4NDQzMjQ1.rUm2GCjMAuA29z91rNrmWjbv-vGO625QgZNPt6aMSm4g.CsVAxvcQIHl76lyr1kCcejEVn-xbe8kyBuLosCHEkEAg.PNG/5.png?type=w3840", 
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMjcy/MDAxNzc3NjQ4NDQyODE4.x-WYqGoDH49R5T0GhC0ODE0DEQJXYuQPhiZ9trMlHlog.EjgpQFmNLNuWP-NXKspjs3FgH6ik4T3Swqpy4zaTtnEg.PNG/6.png?type=w3840"
  },
  {
    id: 4,
    category: "상업공간",
    title: "카페 인테리어",
    location: "서울 마포구",
    size: "25평",
    duration: "3주",
    tags: ["상업공간", "카페", "내추럴"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMTAz/MDAxNzc3NjQ4NDQyNDI1.ZaTTvEa5PrUHVviiqDkPqlV6flQWDjkwi7WCDh7dB3kg.RNdY67-Ifz-p64HJ4qL6oSNjq04SNcfXQi1gxxDG4N4g.PNG/7.png?type=w3840", 
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfODMg/MDAxNzc3NjQ4NDQzMTg3.4YIsy50DCkaCqA-nUIeSWy1ySvCJBlgIDlNJY4mJgVUg.NbEpy76LuY3nA9FgZ_70lsr6Gg61duJWkFqdbZpxP7sg.PNG/8.png?type=w3840"
  },
  {
    id: 5,
    category: "아파트",
    title: "25평 아파트 리모델링",
    location: "경기 용인시",
    size: "25평",
    duration: "4주",
    tags: ["아파트", "미니멀", "베이지"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMjE1/MDAxNzc3NjQ4NDQyOTI4.C6CAabdo56o0H-bXPby86KlUk_n-yKTnjPOvD21rhQIg.pQ-zBuIx2s1L8HGaIDZVth7tizv8pQRv_Y1cCFVlK1Ag.PNG/9.png?type=w3840", 
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMjYw/MDAxNzc3NjQ4NDQwNjgy.5sHxSqARwtZ6QHkKZRmG-qEi46MWUHJWSaOfT-fgHogg.ZQ8XMvcwcX7-z2gmb4b_QH0R66MVipkX1Ys6ABEGNEgg.PNG/10.png?type=w3840"
  },
  {
    id: 6,
    category: "주택",
    title: "전원주택 인테리어",
    location: "경기 수원시",
    size: "45평",
    duration: "6주",
    tags: ["주택", "모던", "정원"],
    beforeImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfMzcg/MDAxNzc3NjQ4NDQxMTE5.ThLthZyIwUjqqSIfodwHesS5LRYj_IRw1ShfhXyu25Ig.t30yxae6BbvT-9cEM-KR-80SqrYO1pUNYw0YboIbN0Ag.PNG/11.png?type=w3840", 
    afterImg: "https://postfiles.pstatic.net/MjAyNjA1MDJfODEg/MDAxNzc3NjQ4NDQwMjYy.F_ZHQdWVYNsDECQ083v717F2ft8LDO4q6DJsh1pK-kUg.h0jZtr52UybEd2x56sd7939Y7v8jMne4hWomgAu7XDcg.PNG/12.png?type=w3840"
  }
];

const FILTER_CATEGORIES = ["전체", "아파트", "주택", "상업공간", "부분 리모델링"];

interface BeforeAfterCardProps {
  project: typeof BEFORE_AFTER_DATA[0];
  key?: React.Key;
}

const BeforeAfterCard = ({ project }: BeforeAfterCardProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 rounded-sm border border-surface-high/30 group flex flex-col md:flex-row"
    >
      <div 
        className="relative aspect-[16/11] md:aspect-[16/10] md:w-[55%] lg:w-[65%] cursor-col-resize select-none overflow-hidden bg-surface-high"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSliderPosition(50)}
      >
        {/* AFTER Image (Full Background) */}
        <img 
          src={project.afterImg} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
          alt="After" 
          referrerPolicy="no-referrer"
        />
        
        {/* BEFORE Image (Clipped Overlay) */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={project.beforeImg} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
            alt="Before" 
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Labels - Always visible but more elegant */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
             <span className="bg-white/90 backdrop-blur-md text-primary text-[9px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-sm uppercase shadow-sm inline-block">Before</span>
          </div>
        </div>
        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <div className="flex flex-col gap-1 items-end">
             <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-sm uppercase shadow-sm inline-block">After</span>
          </div>
        </div>

        {/* Interactive Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[1px] bg-white/50 backdrop-blur-sm z-30 pointer-events-none transition-opacity duration-300"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-2xl rounded-full flex items-center justify-center border border-primary/5">
            <div className="flex gap-1" aria-hidden="true">
              <div className="w-1 h-3 bg-primary/30 rounded-full animate-pulse" />
              <div className="w-1 h-3 bg-primary/30 rounded-full animate-pulse delay-75" />
            </div>
          </div>
          {/* Vertical Glow Line */}
          <div className="absolute inset-y-0 -left-4 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="p-8 md:p-12 lg:p-16 space-y-6 md:w-[45%] lg:w-[35%] flex flex-col justify-center bg-white relative z-20">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-secondary tracking-[0.3em] uppercase mb-2">{project.category}</div>
          <h4 className="text-2xl md:text-3xl font-display font-medium text-primary tracking-tight leading-tight whitespace-pre-line">{project.title}</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-6 py-8 border-y border-surface-high/50 text-xs text-primary/60 font-medium">
          <div className="flex justify-between items-center font-sans">
            <span className="text-[9px] text-primary/30 font-bold uppercase tracking-widest">Location</span>
            <span className="text-primary">{project.location}</span>
          </div>
          <div className="flex justify-between items-center font-sans">
            <span className="text-[9px] text-primary/30 font-bold uppercase tracking-widest">Size</span>
            <span className="text-primary">{project.size}</span>
          </div>
          <div className="flex justify-between items-center font-sans">
            <span className="text-[9px] text-primary/30 font-bold uppercase tracking-widest">Period</span>
            <span className="text-primary">{project.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-primary/30 font-bold tracking-[0.1em] uppercase border border-surface-high px-3 py-1 rounded-full group-hover:border-secondary group-hover:text-secondary transition-all cursor-default">#{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setEmail("");
      alert("구독해 주셔서 감사합니다.");
    } catch (error) {
      console.error(error);
      alert("구독 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = activeFilter === "전체" 
    ? BEFORE_AFTER_DATA 
    : BEFORE_AFTER_DATA.filter(p => p.category === activeFilter);

  return (
    <div className="pt-24 min-h-screen bg-[#FAF9F6]">
      {/* BEFORE & AFTER Hero Section */}
      <section className="py-24 bg-white border-b border-surface-high/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-secondary uppercase mb-4 block">Archive</span>
            <h1 className="text-[60px] font-display font-light text-primary tracking-tight mb-6 uppercase">Transformed</h1>
            <p className="text-sm font-light text-primary/50 tracking-wide mb-16">
              정교한 엔지니어링과 예술적 감각이 만나는 <br className="hidden md:block" /> 시공 전후의 극적인 변화를 경험해보세요.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-20">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-8 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all duration-300 ${
                  activeFilter === cat 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "bg-[#FAF9F6] text-primary/40 hover:bg-surface-high hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:gap-24 text-left">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <BeforeAfterCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="mt-20 px-10 py-4 border border-surface-high text-[11px] font-bold tracking-[0.2em] uppercase text-primary/40 hover:text-primary hover:border-primary transition-all flex items-center gap-3 mx-auto"
          >
            더 많은 시공 사례 보기
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-transparent overflow-hidden mb-24">
              <div className="flex justify-start pb-12">
                <div className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Mood & Imagery</div>
              </div>
              
              {/* Gallery Marquee Row - Single Line */}
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
                        alt={`Archive ${i}`} 
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter / Archive CTA */}
          <div className="mt-32 bg-surface p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="max-w-md">
                <h3 className="text-2xl font-display font-light text-primary mb-4">당신의 서사를 높이세요</h3>
                <p className="text-sm text-primary/50 font-light leading-relaxed">
                   우리의 분기별 아카이브에 가입하여 최신 창작물과 건축 철학이 담긴 프로젝트 소식을 받아보세요.
                </p>
             </div>
             <form onSubmit={handleSubscribe} className="flex w-full md:w-auto border-b border-primary/20">
                <input 
                  type="email" 
                  placeholder="이메일 주소" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent py-4 text-sm focus:outline-none flex-1 min-w-[300px]" 
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-secondary transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : "아카이브 참여"}
                </button>
             </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
