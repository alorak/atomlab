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
const RAW = String.raw`1|H|Hidrojen
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
118|Og|Oganesson`;

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
  return `--color:${p[0]};--light:${p[1]};--chip:${p[2]};`;
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

// Shell electron counts, Z=1..118; based on Bowserinator/Periodic-Table-JSON (CC BY-SA 3.0).

// Heavy-element shell configurations may be theoretical; card diagrams are educational models.

const SHELLS_BY_Z = [null,[1],[2],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,8,1],[2,8,2],[2,8,3],[2,8,4],[2,8,5],[2,8,6],[2,8,7],[2,8,8],[2,8,8,1],[2,8,8,2],[2,8,9,2],[2,8,10,2],[2,8,11,2],[2,8,13,1],[2,8,13,2],[2,8,14,2],[2,8,15,2],[2,8,16,2],[2,8,18,1],[2,8,18,2],[2,8,18,3],[2,8,18,4],[2,8,18,5],[2,8,18,6],[2,8,18,7],[2,8,18,8],[2,8,18,8,1],[2,8,18,8,2],[2,8,18,9,2],[2,8,18,10,2],[2,8,18,12,1],[2,8,18,13,1],[2,8,18,13,2],[2,8,18,15,1],[2,8,18,16,1],[2,8,18,18],[2,8,18,18,1],[2,8,18,18,2],[2,8,18,18,3],[2,8,18,18,4],[2,8,18,18,5],[2,8,18,18,6],[2,8,18,18,7],[2,8,18,18,8],[2,8,18,18,8,1],[2,8,18,18,8,2],[2,8,18,18,9,2],[2,8,18,19,9,2],[2,8,18,21,8,2],[2,8,18,22,8,2],[2,8,18,23,8,2],[2,8,18,24,8,2],[2,8,18,25,8,2],[2,8,18,25,9,2],[2,8,18,27,8,2],[2,8,18,28,8,2],[2,8,18,29,8,2],[2,8,18,30,8,2],[2,8,18,31,8,2],[2,8,18,32,8,2],[2,8,18,32,9,2],[2,8,18,32,10,2],[2,8,18,32,11,2],[2,8,18,32,12,2],[2,8,18,32,13,2],[2,8,18,32,14,2],[2,8,18,32,15,2],[2,8,18,32,17,1],[2,8,18,32,18,1],[2,8,18,32,18,2],[2,8,18,32,18,3],[2,8,18,32,18,4],[2,8,18,32,18,5],[2,8,18,32,18,6],[2,8,18,32,18,7],[2,8,18,32,18,8],[2,8,18,32,18,8,1],[2,8,18,32,18,8,2],[2,8,18,32,18,9,2],[2,8,18,32,18,10,2],[2,8,18,32,20,9,2],[2,8,18,32,21,9,2],[2,8,18,32,22,9,2],[2,8,18,32,24,8,2],[2,8,18,32,25,8,2],[2,8,18,32,25,9,2],[2,8,18,32,27,8,2],[2,8,18,32,28,8,2],[2,8,18,32,29,8,2],[2,8,18,32,30,8,2],[2,8,18,32,31,8,2],[2,8,18,32,32,8,2],[2,8,18,32,32,8,3],[2,8,18,32,32,10,2],[2,8,18,32,32,11,2],[2,8,18,32,32,12,2],[2,8,18,32,32,13,2],[2,8,18,32,32,14,2],[2,8,18,32,32,15,2],[2,8,18,32,32,16,2],[2,8,18,32,32,17,2],[2,8,18,32,32,18,2],[2,8,18,32,32,18,3],[2,8,18,32,32,18,4],[2,8,18,32,32,18,5],[2,8,18,32,32,18,6],[2,8,18,32,32,18,7],[2,8,18,32,32,18,8]];

let selected="H";

function shellInfo(e){
  const known=CARD_INFO[e.symbol];
  if(known)return known;
  return {shells:SHELLS_BY_Z[e.z],group:groupOf(e.z),type:categoryLabel(e.z),virtual:true};
}

function groupOf(z){
  for(const row of mainRows){
    const idx=row.indexOf(z);
    if(idx!==-1)return idx+1;
  }
  return null;
}

function categoryLabel(z){
  const className=family(z);
  return {nonmetal:"Ametal",metalloid:"Yarımetal",noble:"Soygaz",alkali:"Alkali metal",alkaline:"Toprak alkali metal",post:"Metal",transition:"Geçiş metali",dblock:"d-blok metali",lanth:"Lantanit",act:"Aktinit"}[className]||"Metal";
}

function gridPosition(node,column,row){node.style.gridColumn=String(column);node.style.gridRow=String(row);}

function putLabel(root,label,column,row,classname){
  const node=document.createElement("span");
  node.textContent=label;node.className=classname;
  gridPosition(node,column,row);root.append(node);
}

function cellFor(z,column,row){
  const e=elements[z],available=ACTIVE.has(e.symbol);
  const node=document.createElement("button");
  node.type="button";
  node.className="cell "+(available?"available":"unavailable");
  node.style.cssText=varsFor(z);
  node.title=`${e.z} · ${e.name} · ${available?"Kart setinde":"Sanal kart"}`;
  node.setAttribute("aria-label",`${e.name}, ${available?"fiziksel":"sanal"} atom kartını göster`);
  node.setAttribute("aria-pressed","false");
  node.dataset.search=`${e.z} ${e.symbol} ${e.name}`.toLocaleLowerCase("tr-TR");
  node.dataset.element=e.symbol;
  gridPosition(node,column,row);
  node.innerHTML=`<span class="num">${e.z}</span><span class="sym">${e.symbol}</span><span class="name">${e.name}</span>`;
  node.addEventListener("click",()=>selectElement(e.symbol));
  return node;
}

function buildPeriodic(){
  const root=document.getElementById("periodic-grid");
  for(let col=1;col<=18;col++)putLabel(root,String(col),col,1,"group-label");
  for(let row=0;row<7;row++){
    mainRows[row].forEach((value,col)=>{
      if(typeof value==="number")root.append(cellFor(value,col+1,row+2));
      else if(typeof value==="string"){
        const p=document.createElement("div");
        p.className="cell placeholder";
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
  document.querySelectorAll("#periodic-grid .cell[data-element]").forEach(node=>{
    const match=!q||node.dataset.search.includes(q);
    const mutedByFilter=only&&node.classList.contains("unavailable");
    node.classList.toggle("faded",!match||mutedByFilter);
    node.classList.toggle("match",Boolean(q&&match));
  });
}

function selectElement(symbol){
  if(!bySymbol[symbol])return;
  selected=symbol;
  renderAtom();
  if(window.innerWidth<=790){
    document.getElementById("inspector").scrollIntoView({block:"start",behavior:"smooth"});
  }
}

function shellSvg(e,info,color){
  const shells=info.shells;
  const outer=89, center=110;
  const ringCount=shells.length-1;
  // Keep the first-shell electron pair outside the symbol and distribute
  // subsequent shells evenly between the nucleus and the valence ring.
  // In particular, Si / Al / Cl / Ar use radii 41, 65, 89 (outer).
  const innerShellRadii=[
    [],
    [43],
    [41,65],
    [38,56,73],
    [36,49,62,75],
    [34,44,55,65,76],
    [32,41,50,59,68,77]
  ];
  const radii=innerShellRadii[ringCount];
  const rings=radii.map((r,i)=>{
    const n=shells[i];
    const size=n===2?5:n>18?2.7:n>10?3.2:4;
    const pts=Array.from({length:n},(_,j)=>{
      const a=n===2?Math.PI*j:-Math.PI/2+(2*Math.PI*j/n);
      return `<circle cx="${(center+r*Math.cos(a)).toFixed(2)}" cy="${(center+r*Math.sin(a)).toFixed(2)}" r="${size}" fill="#7999ad" opacity="${n===2?".88":".78"}"/>`;
    }).join("");
    return `<circle cx="${center}" cy="${center}" r="${r.toFixed(2)}" stroke="#9db1bf" stroke-width="1" stroke-dasharray="3 4" fill="none" opacity=".68"/>${pts}`;
  }).join("");
  const outerCount=shells.at(-1);
  const positions=e.z<=2?[[-outer,0],[outer,0]]:outerCount<=8?[
    [-63,-63],[-84,-29],[-84,29],[-63,63],
    [63,-63],[84,-29],[84,29],[63,63]
  ]:Array.from({length:outerCount},(_,i)=>[
    outer*Math.cos(-Math.PI/2+i*2*Math.PI/outerCount),
    outer*Math.sin(-Math.PI/2+i*2*Math.PI/outerCount)
  ]);
  const size=outerCount>8?3.8:7;
  const dots=positions.map(([x,y],i)=>`<circle cx="${(center+x).toFixed(2)}" cy="${(center+y).toFixed(2)}" r="${size}" fill="${i<outerCount?color:"#fff"}" stroke="${color}" stroke-width="${outerCount>8?1.4:2.3}"/>`).join("");
  return `<svg viewBox="0 0 220 220" role="img" aria-label="${e.name} için elektron kabukları: ${shells.join("–")}">
    <circle cx="${center}" cy="${center}" r="${outer}" fill="none" stroke="${color}" stroke-width="1.5" opacity=".55"/>
    <circle cx="${center}" cy="${center}" r="25" fill="${color}" opacity=".12"/>
    ${rings}
    <text x="110" y="119" text-anchor="middle" font-size="${e.symbol.length>1?34:43}" font-weight="750" fill="${color}">${e.symbol}</text>
    ${dots}
  </svg>`;
}

function renderAtom(){
  const e=bySymbol[selected],info=shellInfo(e);
  const virtual=!ACTIVE.has(selected);
  const root=document.getElementById("atom-preview");
  const status=document.getElementById("card-status");
  status.classList.toggle("virtual",virtual);
  status.textContent=virtual?"Sanal kart · Sette yok":"Kart setinde var";
  document.querySelectorAll("#periodic-grid .cell[data-element]").forEach(node=>{
    const active=node.dataset.element===selected;
    node.classList.toggle("selected",active);
    node.setAttribute("aria-pressed",String(active));
  });
  const groupLabel=info.group?`${info.group}. grup`:categoryLabel(e.z);
  const type=categoryLabel(e.z);
  document.getElementById("detail-title").textContent=e.name;
  document.getElementById("detail-group").textContent=groupLabel;
  document.getElementById("detail-shells").textContent=info.shells.join(" – ");
  document.getElementById("detail-type").textContent=type;
  let message=virtual?"Bu element fiziksel kart setinde yoktur. Soluk kartı yalnızca dijital inceleme için oluşturuldu.":"Bu element fiziksel Atom Laboratuvarı kart setinde bulunuyor.";
  if(["He","Ne","Ar"].includes(selected))message+=" Soygaz olduğu için temel oyunda bağ oluşturmayan örnek olarak kullanılır.";
  if(["Fe","Cu","Zn"].includes(selected))message+=" Bağlanma ve iyon yükleri yalnızca dış kabuk yuvalarıyla açıklanamaz.";
  if(e.z>=104)message+=" Ağır elementlerin bazı elektron dağılımları kuramsal tahminlere dayanır.";
  document.getElementById("detail-description").textContent=message;
  const color=palette[family(e.z)][0];
  root.innerHTML=`<article class="atom-card${virtual?" virtual":""}" style="${varsFor(e.z)}">
    <div class="card-header"><strong>${e.name}</strong><small>${groupLabel}</small><div class="card-z">${e.z}</div></div>
    <div class="diagram">${shellSvg(e,info,color)}</div>
    <div class="card-footer">${type}</div>
  </article>`;
}

function init(){
  buildPeriodic();
  renderAtom();
  document.getElementById("periodic-search").addEventListener("input",filterPeriodic);
  document.getElementById("only-available").addEventListener("change",filterPeriodic);
}

init();
