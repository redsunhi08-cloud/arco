import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { auth, signInWithGoogle } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getInquiries, getSubscriptions } from "../services/firebaseService";
import { FileText, Users, Mail, Phone, Calendar, LogOut, Loader2, ShieldCheck } from "lucide-react";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"inquiries" | "subscriptions">("inquiries");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubInquiries = getInquiries(setInquiries);
      const unsubSubs = getSubscriptions(setSubscriptions);
      return () => {
        unsubInquiries();
        unsubSubs();
      };
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 border border-surface-high shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-display text-primary mb-4">관리자 로그인</h1>
          <p className="text-sm text-primary/40 font-light mb-10">
            상담 문의 및 소식지 구독 내역을 관리하려면 <br /> 관리자 계정으로 로그인하세요.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase hover:bg-secondary transition-all flex items-center justify-center gap-3"
          >
            Google 계정으로 로그인
          </button>
        </motion.div>
      </div>
    );
  }

  // Admin access check (simple email check for now as requested)
  const isAdmin = user.email === 'redsunhi08@gmail.com';

  if (!isAdmin) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <div className="bg-white p-12 border border-surface-high shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-display text-primary mb-4">권한 없음</h1>
          <p className="text-sm text-primary/40 font-light mb-10">
            이 페이지에 접근할 권한이 없습니다. 관리자 계정으로 다시 로그인해 주세요.
          </p>
          <button 
            onClick={() => auth.signOut()}
            className="w-full py-4 border border-primary text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all"
          >
            로그아웃
          </button>
        </div>
      </div>
     );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-2 block">ADMIN DASHBOARD</span>
            <h1 className="text-4xl font-display font-light text-primary tracking-tight">관리 센터</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-primary">{user.displayName}</div>
                <div className="text-[10px] text-primary/40">{user.email}</div>
             </div>
             <button 
              onClick={() => auth.signOut()}
              className="p-3 bg-surface border border-surface-high text-primary/40 hover:text-primary transition-colors"
             >
               <LogOut size={18} />
             </button>
          </div>
        </div>

        <div className="flex gap-1 border-b border-surface-high mb-8">
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === "inquiries" ? "border-primary text-primary" : "border-transparent text-primary/20 hover:text-primary/40"}`}
          >
            상담 문의 ({inquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab("subscriptions")}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === "subscriptions" ? "border-primary text-primary" : "border-transparent text-primary/20 hover:text-primary/40"}`}
          >
            소식지 구독 ({subscriptions.length})
          </button>
        </div>

        {activeTab === "inquiries" ? (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.length > 0 ? inquiries.map((inquiry) => (
              <motion.div 
                key={inquiry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-surface-high p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                        {inquiry.projectType || "일반 문의"}
                      </span>
                      <h3 className="text-lg text-primary font-bold">{inquiry.title || "제목 없음"}</h3>
                    </div>
                    <p className="text-primary/70 font-light leading-relaxed whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-surface-high">
                       <div className="flex items-center gap-3">
                          <Users size={14} className="text-secondary" />
                          <span className="text-xs font-medium text-primary">{inquiry.name} 님</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Phone size={14} className="text-secondary" />
                          <span className="text-xs font-medium text-primary">{inquiry.phone}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Mail size={14} className="text-secondary" />
                          <span className="text-xs font-medium text-primary">{inquiry.email}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Calendar size={14} className="text-secondary" />
                          <span className="text-[10px] font-bold text-primary/30 uppercase tracking-wider">
                            {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleString() : new Date(inquiry.createdAt).toLocaleString()}
                          </span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="py-24 text-center bg-white border border-surface-high text-primary/20 text-sm font-light uppercase tracking-widest">
                접수된 문의가 없습니다.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.length > 0 ? subscriptions.map((sub) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-surface-high p-6 shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-secondary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">{sub.email}</div>
                    <div className="text-[10px] text-primary/30 mt-1 font-bold uppercase tracking-wider">
                      {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : new Date(sub.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-24 text-center bg-white border border-surface-high text-primary/20 text-sm font-light uppercase tracking-widest">
                구독자가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
