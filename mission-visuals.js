"use strict";

// Diagram coordinates are schematic, not measured molecular geometry.

const ions={"Na":"⁺","Li":"⁺","K":"⁺","Mg":"²⁺","Ca":"²⁺","Al":"³⁺","Fe":"³⁺","Cl":"⁻","F":"⁻","O":"²⁻"};

const MISSION_VISUAL_SPECS={"M01":{"kind":"covalent","nodes":[["H",100,150],["H",330,150]],"edges":[[0,1,1]],"height":300},"M02":{"kind":"covalent","nodes":[["Cl",100,150],["Cl",330,150]],"edges":[[0,1,1]],"height":300},"M03":{"kind":"covalent","nodes":[["O",100,150],["O",330,150]],"edges":[[0,1,2]],"height":300,"caption":"İki Oksijen kartı arasında iki çizgi: çift bağ, iki ortak elektron çifti."},"M04":{"kind":"covalent","nodes":[["N",100,150],["N",330,150]],"edges":[[0,1,3]],"height":300,"caption":"İki Azot kartı arasında üç çizgi: üçlü bağ, üç ortak elektron çifti."},"K01":{"kind":"covalent","nodes":[["O",215,88],["H",75,240],["H",355,240]],"edges":[[0,1,1],[0,2,1]],"height":315},"K02":{"kind":"covalent","nodes":[["C",215,200],["H",215,56],["H",72,200],["H",358,200],["H",215,345]],"edges":[[0,1,1],[0,2,1],[0,3,1],[0,4,1]],"height":415},"K03":{"kind":"covalent","nodes":[["N",215,92],["H",74,263],["H",215,265],["H",356,263]],"edges":[[0,1,1],[0,2,1],[0,3,1]],"height":345},"K04":{"kind":"covalent","nodes":[["O",65,145],["C",215,145],["O",365,145]],"edges":[[0,1,2],[1,2,2]],"height":300},"K05":{"kind":"covalent","nodes":[["H",100,150],["F",330,150]],"edges":[[0,1,1]],"height":300},"K06":{"kind":"covalent","nodes":[["H",100,150],["Cl",330,150]],"edges":[[0,1,1]],"height":300},"K07":{"kind":"covalent","nodes":[["S",215,88],["H",75,240],["H",355,240]],"edges":[[0,1,1],[0,2,1]],"height":315},"K08":{"kind":"covalent","nodes":[["P",215,92],["H",74,263],["H",215,265],["H",356,263]],"edges":[[0,1,1],[0,2,1],[0,3,1]],"height":345},"A04":{"kind":"covalent","nodes":[["B",215,92],["Cl",74,263],["Cl",215,265],["Cl",356,263]],"edges":[[0,1,1],[0,2,1],[0,3,1]],"height":345},"A01":{"kind":"network","nodes":[["O",65,145],["Si",215,145],["O",365,145]],"edges":[],"height":300},"A02":{"kind":"network","nodes":[["O",65,145],["Ge",215,145],["O",365,145]],"edges":[],"height":300},"A03":{"kind":"network","nodes":[["Si",100,150],["C",330,150]],"edges":[],"height":300},"I01":{"kind":"ionic","nodes":[["Na",102,148],["Cl",328,148]],"edges":[],"height":310},"I02":{"kind":"ionic","nodes":[["Li",102,148],["F",328,148]],"edges":[],"height":310},"I03":{"kind":"ionic","nodes":[["K",102,148],["Cl",328,148]],"edges":[],"height":310},"I04":{"kind":"ionic","nodes":[["Mg",102,148],["O",328,148]],"edges":[],"height":310},"I05":{"kind":"ionic","nodes":[["Ca",102,148],["O",328,148]],"edges":[],"height":310},"I06":{"kind":"ionic","nodes":[["Mg",68,148],["Cl",215,148],["Cl",362,148]],"edges":[],"height":310},"I07":{"kind":"ionic","nodes":[["Ca",68,148],["Cl",215,148],["Cl",362,148]],"edges":[],"height":310},"I08":{"kind":"ionic","nodes":[["Na",68,148],["O",215,148],["Na",362,148]],"edges":[],"height":310},"A05":{"kind":"ionic","nodes":[["Al",75,95],["O",215,95],["O",355,95],["Al",145,274],["O",285,274]],"edges":[],"height":380},"A06":{"kind":"ionic","nodes":[["Fe",75,95],["O",215,95],["O",355,95],["Fe",145,274],["O",285,274]],"edges":[],"height":380}};

function escSvg(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

function solutionMiniCard(sym,x,y,w,h,kind){
 const e=bySymbol[sym],valence=shellInfo(e).shells.at(-1),p=palette[family(e.z)];
 const color=p[0],light=p[1],chip=p[2],cx=w/2,head=26;
 const mid=h<=100?52:h>112?65:57;
 const slots=e.z<=2?[[-22,0],[22,0]]:[[-18,-20],[-24,-7],[-24,7],[-18,20],[18,-20],[24,-7],[24,7],[18,20]];
 const dots=slots.map(([dx,dy],i)=>`<circle cx="${cx+dx}" cy="${mid+dy}" r="3" fill="${i<valence?color:"#ffffff"}" stroke="${color}" stroke-width="1"/>`).join("");
 const cat=({nonmetal:"Ametal",metalloid:"Yarımetal",noble:"Soygaz",alkali:"Metal",alkaline:"Metal",post:"Metal",dblock:"Metal",transition:"Metal"})[family(e.z)]||"Metal";
 const name=e.name;
 const fontsize=name.length>9?8.5:11;
 const ion=kind==="ionic"?ions[sym]:null;
 const labelFont=cat.length>9?7.5:9;
 return `<g class="diagram-atom" data-symbol="${escSvg(sym)}" transform="translate(${(x-w/2).toFixed(2)} ${(y-h/2).toFixed(2)})">
 <rect width="${w}" height="${h}" rx="10" fill="${light}" stroke="${color}" stroke-width="2"/>
 <path d="M 10 1 H ${w-10} Q ${w-1} 1 ${w-1} 10 V 26 H 1 V 10 Q 1 1 10 1" fill="${color}"/>
 <text x="8" y="13" font-size="${fontsize}" font-weight="700" fill="#fff">${escSvg(name)}</text>
 <text x="8" y="23" font-size="7.7" fill="#fff">${CARD_INFO[sym]?.group||groupOf(e.z)}. grup</text>
 <circle cx="${w-12}" cy="12" r="9.5" fill="none" stroke="#ffffff" stroke-width="1"/>
 <text x="${w-12}" y="15.4" font-size="9" font-weight="700" text-anchor="middle" fill="#fff">${e.z}</text>
 <circle cx="${cx}" cy="${mid}" r="25" fill="none" stroke="${color}" stroke-width=".8" opacity=".6"/>
 <circle cx="${cx}" cy="${mid}" r="13.5" fill="${color}" opacity=".13"/>
 <text x="${cx}" y="${mid+7}" font-size="${sym.length===1?23:20}" text-anchor="middle" font-weight="700" fill="${color}">${sym}</text>
 ${dots}
 <rect x="6" y="${h-22}" width="${w-12}" height="17" rx="5" fill="${chip}"/>
 <text x="${cx}" y="${h-10}" text-anchor="middle" font-size="${labelFont}" font-weight="600" fill="#354a58">${cat}</text>
 ${ion?`<rect x="${cx-21}" y="${h+2}" width="42" height="20" rx="8" fill="#fff" stroke="${color}" stroke-width="1.2"/><text x="${cx}" y="${h+16}" font-size="13" font-weight="800" text-anchor="middle" fill="${color}">${sym}${ion}</text>`:""}
 </g>`;
}

function svgBond(from,to,order,w,h){
 const dx=to[1]-from[1],dy=to[2]-from[2],distance=Math.hypot(dx,dy),ux=dx/distance,uy=dy/distance;
 const bound=(x,y)=>Math.min((w/2+2)/(Math.abs(x)||1e-9),(h/2+2)/(Math.abs(y)||1e-9));
 const t0=bound(ux,uy),t1=bound(ux,uy);
 const ax=from[1]+ux*t0,ay=from[2]+uy*t0,bx=to[1]-ux*t1,by=to[2]-uy*t1;
 const offsets=order===1?[0]:order===2?[-5,5]:[-8,0,8];
 return offsets.map(off=>`<line x1="${(ax-uy*off).toFixed(1)}" y1="${(ay+ux*off).toFixed(1)}" x2="${(bx-uy*off).toFixed(1)}" y2="${(by+ux*off).toFixed(1)}" stroke="#60798b" stroke-width="3" stroke-linecap="round"/>`).join("");
}

function renderMissionDiagram(m){
 const spec=MISSION_VISUAL_SPECS[m.id];
 if(!spec)throw Error(`Görev çizimi yok: ${m.id}`);
 const kind=spec.kind, count=spec.nodes.length;
 const width=count<=2?90:count===3?78:72;
 const height=count<=2?122:count===3?112:100;
 const bonds=spec.edges.map(([a,b,o])=>svgBond(spec.nodes[a],spec.nodes[b],o,width,height)).join("");
 let framing="";
 if(kind==="ionic"){
   const row=spec.nodes.filter(n=>n[2]<190);
   framing=row.slice(0,-1).map((n,i)=>{
     const next=row[i+1];
     return `<text x="${(n[1]+next[1])/2}" y="${n[2]+5}" text-anchor="middle" font-size="23" fill="#8194a0">+</text>`;
   }).join("");
 }else if(kind==="network"){
   framing=spec.nodes.slice(0,-1).map((n,i)=>{
     const next=spec.nodes[i+1],x1=n[1]+width/2+6,x2=next[1]-width/2-6;
     return `<line x1="${x1}" y1="${n[2]}" x2="${x2}" y2="${next[2]}" stroke="#9fb1bd" stroke-width="2" stroke-dasharray="5 6"/>`;
   }).join("");
   framing+=`<text x="11" y="${spec.nodes[0][2]+7}" font-size="26" fill="#91a5b2">⋯</text><text x="403" y="${spec.nodes[0][2]+7}" font-size="26" fill="#91a5b2">⋯</text>`;
 }
 const cards=spec.nodes.map(([s,x,y])=>solutionMiniCard(s,x,y,width,height,kind)).join("");
 const countLabel=Object.entries(m.atoms).map(([s,n])=>`${n} ${bySymbol[s].name}`).join(", ");
 const caption=spec.caption|| (kind==="ionic"?"İyonlara dönüşen kartlar ve yüklerin dengelendiği oran gösterilir; iyonik bileşikler bağımsız molekül değildir.":kind==="network"?"Kartlar formül oranını temsil eder; kovalent ağ kristalde devam eder, tek bir molekül çizimi değildir.":"Çizgiler paylaşılan elektron çiftlerini (tekli, çiftli veya üçlü bağı) gösterir; çizim düzlemsel bir bağlantı şemasıdır.");
 return `<figure class="mission-visual" data-visual-kind="${kind}">
   <div class="mission-diagram-scroll"><svg viewBox="0 0 430 ${spec.height}" role="img" aria-label="${escSvg(m.formula)}: ${escSvg(countLabel)}; ${kind==="covalent"?"kovalent bağ çizimi":kind==="ionic"?"iyon yükleri ve oran":"kovalent ağ formül oranı"}">
   <title>${escSvg(m.name)} — kullanılan atom kartları</title>${framing}${bonds}${cards}</svg></div>
   <figcaption>${escSvg(caption)}</figcaption>
 </figure>`;
}
