import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Quote, Loader2 } from "lucide-react";
import { ASSETS } from "../constants";
import { useInquiry } from "../contexts/InquiryContext";
import { subscribeNewsletter } from "../services/firebaseService";

export const Footer = () => {
  const { openModal } = useInquiry();
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

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-surface-high">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <img 
              src={ASSETS.LOGO} 
              alt="ARCO" 
              className="h-12 w-auto mb-8 brightness-0 object-contain" 
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-primary/50 leading-relaxed mb-8 max-w-xs">
              아르코 인테리어는 건축적 이해를 바탕으로 정서적 안정과 아름다움이 공존하는 공간을 창조합니다.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary/40 hover:text-secondary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-primary/40 hover:text-secondary transition-colors"><Quote size={20} /></a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">탐색</h4>
            <ul className="space-y-4">
              <li><Link to="/portfolio" className="text-sm text-primary/50 hover:text-primary transition-colors">포트폴리오</Link></li>
              <li><a href="#" className="text-sm text-primary/50 hover:text-primary transition-colors">블로그</a></li>
              <li><a href="#" className="text-sm text-primary/50 hover:text-primary transition-colors">인스타그램</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">지원</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-primary/50 hover:text-primary transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="text-sm text-primary/50 hover:text-primary transition-colors">이용약관</a></li>
              <li><button onClick={openModal} className="text-sm text-primary/50 hover:text-primary transition-colors cursor-pointer">문의하기</button></li>
            </ul>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">소식지 구독</h4>
            <p className="text-sm text-primary/50">아카이브를 구독하여 새로운 프로젝트 소식과 디자인 팁을 받아보세요.</p>
            <form onSubmit={handleSubscribe} className="flex max-w-md border-b border-surface-high">
              <input 
                type="email" 
                placeholder="이메일 주소" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 py-3 focus:outline-none bg-transparent text-primary text-sm" 
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase hover:text-secondary transition-colors disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : "가입"}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-surface-high flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-primary/30 uppercase tracking-widest font-bold">
            &copy; 2024 ARCO Interior Remodeling. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-primary/30 font-bold uppercase tracking-widest hover:text-primary transition-colors">개인정보처리방침</a>
            <a href="#" className="text-[10px] text-primary/30 font-bold uppercase tracking-widest hover:text-primary transition-colors">계약 가이드라인</a>
            <Link to="/admin" className="text-[10px] text-primary/10 font-bold uppercase tracking-widest hover:text-primary/30 transition-colors">ADMIN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
