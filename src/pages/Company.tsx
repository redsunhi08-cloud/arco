import React from "react";
import { motion } from "motion/react";
import { Quote, Search, PenTool, Hammer, CheckCircle, DoorOpen, Hourglass, Leaf, Armchair, Home } from "lucide-react";
import { ASSETS } from "../constants";

const PROCESS_STEPS = [
  { 
    id: "01", 
    title: "심층 상담", 
    icon: <Search size={24} />,
    desc: "고객의 라이프스타일과 취향을 분석하여 공간의 방향성을 설정하고 최적의 평면 구성을 제안합니다." 
  },
  { 
    id: "02", 
    title: "맞춤 디자인", 
    icon: <PenTool size={24} />,
    desc: "정교한 3D 시뮬레이션과 자재 셀렉션을 통해 감각적인 공간 무드와 상세 설계를 완성합니다." 
  },
  { 
    id: "03", 
    title: "책임 시공", 
    icon: <Hammer size={24} />,
    desc: "숙련된 파트너십과 철저한 공정 관리를 통해 도면을 현실로 구현하며 최상의 마감 퀄리티를 보장합니다." 
  },
  { 
    id: "04", 
    title: "완성 및 케어", 
    icon: <CheckCircle size={24} />,
    desc: "엄격한 자체 검수 시스템을 통한 준공 후에도 지속적인 사후 관리를 통해 공간의 가치를 유지합니다." 
  }
];

const Company = () => {
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
            <span className="text-[10px] md:text-[11px] font-bold text-[#8D8174] uppercase tracking-[0.4em] mb-4 block">BRAND IDENTITY</span>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary tracking-[0.1em] uppercase mb-8">PHILOSOPHY</h1>
            <p className="text-primary/40 font-light text-[13px] md:text-sm tracking-widest max-w-2xl mx-auto leading-relaxed">
              아르코는 공간의 본질을 탐구하며, <br className="hidden md:block" /> 거주자의 삶과 철학이 투영된 타임리스 디자인을 지향합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero / About */}
      <section className="py-24 md:py-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-11/12"
            >
              <div className="aspect-[16/9] overflow-hidden border border-surface-high group">
                 <img 
                   src={ASSETS.PHILOSOPHY} 
                   className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:contrast-100" 
                   alt="Architecture of Living" 
                   referrerPolicy="no-referrer"
                 />
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="lg:absolute lg:-bottom-24 lg:right-0 lg:w-1/2 bg-white/70 backdrop-blur-md p-10 md:p-16 border border-surface-high shadow-2xl space-y-8 z-10 transition-all duration-700 hover:bg-primary group cursor-pointer hover:scale-[1.02] hover:shadow-primary/20"
            >
               <div>
                  <h2 className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-6 group-hover:text-white transition-colors">단순함의 미학</h2>
                  <h3 className="text-[30px] font-display font-light text-primary leading-tight mb-8 group-hover:text-white transition-colors">
                     덜어냄을 통해 <br /> <span className="">본질의 아름다움</span>을 찾습니다.
                  </h3>
                  <div className="space-y-6 text-primary/60 leading-relaxed font-light text-justify text-sm md:text-base group-hover:text-white/80 transition-colors">
                     <p>
                        ARCO Interior Remodeling은 건축적 중량감과 유기적인 유연함이 만나는 지점을 지향합니다. 우리는 단순히 공간을 수리하는 것을 넘어, 거주자의 삶의 철학이 투영된 '집'을 탐구합니다. 유행에 휩쓸리지 않는 타임리스 디자인(Timeless Design)을 통해 시간이 흐를수록 가치가 더해지는 공간을 창조합니다.
                     </p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-primary/40 group-hover:text-white/40 transition-colors">
                  <Quote size={20} className="text-secondary group-hover:text-white transition-colors" />
                  <p className="text-xs uppercase tracking-widest font-medium">Architecture of Living</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Identity / Guideline Style Section */}
      <section className="py-24 border-y border-surface-high bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          {/* TopRow: Logo & Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-20 bg-white border border-surface-high relative overflow-hidden group cursor-pointer transition-all duration-700 hover:bg-primary">
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-[0.1] invert group-hover:invert-0">
                  <img src="https://images.unsplash.com/photo-1518005020251-58296d8ae0a8?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="pattern" />
               </div>
               <div className="relative z-10 text-center max-w-[300px] transition-transform duration-700 group-hover:scale-105">
                  <img 
                    src="https://postfiles.pstatic.net/MjAyNjA0MzBfMTEy/MDAxNzc3NTU5MDMwMDkx.7E76NBVa_OjB6DyOTDerqwEPPy3N-6EsRoDF2lqgnDYg.MAPraUW2JSU7a1a35XAv29BT0wioqJ7jcyqC1poQWJcg.PNG/%EB%A1%9C%EA%B3%A0(%ED%88%AC%EB%AA%85).png?type=w3840" 
                    alt="ARCO Logo" 
                    className="w-full h-auto transition-all duration-700 group-hover:invert group-hover:brightness-200"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
            <div className="lg:col-span-5 space-y-10 pl-0 lg:pl-12">
               <div>
                 <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-8">About Brand</div>
                 <h4 className="text-3xl md:text-4xl font-display text-primary leading-tight mb-8">
                   공간을 디자인합니다. <br />
                   당신의 라이프 스타일을 <br />
                   완성합니다.
                 </h4>
                 <div className="w-16 h-[2px] bg-[#1F4D46] mb-8" />
                 <p className="text-sm text-primary/60 font-light leading-relaxed">
                   아르코 인테리어는 고객의 삶의 가치를 담아 <br />
                   공간의 본질을 디자인하는 토탈 인테리어 브랜드입니다. <br />
                   공간의 균형과 조화를 통해 일상의 품격을 높여드립니다.
                 </p>
               </div>
            </div>
          </div>

          {/* Grid: Color, Keywords, Typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-high border border-surface-high">
            {/* Color Palette */}
            <div className="bg-white p-10 space-y-8 flex flex-col h-full group cursor-pointer transition-all duration-700 hover:bg-primary">
              <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest group-hover:text-white/50 transition-colors">Color Palette</div>
              <div className="flex gap-2 flex-grow items-center">
                {[
                  { hex: "#1F4D46", name: "Green" },
                  { hex: "#222222", name: "Black" },
                  { hex: "#8D8174", name: "Taupe" },
                  { hex: "#D6D2CC", name: "Grey" },
                  { hex: "#F2F0ED", name: "Beige" }
                ].map((color) => (
                  <div key={color.hex} className="flex-1">
                    <div 
                      className="aspect-[1/3] mb-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-black/20" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-[9px] font-bold text-primary/30 uppercase tracking-tighter group-hover:text-white/40 transition-colors">{color.hex}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Icons */}
            <div className="bg-white p-10 space-y-12 flex flex-col h-full group cursor-pointer transition-all duration-700 hover:bg-primary">
              <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest group-hover:text-white/50 transition-colors">Keyword</div>
              <div className="flex justify-between items-center text-center h-full pb-10">
                 {[
                   { icon: <DoorOpen size={20} strokeWidth={1.2} />, label: "ARCHITECTURE" },
                   { icon: <Hourglass size={20} strokeWidth={1.2} />, label: "BALANCE" },
                   { icon: <Leaf size={20} strokeWidth={1.2} />, label: "NATURAL" },
                   { icon: <Armchair size={20} strokeWidth={1.2} />, label: "MINIMAL" },
                   { icon: <Home size={20} strokeWidth={1.2} />, label: "LIFESTYLE" }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-6 group/item">
                      <div className="text-primary/80 transition-all duration-500 group-hover:text-white group-hover:scale-125">
                         {item.icon}
                      </div>
                      <div className="text-[8px] font-bold tracking-widest text-primary/40 whitespace-nowrap group-hover:text-white/40 transition-colors">{item.label}</div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white p-10 space-y-10 md:col-span-2 lg:col-span-1 group cursor-pointer transition-all duration-700 hover:bg-primary">
              <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest group-hover:text-white/50 transition-colors">Typography</div>
              <div className="flex flex-col gap-10">
                <div className="text-[80px] font-display text-primary leading-none opacity-90 group-hover:text-white transition-colors group-hover:scale-105 origin-left duration-700">Aa</div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-primary/30 uppercase tracking-[0.1em] group-hover:text-white/30 transition-colors">English</div>
                      <div className="text-xs font-display text-primary border-b border-surface-high pb-1 group-hover:text-white group-hover:border-white/20 transition-all">Playfair Display</div>
                    </div>
                    <div className="text-[8px] text-primary/40 leading-relaxed font-display uppercase tracking-wider group-hover:text-white/40 transition-colors">
                      ABCDEFGHIJKLMN <br />
                      abcdefghijklmn <br />
                      0123456789
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-primary/30 uppercase tracking-[0.1em] group-hover:text-white/30 transition-colors">Korean</div>
                      <div className="text-xs font-sans font-bold text-primary border-b border-surface-high pb-1 group-hover:text-white group-hover:border-white/20 transition-all">Noto Sans KR</div>
                    </div>
                    <div className="text-[8px] text-primary/40 leading-relaxed font-sans font-medium tracking-tighter group-hover:text-white/40 transition-colors">
                      가나다라마바사 <br />
                      0123456789
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Process */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 flex flex-col md:flex-row items-center justify-center gap-6">
            <h2 className="text-secondary text-[30px] font-bold tracking-[0.3em] uppercase leading-[60px]">워크플로우</h2>
            <h3 className="text-3xl md:text-4xl font-display font-light text-primary tracking-tight">시공 프로세스</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white p-10 border border-surface-high overflow-hidden transition-all duration-500 cursor-pointer"
              >
                {/* Background Inversion Layer */}
                <div 
                  className="absolute inset-0 bg-primary z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100"
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="text-4xl font-display text-primary/10 group-hover:text-white/10 transition-colors duration-500">{step.id}</div>
                    <div className="text-secondary transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">{step.icon}</div>
                  </div>
                  <h4 className="text-xl font-medium text-primary group-hover:text-white mb-4 transition-colors duration-500">{step.title}</h4>
                  <p className="text-xs text-primary/50 group-hover:text-white/60 leading-relaxed font-light transition-colors duration-500">
                    {step.desc}
                  </p>
                  
                  {/* Decorative underline */}
                  <div className="mt-8 w-0 h-[1px] bg-secondary group-hover:w-full transition-all duration-700" />
                </div>

                {/* Corner accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Quote */}
      <section className="py-24 md:py-48 bg-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
            <span className="text-[30vw] font-display font-black uppercase">IDENTITY</span>
         </div>
         <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <Quote className="text-secondary mx-auto mb-12" size={48} />
            <h4 className="text-2xl md:text-4xl font-display font-light text-primary leading-tight mb-12">
               "인테리어는 벽을 세우고 바닥을 까는 기술적 행위를 넘어, <br className="hidden md:block" /> 한 사람의 우주를 짓는 일입니다."
            </h4>
            <div className="flex flex-col items-center">
               <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">JOO JIN HYOUNG</div>
               <div className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">대표 이사</div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Company;
