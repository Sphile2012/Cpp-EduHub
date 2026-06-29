import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Plus, Trash2, Palette, Download, RotateCcw, Move,
  ChevronUp, ChevronDown, Copy
} from 'lucide-react';

interface SlideElement {
  id: string; text: string; x: number; y: number; width: number;
  fontSize: number; color: string; fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic'; textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right'; fontFamily: string;
  letterSpacing: number; lineHeight: number;
  textTransform: 'none' | 'uppercase' | 'lowercase'; zIndex: number;
}

const FONTS = ['Impact','Georgia','Arial','Helvetica','Times New Roman','Courier New','Verdana','Trebuchet MS'];

const PRESET_COLORS: Record<string, string> = {
  gold: '#D4AF37', white: '#FFFFFF', lightGray: '#CCCCCC', silver: '#C0C0C0',
};

const BG_OPTIONS = [
  { label: 'Dark Gold',  gradient: 'linear-gradient(160deg, #0d0d1a 0%, #1a1206 40%, #0d0d0d 100%)' },
  { label: 'Midnight',   gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d0d0d 100%)' },
  { label: 'Navy',       gradient: 'linear-gradient(160deg, #0a0f1e 0%, #1a2540 50%, #0a0f1e 100%)' },
  { label: 'Charcoal',   gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' },
  { label: 'Deep Teal',  gradient: 'linear-gradient(160deg, #071217 0%, #0d2b2b 50%, #071217 100%)' },
];

const INITIAL_ELEMENTS: SlideElement[] = [
  { id:'badge',    text:'01',                  x:7,  y:7,  width:8,  fontSize:28, color:'#D4AF37', fontWeight:'bold',   fontStyle:'normal', textDecoration:'none', textAlign:'center', fontFamily:'Arial',  letterSpacing:2, lineHeight:1.2, textTransform:'none',      zIndex:2 },
  { id:'team',     text:'TEAM 7',              x:50, y:10, width:70, fontSize:36, color:'#FFFFFF', fontWeight:'bold',   fontStyle:'normal', textDecoration:'none', textAlign:'center', fontFamily:'Arial',  letterSpacing:8, lineHeight:1.2, textTransform:'uppercase', zIndex:2 },
  { id:'title',    text:'THE INVINCIBLES',     x:50, y:26, width:92, fontSize:76, color:'#D4AF37', fontWeight:'bold',   fontStyle:'italic', textDecoration:'none', textAlign:'center', fontFamily:'Impact', letterSpacing:4, lineHeight:1,   textTransform:'none',      zIndex:2 },
  { id:'subtitle', text:'DIFFERENT STRENGTHS.  ·  ONE MISSION.  ·  UNSTOPPABLE TOGETHER.', x:50, y:62, width:82, fontSize:14, color:'#FFFFFF', fontWeight:'normal', fontStyle:'normal', textDecoration:'none', textAlign:'center', fontFamily:'Arial', letterSpacing:3, lineHeight:1.5, textTransform:'uppercase', zIndex:2 },
];

function generateId() { return Math.random().toString(36).slice(2, 9); }

export default function App() {
  const [elements, setElements] = useState<SlideElement[]>(INITIAL_ELEMENTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState(BG_OPTIONS[0].gradient);
  const [dragging, setDragging]     = useState<{ id:string; startX:number; startY:number; origX:number; origY:number } | null>(null);

  const slideRef    = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selected    = elements.find(e => e.id === selectedId) ?? null;

  const update = useCallback((id: string, patch: Partial<SlideElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...patch } : el));
  }, []);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (e.target === slideRef.current) { setSelectedId(null); setEditingId(null); }
  };

  const handleElementPointerDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (editingId === id) return;
    setSelectedId(id);
    const slide = slideRef.current;
    if (!slide) return;
    const el = elements.find(x => x.id === id)!;
    setDragging({ id, startX: e.clientX, startY: e.clientY, origX: el.x, origY: el.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !slideRef.current) return;
    const rect = slideRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragging.startX) / rect.width)  * 100;
    const dy = ((e.clientY - dragging.startY) / rect.height) * 100;
    update(dragging.id, {
      x: Math.max(0, Math.min(100, dragging.origX + dx)),
      y: Math.max(0, Math.min(95,  dragging.origY + dy)),
    });
  }, [dragging, update]);

  const handleMouseUp = useCallback(() => setDragging(null), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup',   handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [handleMouseMove, handleMouseUp]);

  const handleDoubleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); setEditingId(id);
    setTimeout(() => textareaRef.current?.focus(), 30);
  };

  const addTextBox = () => {
    const el: SlideElement = { id:generateId(), text:'Edit this text', x:50, y:50, width:45, fontSize:28, color:'#FFFFFF', fontWeight:'normal', fontStyle:'normal', textDecoration:'none', textAlign:'center', fontFamily:'Arial', letterSpacing:2, lineHeight:1.3, textTransform:'none', zIndex: elements.length + 2 };
    setElements(prev => [...prev, el]); setSelectedId(el.id);
  };

  const deleteSelected = () => { if (!selectedId) return; setElements(prev => prev.filter(e => e.id !== selectedId)); setSelectedId(null); setEditingId(null); };
  const duplicate = () => { if (!selected) return; const el: SlideElement = { ...selected, id:generateId(), x:selected.x+3, y:selected.y+3 }; setElements(prev => [...prev, el]); setSelectedId(el.id); };
  const handlePrint = () => { setSelectedId(null); setEditingId(null); setTimeout(() => window.print(), 120); };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#0f1117', fontFamily:"'Inter', system-ui, sans-serif" }}>

      {/* ── TOOLBAR ── */}
      <div style={{ background:'#1c2030', borderBottom:'1px solid #2d3348', padding:'8px 16px', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
        <span style={{ color:'#D4AF37', fontWeight:800, fontSize:14, letterSpacing:2, marginRight:8, whiteSpace:'nowrap' }}>SLIDE EDITOR</span>
        <Divider />
        <Btn active={selected?.fontWeight==='bold'}   onClick={() => selected && update(selected.id,{fontWeight:  selected.fontWeight==='bold'   ?'normal':'bold'})}   disabled={!selected} title="Bold"><Bold size={14}/></Btn>
        <Btn active={selected?.fontStyle==='italic'}  onClick={() => selected && update(selected.id,{fontStyle:   selected.fontStyle==='italic'  ?'normal':'italic'})} disabled={!selected} title="Italic"><Italic size={14}/></Btn>
        <Btn active={selected?.textDecoration==='underline'} onClick={() => selected && update(selected.id,{textDecoration: selected.textDecoration==='underline'?'none':'underline'})} disabled={!selected} title="Underline"><Underline size={14}/></Btn>
        <Divider />
        <Btn active={selected?.textAlign==='left'}   onClick={() => selected && update(selected.id,{textAlign:'left'})}   disabled={!selected} title="Left"><AlignLeft size={14}/></Btn>
        <Btn active={selected?.textAlign==='center'} onClick={() => selected && update(selected.id,{textAlign:'center'})} disabled={!selected} title="Center"><AlignCenter size={14}/></Btn>
        <Btn active={selected?.textAlign==='right'}  onClick={() => selected && update(selected.id,{textAlign:'right'})}  disabled={!selected} title="Right"><AlignRight size={14}/></Btn>
        <Divider />
        <select value={selected?.fontFamily??'Arial'} onChange={e=>selected&&update(selected.id,{fontFamily:e.target.value})} disabled={!selected} style={{background:'#2d3348',color:'#e2e8f0',border:'1px solid #3d4465',borderRadius:6,padding:'4px 8px',fontSize:12,maxWidth:130}}>
          {FONTS.map(f=><option key={f} value={f}>{f}</option>)}
        </select>
        <div style={{display:'flex',alignItems:'center',gap:4}}>
          <SmallBtn onClick={()=>selected&&update(selected.id,{fontSize:Math.max(6,selected.fontSize-2)})} disabled={!selected}>−</SmallBtn>
          <input type="number" min={6} max={300} value={selected?.fontSize??''} onChange={e=>selected&&update(selected.id,{fontSize:Math.max(6,parseInt(e.target.value)||12)})} disabled={!selected} style={{width:50,background:'#2d3348',color:'#e2e8f0',border:'1px solid #3d4465',borderRadius:6,padding:'4px 6px',fontSize:12,textAlign:'center'}}/>
          <SmallBtn onClick={()=>selected&&update(selected.id,{fontSize:selected.fontSize+2})} disabled={!selected}>+</SmallBtn>
        </div>
        <Divider />
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <Palette size={13} style={{color:'#8892b0'}}/>
          <input type="color" value={selected?.color??'#ffffff'} onChange={e=>selected&&update(selected.id,{color:e.target.value})} disabled={!selected} style={{width:30,height:26,border:'none',background:'none',cursor:'pointer',borderRadius:4}}/>
          {Object.values(PRESET_COLORS).map((c,i)=>(
            <button key={i} onClick={()=>selected&&update(selected.id,{color:c})} style={{width:16,height:16,borderRadius:'50%',background:c,border:'2px solid #3d4465',cursor:'pointer',padding:0}}/>
          ))}
        </div>
        <Divider />
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <span style={{color:'#8892b0',fontSize:11,whiteSpace:'nowrap'}}>Letter</span>
          <input type="range" min={-2} max={20} step={0.5} value={selected?.letterSpacing??0} onChange={e=>selected&&update(selected.id,{letterSpacing:parseFloat(e.target.value)})} disabled={!selected} style={{width:64,accentColor:'#D4AF37'}}/>
          <span style={{color:'#e2e8f0',fontSize:11,minWidth:24}}>{selected?.letterSpacing??0}</span>
        </div>
        <Divider />
        <select value={selected?.textTransform??'none'} onChange={e=>selected&&update(selected.id,{textTransform:e.target.value as SlideElement['textTransform']})} disabled={!selected} style={{background:'#2d3348',color:'#e2e8f0',border:'1px solid #3d4465',borderRadius:6,padding:'4px 8px',fontSize:12}}>
          <option value="none">Aa</option><option value="uppercase">AA</option><option value="lowercase">aa</option>
        </select>
        <Divider />
        <span style={{color:'#8892b0',fontSize:11}}>BG</span>
        {BG_OPTIONS.map(opt=>(
          <button key={opt.label} title={opt.label} onClick={()=>setBgGradient(opt.gradient)} style={{width:20,height:20,borderRadius:4,background:opt.gradient,border:bgGradient===opt.gradient?'2px solid #D4AF37':'2px solid #3d4465',cursor:'pointer',padding:0,flexShrink:0}}/>
        ))}
        <div style={{flex:1}}/>
        <Btn title="Bring Forward" onClick={()=>selected&&update(selected.id,{zIndex:selected.zIndex+1})} disabled={!selected}><ChevronUp size={14}/></Btn>
        <Btn title="Send Backward" onClick={()=>selected&&update(selected.id,{zIndex:Math.max(1,selected.zIndex-1)})} disabled={!selected}><ChevronDown size={14}/></Btn>
        <Btn title="Duplicate" onClick={duplicate} disabled={!selected}><Copy size={14}/></Btn>
        <Btn title="Delete" onClick={deleteSelected} disabled={!selected} danger><Trash2 size={14}/></Btn>
        <Divider />
        <button onClick={addTextBox} style={{display:'flex',alignItems:'center',gap:5,background:'#D4AF37',color:'#0d0d0d',border:'none',borderRadius:7,padding:'6px 13px',fontWeight:700,fontSize:12,cursor:'pointer',whiteSpace:'nowrap'}}>
          <Plus size={13}/> Add Text
        </button>
        <button onClick={()=>{setElements(INITIAL_ELEMENTS);setSelectedId(null);setEditingId(null);setBgGradient(BG_OPTIONS[0].gradient);}} title="Reset slide" style={{background:'#2d3348',color:'#94a3b8',border:'1px solid #3d4465',borderRadius:7,padding:'6px 10px',cursor:'pointer',display:'flex',alignItems:'center'}}>
          <RotateCcw size={14}/>
        </button>
        <button onClick={handlePrint} style={{display:'flex',alignItems:'center',gap:5,background:'#2d3348',color:'#e2e8f0',border:'1px solid #3d4465',borderRadius:7,padding:'6px 13px',fontSize:12,cursor:'pointer',whiteSpace:'nowrap'}}>
          <Download size={13}/> Print / Export
        </button>
      </div>

      {/* ── PROPERTIES BAR ── */}
      {selected && (
        <div style={{background:'#161b2e',borderBottom:'1px solid #2d3348',padding:'6px 16px',display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
          <span style={{color:'#D4AF37',fontSize:11,fontWeight:700,textTransform:'uppercase'}}>{selected.id}</span>
          <PropRow label="Width"><input type="range" min={10} max={100} value={selected.width} onChange={e=>update(selected.id,{width:parseInt(e.target.value)})} style={{width:80,accentColor:'#D4AF37'}}/><span style={{color:'#e2e8f0',fontSize:11,minWidth:30}}>{selected.width}%</span></PropRow>
          <PropRow label="Line H"><input type="range" min={0.8} max={3} step={0.05} value={selected.lineHeight} onChange={e=>update(selected.id,{lineHeight:parseFloat(e.target.value)})} style={{width:70,accentColor:'#D4AF37'}}/><span style={{color:'#e2e8f0',fontSize:11,minWidth:30}}>{selected.lineHeight.toFixed(2)}</span></PropRow>
          <PropRow label="X"><input type="range" min={0} max={100} step={0.5} value={Math.round(selected.x*10)/10} onChange={e=>update(selected.id,{x:parseFloat(e.target.value)})} style={{width:70,accentColor:'#D4AF37'}}/><span style={{color:'#e2e8f0',fontSize:11,minWidth:30}}>{selected.x.toFixed(1)}%</span></PropRow>
          <PropRow label="Y"><input type="range" min={0} max={95} step={0.5} value={Math.round(selected.y*10)/10} onChange={e=>update(selected.id,{y:parseFloat(e.target.value)})} style={{width:70,accentColor:'#D4AF37'}}/><span style={{color:'#e2e8f0',fontSize:11,minWidth:30}}>{selected.y.toFixed(1)}%</span></PropRow>
          <span style={{color:'#475569',fontSize:11,marginLeft:8}}><Move size={11} style={{display:'inline',verticalAlign:'middle',marginRight:4}}/>Drag · Double-click to edit</span>
        </div>
      )}

      {/* ── CANVAS ── */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:32,overflow:'auto'}}>
        <div style={{width:'100%',maxWidth:980}}>
          <div ref={slideRef} onClick={handleSlideClick}
            style={{width:'100%',paddingTop:'56.25%',position:'relative',background:bgGradient,borderRadius:3,
              boxShadow:'0 0 0 2px #D4AF37, 0 0 0 4px #8B6914, 0 30px 80px rgba(0,0,0,0.9)',
              overflow:'hidden',cursor:'default',userSelect:'none'}}>

            {/* Gold border bars */}
            {(['top','bottom'] as const).map(side=>(
              <div key={side} style={{position:'absolute',[side]:0,left:0,right:0,height:4,
                background:'linear-gradient(90deg,#8B6914,#D4AF37 30%,#F5D060 50%,#D4AF37 70%,#8B6914)',zIndex:10}}/>
            ))}
            {(['left','right'] as const).map(side=>(
              <div key={side} style={{position:'absolute',[side]:0,top:0,bottom:0,width:4,
                background:'linear-gradient(180deg,#8B6914,#D4AF37 30%,#F5D060 50%,#D4AF37 70%,#8B6914)',zIndex:10}}/>
            ))}

            {/* Ambient glow */}
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 35%,rgba(212,175,55,0.09) 0%,transparent 65%)',pointerEvents:'none',zIndex:1}}/>

            {/* Badge outline */}
            <div style={{position:'absolute',top:'5.5%',left:'3%',border:'2px solid #D4AF37',borderRadius:3,padding:'4px 14px',minWidth:50,zIndex:3,pointerEvents:'none'}}/>

            {/* Elements */}
            {[...elements].sort((a,b)=>a.zIndex-b.zIndex).map(el=>{
              const isSelected = selectedId===el.id;
              const isEditing  = editingId===el.id;
              const commonStyle: React.CSSProperties = {
                position:'absolute', left:`${el.x}%`, top:`${el.y}%`, width:`${el.width}%`,
                transform:'translateX(-50%)', fontSize:`${el.fontSize}px`, color:el.color,
                fontWeight:el.fontWeight, fontStyle:el.fontStyle, textDecoration:el.textDecoration,
                textAlign:el.textAlign, fontFamily:el.fontFamily, letterSpacing:`${el.letterSpacing}px`,
                lineHeight:el.lineHeight, textTransform:el.textTransform, zIndex:el.zIndex,
                boxSizing:'border-box', padding:'2px 4px',
              };
              if (isEditing) return (
                <textarea key={el.id} ref={textareaRef} value={el.text}
                  onChange={e=>update(el.id,{text:e.target.value})}
                  onBlur={()=>setEditingId(null)}
                  style={{...commonStyle,background:'rgba(0,0,0,0.6)',resize:'none',overflow:'hidden',
                    border:'2px solid #D4AF37',outline:'none',borderRadius:4,caretColor:'#D4AF37',
                    cursor:'text',minHeight:40,whiteSpace:'pre-wrap'}}
                  rows={Math.max(1,el.text.split('\n').length+1)}
                  onKeyDown={e=>{if(e.key==='Escape')setEditingId(null);}}/>
              );
              return (
                <div key={el.id}
                  onMouseDown={e=>handleElementPointerDown(e,el.id)}
                  onDoubleClick={e=>handleDoubleClick(e,el.id)}
                  style={{...commonStyle,cursor:'move',whiteSpace:'pre-wrap',wordBreak:'break-word',
                    outline:isSelected?'2px dashed rgba(212,175,55,0.85)':'none',outlineOffset:4,
                    borderRadius:2,transition:'outline 0.1s'}}>
                  {el.text}
                </div>
              );
            })}
          </div>
          <p style={{textAlign:'center',color:'#475569',fontSize:12,marginTop:14,letterSpacing:1}}>
            CLICK TO SELECT  ·  DRAG TO MOVE  ·  DOUBLE-CLICK TO EDIT  ·  TOOLBAR TO FORMAT
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-slide, #print-slide * { visibility: visible !important; }
          #print-slide { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; margin: 0 !important; padding: 0 !important; }
        }
        input[type="range"] { cursor: pointer; }
        button:disabled { opacity: 0.35; cursor: not-allowed !important; }
        textarea { resize: none; }
      `}</style>
    </div>
  );
}

function Divider() { return <div style={{width:1,height:24,background:'#2d3348',margin:'0 2px',flexShrink:0}}/>; }

function Btn({children,onClick,active,disabled,danger,title}:{children:React.ReactNode;onClick?:()=>void;active?:boolean;disabled?:boolean;danger?:boolean;title?:string}) {
  return (
    <button title={title} onClick={onClick} disabled={disabled}
      style={{background:active?'#D4AF37':'transparent',color:danger?'#f87171':active?'#0a0a0a':'#94a3b8',
        border:'none',borderRadius:5,padding:'5px 7px',cursor:'pointer',display:'flex',alignItems:'center',
        justifyContent:'center',transition:'background 0.12s,color 0.12s'}}>
      {children}
    </button>
  );
}

function SmallBtn({children,onClick,disabled}:{children:React.ReactNode;onClick?:()=>void;disabled?:boolean}) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{background:'#2d3348',color:'#e2e8f0',border:'1px solid #3d4465',borderRadius:5,width:26,height:26,cursor:'pointer',fontWeight:700,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
      {children}
    </button>
  );
}

function PropRow({label,children}:{label:string;children:React.ReactNode}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      <span style={{color:'#8892b0',fontSize:11,whiteSpace:'nowrap'}}>{label}</span>
      {children}
    </div>
  );
}
