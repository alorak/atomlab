"use strict";

// The same 25 selected elements used by the printable physical card set.
// 'shells' contains actual electrons per PRINCIPAL shell, not s/p orbitals.
const CARD_INFO = {
  H:  {shells:[1],group:1,type:"Ametal",level:1}, He:{shells:[2],group:18,type:"Soygaz",level:1},
  Li: {shells:[2,1],group:1,type:"Metal",level:1}, C:{shells:[2,4],group:14,type:"Ametal",level:1},
  N:  {shells:[2,5],group:15,type:"Ametal",level:1}, O:{shells:[2,6],group:16,type:"Ametal",level:1},
  F:  {shells:[2,7],group:17,type:"Ametal",level:1}, Ne:{shells:[2,8],group:18,type:"Soygaz",level:1},
  Na: {shells:[2,8,1],group:1,type:"Metal",level:1}, Mg:{shells:[2,8,2],group:2,type:"Metal",level:1},
  Cl: {shells:[2,8,7],group:17,type:"Ametal",level:1}, Ar:{shells:[2,8,8],group:18,type:"Soygaz",level:1},
  Si: {shells:[2,8,4],group:14,type:"Yarımetal",level:2}, Ge:{shells:[2,8,18,4],group:14,type:"Yarımetal",level:2},
  P:  {shells:[2,8,5],group:15,type:"Ametal",level:2}, S:{shells:[2,8,6],group:16,type:"Ametal",level:2},
  Al: {shells:[2,8,3],group:13,type:"Metal",level:2}, K:{shells:[2,8,8,1],group:1,type:"Metal",level:2},
  Ca: {shells:[2,8,8,2],group:2,type:"Metal",level:2},
  Be: {shells:[2,2],group:2,type:"Metal",level:3}, B:{shells:[2,3],group:13,type:"Yarımetal",level:3},
  Fe: {shells:[2,8,14,2],group:8,type:"Geçiş metali",level:3},
  Cu: {shells:[2,8,18,1],group:11,type:"Geçiş metali",level:3},
  Zn: {shells:[2,8,18,2],group:12,type:"Metal",level:3},
  Ga: {shells:[2,8,18,3],group:13,type:"Metal",level:3}
};
const CARD_ORDER = ["H","He","Li","C","N","O","F","Ne","Na","Mg","Cl","Ar",
 "Si","Ge","P","S","Al","K","Ca","Be","B","Fe","Cu","Zn","Ga"];

// Atomic number | symbol | Turkish element name (all 118).
const RAW = String.raw\`1|H|Hidrojen
2|He|Helyum
3|Li|Lityum
4|Be|Berilyum
5|B|Bor
6|C|Karbon
7|N|Azot
8|O|Oksijen
9|F|Flor
10|Ne|Neon
11|Na|Sodyum
12|Mg|Magnezyum
13|Al|Alüminyum
14|Si|Silisyum
15|P|Fosfor
16|S|Kükürt
17|Cl|Klor
18|Ar|Argon
19|K|Potasyum
20|Ca|Kalsiyum
21|Sc|Skandiyum
22|Ti|Titanyum
23|V|Vanadyum
24|Cr|Krom
25|Mn|Manganez
26|Fe|Demir
27|Co|Kobalt
28|Ni|Nikel
29|Cu|Bakır
30|Zn|Çinko
31|Ga|Galyum
32|Ge|Germanyum
33|As|Arsenik
34|Se|Selenyum
35|Br|Brom
36|Kr|Kripton
37|Rb|Rubidyum
38|Sr|Stronsiyum
39|Y|İtriyum
40|Zr|Zirkonyum
41|Nb|Niyobyum
42|Mo|Molibden
43|Tc|Teknesyum
44|Ru|Rutenyum
45|Rh|Rodyum
46|Pd|Paladyum
47|Ag|Gümüş
48|Cd|Kadmiyum
49|In|İndiyum
50|Sn|Kalay
51|Sb|Antimon
52|Te|Tellür
53|I|İyot
54|Xe|Ksenon
55|Cs|Sezyum
56|Ba|Baryum
57|La|Lantan
58|Ce|Seryum
59|Pr|Praseodim
60|Nd|Neodimyum
61|Pm|Prometyum
62|Sm|Samaryum
63|Eu|Evropiyum
64|Gd|Gadolinyum
65|Tb|Terbiyum
66|Dy|Disprozyum
67|Ho|Holmiyum
68|Er|Erbiyum
69|Tm|Tulyum
70|Yb|İterbiyum
71|Lu|Lutesyum
72|Hf|Hafniyum
73|Ta|Tantal
74|W|Tungsten
75|Re|Renyum
76|Os|Osmiyum
77|Ir|İridyum
78|Pt|Platin
79|Au|Altın
80|Hg|Cıva
81|Tl|Talyum
82|Pb|Kurşun
83|Bi|Bizmut
84|Po|Polonyum
85|At|Astatin
86|Rn|Radon
87|Fr|Fransiyum
88|Ra|Radyum
89|Ac|Aktinyum
90|Th|Toryum
91|Pa|Protaktinyum
92|U|Uranyum
93|Np|Neptünyum
94|Pu|Plütonyum
95|Am|Amerikyum
96|Cm|Küriyum
97|Bk|Berkelyum
98|Cf|Kaliforniyum
99|Es|Aynştaynyum
100|Fm|Fermiyum
101|Md|Mendelevyum
102|No|Nobelyum
103|Lr|Lavrensiyum
104|Rf|Rutherfordiyum
105|Db|Dubniyum
106|Sg|Seaborgiyum
107|Bh|Bohriyum
108|Hs|Hassiyum
109|Mt|Meitneriyum
110|Ds|Darmstadtiyum
111|Rg|Röntgenyum
112|Cn|Kopernikyum
113|Nh|Nihonyum
114|Fl|Flerovyum
115|Mc|Moskovyum
116|Lv|Livermoryum
117|Ts|Tennessin
118|Og|Oganesson\`;

const elements = {};
const bySymbol = {};
for (const line of RAW.split("\n")) {
  const [z, symbol, name] = line.split("|");
  const item = {z:Number(z), symbol, name};
  elements[item.z] = item; bySymbol[symbol] = item;
}
const ACTIVE = new Set(CARD_ORDER);
if(Object.keys(elements).length !== 118 || ACTIVE.size !== 25) throw Error("Element verisi eksik");
for (const symbol of CARD_ORDER) {
  const info=CARD_INFO[symbol];
  if (!info || info.shells.reduce((a,b)=>a+b,0)!==bySymbol[symbol].z) throw Error("Elektron dizilimi hatalı: "+symbol);
}

const palette = {
  nonmetal:["#5d748b","#edf3f8","#d7e3ef"], metalloid:["#657f8c","#edf5f7","#dce8ed"],
  noble:["#247f8d","#eaf6f7","#c5e9eb"], alkali:["#ac6346","#fef1e9","#f4dac9"],
  alkaline:["#a4744a","#fcf3e7","#efdfca"], post:["#956c5a","#fbf1ec","#ecd9cf"],
  transition:["#915f4f","#faefea","#ecd8d0"], dblock:["#9b715b","#faf0e9","#ead9cd"],
  lanth:["#b77a5f","#fbf0ea","#f1d9cb"], act:["#9d6a5e","#faeeea","#ead4cc"]
};
function family(z) {
  if ([2,10,18,36,54,86,118].includes(z)) return "noble";
  if ([5,14,32,33,51,52].includes(z)) return "metalloid";
  if ([1,6,7,8,9,15,16,17,34,35,53,85,117].includes(z)) return "nonmetal";
  if ([3,11,19,37,55,87].includes(z)) return "alkali";
  if ([4,12,20,38,56,88].includes(z)) return "alkaline";
  if (z>=57 && z<=71) return "lanth";
  if (z>=89 && z<=103) return "act";
  if ([13,31,49,50,81,82,83,84,113,114,115,116].includes(z)) return "post";
  if ([30,48,80,112].includes(z)) return "dblock";
  return "transition";
}
function varsFor(z) {
  const p=palette[family(z)];
  return \`--color:\${p[0]};--light:\${p[1]};--chip:\${p[2]};\`;
}
const mainRows = [
 [1,...Array(16).fill(null),2],
 [3,4,...Array(10).fill(null),5,6,7,8,9,10],
 [11,12,...Array(10).fill(null),13,14,15,16,17,18],
 Array.from({length:18},(_,i)=>19+i),
 Array.from({length:18},(_,i)=>37+i),
 [55,56,"lanth",...Array.from({length:15},(_,i)=>72+i)],
 [87,88,"act",...Array.from({length:15},(_,i)=>104+i)]
];

let selected="H";
function gridPosition(node,column,row){node.style.gridColumn=String(column);node.style.gridRow=String(row);}
function putLabel(root,label,column,row,classname) {
  const node=document.createElement("span");node.textContent=label;node.className=classname;
  gridPosition(node,column,row);root.append(node);
}
function cellFor(z,column,row) {
  const e=elements[z], isAvailable=ACTIVE.has(e.symbol);
  const node=document.createElement(isAvailable?"button":"div");
  if (isAvailable) {node.type="button";node.addEventListener("click",()=>openAtom(e.symbol));}
  node.className="cell "+(isAvailable?"available":"unavailable");
  node.style.cssText=varsFor(z);
  node.title=\`\${e.z} · \${e.name}\`+(isAvailable?" · Kartını aç":" · Kart setinde yok");
  if (isAvailable) node.setAttribute("aria-label",e.name+" atom kartını aç");
  node.dataset.search=\`\${e.z} \${e.symbol} \${e.name}\`.toLocaleLowerCase("tr-TR");
  gridPosition(node,column,row);
  node.innerHTML=\`<span class="num">\${e.z}</span><span class="sym">\${e.symbol}</span><span class="name">\${e.name}</span>\`;
  return node;
}
function buildPeriodic(){
  const root=document.getElementById("periodic-grid");
  for(let col=1;col<=18;col++)putLabel(root,String(col),col,1,"group-label");
  for(let row=0;row<7;row++){
    mainRows[row].forEach((value,col)=>{
      if (typeof value==="number") root.append(cellFor(value,col+1,row+2));
      else if(typeof value==="string"){
        const p=document.createElement("div");p.className="cell placeholder";
        p.innerHTML=value==="lanth"?"57–71<br>Lantanit":"89–103<br>Aktinit";
        gridPosition(p,col+1,row+2);root.append(p);
      }
    });
  }
  [["Lantanit",57,10],["Aktinit",89,11]].forEach(([label,start,row])=>{
    putLabel(root,label,1,row,"fblock-label");
    for(let i=0;i<15;i++)root.append(cellFor(start+i,i+4,row));
  });
}
function filterPeriodic(){
  const q=document.getElementById("periodic-search").value.trim().toLocaleLowerCase("tr-TR");
  const only=document.getElementById("only-available").checked;
  document.querySelectorAll("#periodic-grid .cell[data-search]").forEach(node=>{
    const match=!q||node.dataset.search.includes(q);
    node.classList.toggle("faded",!match||(only&&!node.classList.contains("available")));
    node.classList.toggle("match",Boolean(q&&match));
  });
}
function switchPage(page){
  document.querySelectorAll(".page").forEach(n=>n.classList.toggle("active",n.id==="page-"+page));
  document.querySelectorAll(".nav-item").forEach(n=>{
    const active=n.dataset.page===page;
    n.classList.toggle("active",active);
    if(active)n.setAttribute("aria-current","page");else n.removeAttribute("aria-current");
  });
  location.hash=page==="atoms"?"atomlar":"periyodik-tablo";
}
function openAtom(symbol) {
  selected=symbol; renderAtom();
  switchPage("atoms");
  document.querySelector(".site-header").scrollIntoView({behavior:"smooth",block:"start"});
}
function createSelector(){
 const root=document.getElementById("atom-selector");
 const frag=document.createDocumentFragment();
 for(const symbol of CARD_ORDER){
   const e=bySymbol[symbol],b=document.createElement("button");
   b.className="atom-choice";b.type="button";b.dataset.element=symbol;
   b.style.cssText=varsFor(e.z);b.innerHTML=\`<strong>\${symbol}</strong><small>\${e.name}</small>\`;
   b.addEventListener("click",()=>{selected=symbol;renderAtom();});
   frag.append(b);
 }
 root.append(frag);
}
function shellSvg(e,info,color) {
  const shells=info.shells, count=shells.length, outer=85;
  const radii=count===1?[]:count===2?[43]:count===3?[29,56]:[24,41,61];
  const rings=radii.map((r,i)=>{
    const n=shells[i];
    const pts=Array.from({length:n},(_,j)=>{
      const a=-Math.PI/2+2*Math.PI*j/n;
      const px=n===2?(j===0?-r:r):r*Math.cos(a);
      const py=n===2?0:r*Math.sin(a);
      return \`<circle cx="\${110+px}" cy="\${110+py}" r="\${n>12?2.8:3.6}" fill="#91a8b9" opacity=".65"/>\`;
    }).join("");
    return \`<circle cx="110" cy="110" r="\${r}" stroke="#9aafbf" stroke-width="1" stroke-dasharray="3 4" fill="none" opacity=".7"/>\${pts}\`;
  }).join("");
  const positions=e.z<=2?[[-outer,0],[outer,0]]:[127,160,200,233,53,20,-20,-53].map(a=>[outer*Math.cos(a*Math.PI/180),-outer*Math.sin(a*Math.PI/180)]);
  const dots=positions.map(([x,y],i)=>\`<circle cx="\${110+x}" cy="\${110+y}" r="7" fill="\${i<shells.at(-1)?color:"#fff"}" stroke="\${color}" stroke-width="2.3"/>\`).join("");
  return \`<svg viewBox="0 0 220 220" aria-label="\${e.name} için elektron kabukları \${shells.join("–")}" role="img">
    <circle cx="110" cy="110" r="\${outer}" fill="none" stroke="\${color}" stroke-width="1.4" opacity=".55"/>
    <circle cx="110" cy="110" r="25" fill="\${color}" opacity=".12"/>
    \${rings}
    <text x="110" y="119" font-size="\${e.symbol.length>1?34:43}" text-anchor="middle" font-weight="750" fill="\${color}">\${e.symbol}</text>
    \${dots}</svg>\`;
}
function cardFooter(e,info) {
  const familyName=family(e.z);
  return ({alkali:"Alkali metal",alkaline:"Toprak alkali metal",post:"Geçiş sonrası metal",transition:"Geçiş metali",dblock:"d-blok metali"})[familyName]||info.type;
}
function renderAtom(){
  const e=bySymbol[selected], info=CARD_INFO[selected];
  document.querySelectorAll(".atom-choice").forEach(b=>{
    const active=b.dataset.element===selected;
    b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));
  });
  document.getElementById("detail-title").textContent=e.name;
  document.getElementById("detail-number").textContent=e.z;
  document.getElementById("detail-group").textContent=info.group+". grup";
  document.getElementById("detail-shells").textContent=info.shells.join(" – ");
  document.getElementById("detail-type").textContent=cardFooter(e,info);
  let explanation=\`\${e.name}, \${info.group}. grupta bulunur; atomunda \${e.z} elektron vardır. Dış kabuğunda \${info.shells.at(-1)} elektron gösteriliyor.\`;
  if(["He","Ne","Ar"].includes(selected)) explanation+=" Soygazdır; dış kabuğu doludur ve temel oyunda genellikle bağ yapmayan örnek olarak kullanılır.";
  else if(["Fe","Cu","Zn"].includes(selected)) explanation+=" d elektronları nedeniyle basit oktet/bağ yuvası modeli, iyon yüklerini tek başına açıklamaz.";
  else if(["B","Be"].includes(selected)) explanation+=" Bu elementin bazı bileşikleri basit oktet kuralının istisnalarını gösterebilir.";
  document.getElementById("detail-description").textContent=explanation;
  const root=document.getElementById("atom-preview");
  const name=e.name,color=palette[family(e.z)][0];
  root.innerHTML=\`<article class="atom-card" style="\${varsFor(e.z)}">
    <div class="card-header"><strong>\${name}</strong><small>\${info.group}. grup</small><div class="card-z">\${e.z}</div></div>
    <div class="diagram">\${shellSvg(e,info,color)}</div>
    <div class="card-footer">\${cardFooter(e,info)}</div></article>\`;
}
function init(){
  buildPeriodic();createSelector();renderAtom();
  document.getElementById("periodic-search").addEventListener("input",filterPeriodic);
  document.getElementById("only-available").addEventListener("change",filterPeriodic);
  document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>switchPage(b.dataset.page)));
  if(location.hash==="#atomlar")switchPage("atoms");
}
init();
