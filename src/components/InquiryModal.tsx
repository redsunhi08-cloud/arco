import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Mail, Clock, ChevronRight } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[800px] z-[101] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-surface-high transition-colors"
            >
              <X size={24} className="text-primary" />
            </button>

            {/* Info Side */}
            <div className="hidden md:flex md:w-1/3 bg-primary p-12 flex-col justify-between text-white">
              <div className="space-y-8">
                <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary">Inquiry</div>
                <h3 className="text-[28px] font-display font-light leading-tight break-keep">
                  건축적 가치를 <br /> 상담 받으세요
                </h3>
              </div>

              <div className="space-y-6 pt-12 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-secondary" />
                  <span className="text-sm font-light">+82 2 1234 5678</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-secondary" />
                  <span className="text-sm font-light">design@arco.com</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8 block md:hidden">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary">Inquiry</span>
                <h3 className="text-2xl font-display text-primary mt-2">상담 문의</h3>
              </div>

              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose(); alert('문의가 접수되었습니다.'); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-primary/40">성함 / 연락처</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="성함" className="w-full border-b border-surface-high py-3 focus:outline-none focus:border-secondary text-primary font-light" required />
                    <input type="tel" placeholder="연락처" className="w-full border-b border-surface-high py-3 focus:outline-none focus:border-secondary text-primary font-light" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-primary/40">이메일</label>
                  <input type="email" placeholder="email@address.com" className="w-full border-b border-surface-high py-3 focus:outline-none focus:border-secondary text-primary font-light" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-primary/40">문의 내용</label>
                  <textarea rows={4} placeholder="프로젝트에 대해 설명해주세요..." className="w-full border-b border-surface-high py-3 focus:outline-none focus:border-secondary text-primary font-light resize-none" required></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-5 bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-secondary transition-all flex items-center justify-center gap-3">
                    문의 보내기 <ChevronRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
