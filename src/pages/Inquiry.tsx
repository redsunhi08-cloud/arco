import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, Clock, ChevronRight, Loader2 } from "lucide-react";
import { submitInquiry } from "../services/firebaseService";

const Inquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    phone: "",
    email: "",
    projectType: "공간 유형을 선택해주세요...",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiry({
        ...formData,
        projectType: formData.projectType === "공간 유형을 선택해주세요..." ? "" : formData.projectType
      });
      setSubmitted(true);
      setFormData({
        title: "",
        name: "",
        phone: "",
        email: "",
        projectType: "공간 유형을 선택해주세요...",
        message: ""
      });
      alert("문의가 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
            <span className="text-[11px] font-bold text-[#8b6e4e] uppercase tracking-[0.4em] mb-4 block">CONSULTATION</span>
            <h1 className="text-4xl md:text-[50px] font-display font-medium text-primary tracking-[0.15em] uppercase mb-8">INQUIRY</h1>
            <p className="text-primary/70 font-medium text-[14px] md:text-base tracking-widest max-w-2xl mx-auto leading-relaxed">
              당신의 비전을 도면 위에 실현하는 첫 번째 시작입니다. <br className="hidden md:block" /> 아르코와 함께 공간의 새로운 가능성을 발견하세요.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 space-y-12">
               <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-surface border border-surface-high group-hover:border-secondary transition-colors">
                        <Phone size={18} className="text-secondary" />
                      </div>
                      <span className="text-[11px] font-bold text-primary/50 uppercase tracking-widest">전화번호</span>
                    </div>
                    <div className="text-2xl text-primary font-bold transition-all group-hover:text-secondary">+82 2 1234 5678</div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-surface border border-surface-high group-hover:border-secondary transition-colors">
                        <Mail size={18} className="text-secondary" />
                      </div>
                      <span className="text-[11px] font-bold text-primary/50 uppercase tracking-widest">이메일</span>
                    </div>
                    <div className="text-2xl text-primary font-bold transition-all group-hover:text-secondary">design@arco-interior.com</div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-surface border border-surface-high group-hover:border-secondary transition-colors">
                        <Clock size={18} className="text-secondary" />
                      </div>
                      <span className="text-[11px] font-bold text-primary/50 uppercase tracking-widest">상담 시간</span>
                    </div>
                    <div className="text-2xl text-primary font-bold">09:30 - 18:30</div>
                    <p className="text-[11px] text-primary/60 mt-1 font-bold">월요일 - 금요일, KST</p>
                  </div>
               </div>

               <div className="p-8 bg-surface border border-surface-high">
                  <h4 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" /> 빠른 문의
                  </h4>
                  <p className="text-xs text-primary/50 leading-relaxed mb-6 font-light">
                    즉각적인 도움이 필요하신가요? 아래 버튼을 클릭하여 카카오톡이나 왓츠앱으로 메시지를 보내주세요.
                  </p>
                  <button className="w-full py-4 bg-primary text-white text-[10px] font-bold tracking-widest uppercase hover:bg-secondary transition-all">
                    메신저 시작하기
                  </button>
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-8 bg-white border border-surface-high p-10 md:p-16 shadow-sm"
            >
              <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">주제 / 프로젝트 명</label>
                   <input 
                     type="text" 
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light" 
                     placeholder="예: 한남동 레지던스 현대화" 
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                     <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">성함</label>
                     <input 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light" 
                       placeholder="이름을 입력해주세요" 
                       required
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">연락처</label>
                     <input 
                       type="tel" 
                       name="phone"
                       value={formData.phone}
                       onChange={handleChange}
                       className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light" 
                       placeholder="+82 10-0000-0000" 
                     />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                     <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">이메일 주소</label>
                     <input 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light" 
                       placeholder="your@email.com" 
                       required
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">공간 유형</label>
                     <select 
                       name="projectType"
                       value={formData.projectType}
                       onChange={handleChange}
                       className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light bg-transparent appearance-none cursor-pointer"
                     >
                       <option>공간 유형을 선택해주세요...</option>
                       <option>주거 공간 리노베이션</option>
                       <option>상업 공간 디자인</option>
                       <option>빌딩 마스터 플래닝</option>
                       <option>공간 스타일링</option>
                     </select>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">상세 요청 사항</label>
                   <textarea 
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     rows={6} 
                     className="w-full border-b border-surface-high py-4 focus:outline-none focus:border-secondary transition-colors text-primary text-xl font-light resize-none" 
                     placeholder="프로젝트 목표와 디자인 방향성을 자유롭게 설명해 주세요..." 
                     required
                   ></textarea>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
                   <p className="text-[10px] text-primary/30 font-medium leading-relaxed max-w-xs">
                     제출함으로써, ARCO가 개인정보 보호정책에 따라 내 정보를 수집하고 처리하는 것에 동의합니다.
                   </p>
                   <button 
                     disabled={isSubmitting}
                     className="px-16 py-6 bg-primary text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-secondary transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? <><Loader2 className="animate-spin" size={16} /> 전송 중...</> : <>문의 보내기 <ChevronRight size={16} /></>}
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;
