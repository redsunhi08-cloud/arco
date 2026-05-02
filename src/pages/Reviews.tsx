import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { ChevronRight, Star, MessageSquare } from "lucide-react";
import { REVIEWS } from "../constants";

// Extended interface for the new design
interface ReviewData {
  author: string;
  rating: number;
  text: string;
  project: string;
  date: string;
  image: string;
  type: string;
  category?: string;
  size?: string;
}

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

const EXTENDED_REVIEWS: ReviewData[] = [
  {
    ...REVIEWS[0],
    category: "아파트",
    size: "34평",
    date: "2024.05.22"
  },
  {
    ...REVIEWS[1],
    category: "욕실 리모델링",
    size: "기본형",
    date: "2024.05.18"
  },
  {
    ...REVIEWS[2],
    category: "상업공간 · 카페",
    size: "25평",
    date: "2024.04.30"
  },
  {
    ...REVIEWS[3],
    category: "아파트",
    size: "25평",
    date: "2024.05.15"
  },
  {
    ...REVIEWS[4],
    category: "아파트",
    size: "30평",
    date: "2024.05.10"
  },
  {
    ...REVIEWS[5],
    category: "주택 · 단독주택",
    size: "기본",
    date: "2024.04.28"
  },
  {
    ...REVIEWS[6],
    category: "부분 리모델링 · 주방",
    size: "15평",
    date: "2024.04.20"
  },
  {
    author: "윤소영 님",
    rating: 5,
    text: "욕실 리모델링 결과가 기대 이상이에요. 청결하고 세련된 공간이 완성되었습니다.",
    project: "욕실의 정석",
    date: "2024.04.18",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    type: "Residential",
    category: "아파트",
    size: "24평"
  },
  {
    author: "김대표 님",
    rating: 5,
    text: "브랜드 콘셉트에 딱 맞는 공간을 만들어주셔서 매출도 함께 올랐어요!",
    project: "모던 비스트로",
    date: "2024.04.12",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    type: "Commercial",
    category: "상업공간 · 레스토랑",
    size: "40평"
  }
];

const ReviewCard = ({ review }: { review: ReviewData; key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="bg-white border border-surface-high/60 overflow-hidden flex flex-col h-full group hover:shadow-2xl transition-all duration-500 hover:bg-primary hover:border-primary"
  >
    <div className="aspect-[4/3] overflow-hidden relative">
      <img 
        src={review.image} 
        alt={review.project} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-grow transition-colors duration-500">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] text-primary/30 font-bold tracking-widest uppercase transition-colors group-hover:text-white/40">{review.category} &middot; {review.size}</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-bold text-primary transition-colors group-hover:text-white">{review.author}</span>
        <div className="flex gap-0.5 text-[#FFB800] group-hover:text-[#FFD700]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
      <p className="text-[13px] text-primary/70 leading-relaxed font-light mb-6 line-clamp-3 transition-colors group-hover:text-white/90">
        "{review.text}"
      </p>
      <div className="mt-auto pt-6 border-t border-surface-high/30 transition-colors group-hover:border-white/10">
        <span className="text-[10px] text-primary/20 font-medium transition-colors group-hover:text-white/30">{review.date}</span>
      </div>
    </div>
  </motion.div>
);

const Reviews = () => {
  const [filter, setFilter] = useState("전체");

  const categories = ["전체", "아파트", "주택", "상업공간", "부분 리모델링"];

  return (
    <div className="pt-24 min-h-screen bg-[#FDFDFD]">
      {/* Brand Header */}
      <section className="bg-white py-16 md:py-24 border-b border-surface-high">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] md:text-[11px] font-bold text-[#8D8174] uppercase tracking-[0.4em] mb-4 block">CLIENT SATISFACTION</span>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary tracking-[0.1em] uppercase mb-8">REVIEWS</h1>
            <p className="text-primary/40 text-xs md:text-sm font-light tracking-widest uppercase mb-12">공간의 가치를 증명하는 <br className="md:hidden" /> 고객의 생생한 기록</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8">
               <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-light text-primary mb-2">
                    <Counter value={1280} />+
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-primary/30 uppercase">구매 건수</div>
               </div>
               <div className="w-[1px] h-12 bg-surface-high hidden md:block" />
               <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-light text-primary mb-2">
                    <Counter value={452} />+
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-primary/30 uppercase">고객 후기</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all border ${
                  filter === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white text-primary/40 border-surface-high hover:border-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Top Row: Big Review & Rating Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className="bg-white border border-surface-high/60 shadow-sm flex flex-col md:flex-row h-full transition-all duration-500 hover:shadow-xl hover:bg-primary group"
              >
                <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img 
                    src={EXTENDED_REVIEWS[0].image} 
                    alt="Featured Review" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-[10px] text-primary/30 font-bold tracking-[0.2em] uppercase mb-4 transition-colors group-hover:text-white/40">
                    {EXTENDED_REVIEWS[0].category} &middot; {EXTENDED_REVIEWS[0].size}
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-lg font-bold text-primary transition-colors group-hover:text-white">{EXTENDED_REVIEWS[0].author} 님</span>
                    <div className="flex gap-0.5 text-[#FFB800] group-hover:text-[#FFD700]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                  <p className="text-base text-primary/70 leading-relaxed font-light mb-10 transition-colors group-hover:text-white/90">
                    "{EXTENDED_REVIEWS[0].text}"
                  </p>
                  <div className="mt-auto flex justify-between items-center text-[10px] font-medium text-primary/20 transition-colors group-hover:text-white/30">
                    <span>{EXTENDED_REVIEWS[0].date}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-surface-high/60 px-8 py-10 shadow-sm h-full flex flex-col"
              >
                <h4 className="text-[10px] text-primary/30 font-bold uppercase tracking-widest mb-6">리뷰 평점</h4>
                <div className="flex items-end gap-2 mb-4">
                   <span className="text-6xl font-display font-medium text-primary">4.9</span>
                   <span className="text-xl text-primary/20 font-light mb-2">/ 5</span>
                </div>
                <div className="flex gap-1 text-[#FFB800] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-surface-high/60 p-8 shadow-sm"
              >
                <h4 className="text-[10px] text-primary/30 font-bold uppercase tracking-widest mb-6">베스트 리뷰</h4>
                <div className="flex gap-4">
                   <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-surface">
                      <img 
                        src={EXTENDED_REVIEWS[7].image} 
                        alt="Best Review" 
                        className="w-full h-full object-cover grayscale transition-all hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                   </div>
                   <div className="flex flex-col justify-center">
                      <div className="text-[11px] font-bold text-primary mb-1">욕실 리모델링</div>
                      <div className="text-[10px] text-primary/30 font-medium mb-1">2024.05.18 | 이OO님</div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Second Featured Row (Image Right) */}
          <div className="mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.005 }}
              className="bg-white border border-surface-high/60 shadow-sm flex flex-col md:flex-row-reverse h-full transition-all duration-500 hover:shadow-xl hover:bg-primary group"
            >
              <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                <img 
                  src={EXTENDED_REVIEWS[2].image} 
                  alt="Featured Review 2" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-surface text-[10px] font-bold tracking-widest uppercase text-primary/40 border border-surface-high/50 transition-colors group-hover:bg-white/10 group-hover:text-white/60 group-hover:border-white/20">상업공간 · 카페</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-bold text-primary transition-colors group-hover:text-white">{EXTENDED_REVIEWS[2].author} 님</span>
                  <div className="flex gap-0.5 text-[#FFB800] group-hover:text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <p className="text-lg text-primary/70 leading-relaxed font-light mb-10 transition-colors group-hover:text-white/90">
                  "{EXTENDED_REVIEWS[2].text}"
                </p>
                <div className="text-[10px] font-medium text-primary/20 transition-colors group-hover:text-white/30">{EXTENDED_REVIEWS[2].date}</div>
              </div>
            </motion.div>
          </div>

          {/* Grid of Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {EXTENDED_REVIEWS.slice(3).map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-24 border-t border-surface-high/30">
        <div className="max-w-7xl mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[#FAFAFA] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm border border-surface-high/30"
           >
              <div className="flex items-center gap-8 text-left">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-surface-high/50">
                    <MessageSquare size={24} className="text-secondary" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-display font-medium text-primary tracking-tight mb-2">당신의 공간 또한 예술이 될 수 있습니다.</h3>
                    <p className="text-primary/40 text-xs font-light tracking-[0.1em] uppercase">무료 상담을 통해 당신의 공간에 가장 잘 맞는 솔루션을 제안해드립니다.</p>
                 </div>
              </div>
              <button className="px-10 py-5 bg-primary text-white flex items-center gap-4 group transition-all rounded-sm shadow-md hover:bg-secondary">
                 <span className="text-xs font-bold tracking-widest uppercase">무료 상담 신청하기</span>
                 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
