import React from "react";
import { motion } from "motion/react";
import { Phone, Mail, Clock, ArrowUpRight, ChevronRight } from "lucide-react";
import { useInquiry } from "../contexts/InquiryContext";

const Location = () => {
  const { openModal } = useInquiry();

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
            <span className="text-[11px] font-bold text-[#8b6e4e] uppercase tracking-[0.4em] mb-4 block">OUR STUDIO</span>
            <h1 className="text-4xl md:text-[50px] font-display font-medium text-primary tracking-[0.15em] uppercase mb-8">LOCATION</h1>
            <p className="text-primary/70 font-medium text-[14px] md:text-base tracking-widest max-w-2xl mx-auto leading-relaxed">
              아르코의 건축적 호흡이 담긴 오프라인 스튜디오를 안내합니다. <br className="hidden md:block" /> 감각적인 공간의 탄생과정을 직접 경험해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* Intro Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-[#8b6e4e] text-[11px] font-bold tracking-[0.4em] uppercase mb-6">스튜디오</h2>
              <h3 className="text-[40px] font-display font-medium text-primary tracking-tight leading-tight">건축적 영감이 시작되는 곳</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-primary/70 text-[14px] md:text-base font-medium leading-relaxed max-w-sm"
            >
              우리 스튜디오는 비전이 도면으로 바뀌는 개방형 건축 공간입니다. 전문 디자이너와 함께하는 상담을 위해 방문해 주세요.
            </motion.p>
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full h-[500px] md:h-[650px] mb-24 overflow-hidden border border-surface-high shadow-lg"
          >
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.067341071221!2d127.1084!3d37.3949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f455555555%3A0x1b1b1b1b1b1b1b1b!2z6rK96riw64-EIOyEseuCqOyLnCDvIDsnbTsmIDroZwgMTY2!5e0!3m2!1sko!2skr!4v1714500000000!5m2!1sko!2skr" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               className="w-full h-full"
             ></iframe>
             <div className="absolute top-8 right-8 z-10">
                <motion.a 
                  href="https://maps.app.goo.gl/BCvWFga3b62xfXNH6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-sm text-primary px-8 py-5 flex items-center gap-4 shadow-xl border border-surface-high/50 group/btn"
                >
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase">구글 지도에서 열기</span>
                   <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </motion.a>
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start mb-24">
             {/* Info Column */}
             <div className="md:col-span-4 space-y-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                    <h4 className="text-[11px] font-bold text-primary/50 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-surface-high/80">Contact</h4>
                    <div className="space-y-10">
                       <div>
                         <div className="text-[11px] font-bold text-primary/40 uppercase tracking-widest mb-4">Address</div>
                         <p className="text-2xl text-primary font-medium leading-[1.4]">
                            판교 테크노밸리 <br />
                            경기도 성남시 분당구 판교역로 166 <br />
                            대한민국 13529
                         </p>
                       </div>
                       <div>
                         <div className="text-[11px] font-bold text-primary/40 uppercase tracking-widest mb-4">Direct Lines</div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-4 text-primary group cursor-pointer">
                               <div className="w-10 h-10 rounded-full bg-surface-high/40 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                 <Phone size={14} />
                               </div>
                               <span className="text-xl font-bold group-hover:text-secondary transition-colors">+82 2 1234 5678</span>
                            </div>
                            <div className="flex items-center gap-4 text-primary group cursor-pointer">
                               <div className="w-10 h-10 rounded-full bg-surface-high/40 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                 <Mail size={14} />
                               </div>
                               <span className="text-xl font-bold group-hover:text-secondary transition-colors">visit@arco-interior.com</span>
                            </div>
                         </div>
                       </div>
                    </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-surface p-10 border border-surface-high/50"
                >
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                         <Clock size={20} className="text-[#2D3319]" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mb-1">운영 시간</div>
                         <div className="text-sm text-primary font-medium">평일 09:30 - 18:30</div>
                         <div className="text-[10px] text-primary/20 mt-1">* 주말 및 공휴일 휴무</div>
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* Gallery Column */}
             <div className="md:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className="aspect-square bg-white border border-surface-high overflow-hidden shadow-sm"
                   >
                      <img 
                        src="https://postfiles.pstatic.net/MjAyNjA0MzBfMjc5/MDAxNzc3NTYwNDc2Njcw.g8IU874dxRZDcndJ11SpEVXovLmGYO50xVRz8_63O5Ug.U7wusWGeXyxGIKpG40vUvON4jkc9OhDj_42h3Po9tX4g.PNG/%ED%9A%8C%EC%82%AC_%EA%B1%B4%EB%AC%BC.png?type=w3840" 
                        className="w-full h-full object-cover" 
                        alt="Studio Exterior" 
                        referrerPolicy="no-referrer" 
                      />
                   </motion.div>
                   <div className="grid grid-cols-1 gap-8">
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="aspect-[4/3] md:aspect-auto bg-white border border-surface-high overflow-hidden shadow-sm"
                      >
                         <img 
                           src="https://postfiles.pstatic.net/MjAyNjA0MzBfOTMg/MDAxNzc3NTYwNDgzMjUx.ViONqTCNrkdc15r2WhHi4VCBsQJIlUxOdopoLiCo0WIg.3-PVLtFToXZwgdtCAbwJMnbJLZ4dreB9aRUiOXkLPIcg.PNG/%ED%9A%8C%EC%82%AC_%EC%8B%A4%EB%82%B4.png?type=w3840" 
                           className="w-full h-full object-cover" 
                           alt="Studio Interior" 
                           referrerPolicy="no-referrer" 
                         />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="aspect-[4/2] bg-primary p-10 flex flex-col justify-center text-white"
                      >
                         <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-40">Consultation</div>
                         <h5 className="text-2xl font-display font-light mb-8">당신의 비전을 <br />현실로 만드세요.</h5>
                         <button 
                           onClick={openModal}
                           className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase group/text"
                         >
                           <span>프로젝트 문의하기</span>
                           <ChevronRight size={14} className="group-hover/text:translate-x-2 transition-transform" />
                         </button>
                      </motion.div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;

