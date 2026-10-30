"use strict";

// Cosmic origin of Solar System elements, simplified after Jennifer Johnson's
// "Origin of the elements in the Solar System" periodic table. Each element
// lists its sources, dominant first; shares in the table are schematic.
// Categorical colors come from a CVD-validated palette (order matters).
window.ATOMLAB_ORIGIN_SOURCES={
  bb:{label:"Büyük Patlama",color:"#2a78d6",note:"Evrenin ilk dakikalarında oluştu."},
  cosmic:{label:"Kozmik ışınlar",color:"#e87ba4",note:"Uzaydaki hızlı parçacıklar ağır çekirdekleri parçalayarak üretti."},
  lowmass:{label:"Ölen küçük kütleli yıldızlar",color:"#eda100",note:"Güneş benzeri yıldızlar yaşlanıp dev olduklarında yavaş nötron yakalamayla üretti."},
  massive:{label:"Patlayan büyük kütleli yıldızlar",color:"#1baf7a",note:"Büyük kütleli yıldızların içinde ve süpernova patlamalarında oluştu."},
  wd:{label:"Patlayan beyaz cüceler",color:"#eb6834",note:"Beyaz cüce yıldızların termonükleer patlamalarında (Tip Ia süpernova) oluştu."},
  neutron:{label:"Nötron yıldızı çarpışmaları",color:"#6250d6",note:"Hızlı nötron yakalama (r-süreci) ile oluştu; bir kısmı nadir süpernova türlerinden de gelebilir."},
  decay:{label:"Kararsız: yıldızlardan kalan yok",color:"#8c8178",note:"Yıldızlarda oluşmuş olsa bile çoktan bozundu; Dünya'daki eser miktarı uranyum ve toryumdan sonradan oluşur."},
  synthetic:{label:"Yapay: insan yapımı",color:"#a9b0b7",note:"Doğada bulunmaz; laboratuvarlarda üretildi."}
};

window.ATOMLAB_ORIGINS=(()=>{
  const spec=String.raw`H bb|He bb|Li lowmass bb cosmic|Be cosmic|B cosmic massive|C lowmass massive|N lowmass massive|O massive|F lowmass massive|Ne massive
Na massive|Mg massive|Al massive|Si massive wd|P massive|S massive wd|Cl massive|Ar massive wd|K massive|Ca massive wd
Sc massive|Ti massive wd|V wd massive|Cr wd massive|Mn wd massive|Fe wd massive|Co massive wd|Ni wd massive|Cu massive|Zn massive
Ga massive lowmass|Ge massive lowmass|As massive neutron|Se massive neutron|Br neutron massive|Kr massive lowmass|Rb lowmass neutron|Sr lowmass massive|Y lowmass neutron|Zr lowmass neutron
Nb lowmass neutron|Mo lowmass neutron|Tc decay|Ru neutron lowmass|Rh neutron lowmass|Pd neutron lowmass|Ag neutron lowmass|Cd lowmass neutron|In lowmass neutron|Sn lowmass neutron
Sb neutron lowmass|Te neutron lowmass|I neutron|Xe neutron lowmass|Cs neutron lowmass|Ba lowmass neutron|La lowmass neutron|Ce lowmass neutron|Pr lowmass neutron|Nd lowmass neutron
Pm decay|Sm neutron lowmass|Eu neutron|Gd neutron lowmass|Tb neutron|Dy neutron lowmass|Ho neutron|Er neutron lowmass|Tm neutron lowmass|Yb neutron lowmass
Lu neutron lowmass|Hf lowmass neutron|Ta lowmass neutron|W lowmass neutron|Re neutron|Os neutron lowmass|Ir neutron|Pt neutron|Au neutron|Hg lowmass neutron
Tl lowmass neutron|Pb lowmass neutron|Bi neutron lowmass|Po decay|At decay|Rn decay|Fr decay|Ra decay|Ac decay|Th neutron
Pa decay|U neutron|Np decay|Pu decay|Am synthetic|Cm synthetic|Bk synthetic|Cf synthetic|Es synthetic|Fm synthetic
Md synthetic|No synthetic|Lr synthetic|Rf synthetic|Db synthetic|Sg synthetic|Bh synthetic|Hs synthetic|Mt synthetic|Ds synthetic
Rg synthetic|Cn synthetic|Nh synthetic|Fl synthetic|Mc synthetic|Lv synthetic|Ts synthetic|Og synthetic`;
  const map={};
  for(const item of spec.split(/[|\n]/)){
    const [symbol,...sources]=item.trim().split(" ");
    map[symbol]=sources;
  }
  return map;
})();

// Schematic shares: the dominant source always takes the largest band.
const ORIGIN_SHARES=[[100],[65,35],[50,30,20]];

function originTint(hex,amount=.24){
  const n=parseInt(hex.slice(1),16),mix=c=>Math.round(255-(255-c)*amount);
  return "#"+[n>>16,n>>8&255,n&255].map(c=>mix(c).toString(16).padStart(2,"0")).join("");
}

function originBands(sources,colorOf){
  const shares=ORIGIN_SHARES[sources.length-1];
  let at=0;
  return "linear-gradient(90deg,"+sources.map((s,i)=>{
    const from=at;at+=shares[i];
    return `${colorOf(s)} ${from}% ${at}%`;
  }).join(",")+")";
}

function originStyle(symbol){
  const sources=window.ATOMLAB_ORIGINS[symbol],all=window.ATOMLAB_ORIGIN_SOURCES;
  const bar=originBands(sources,s=>all[s].color);
  const bg=sources[0]==="synthetic"
    ?"repeating-linear-gradient(135deg,#f3f4f6 0 4px,#e2e5e8 4px 8px)"
    :originBands(sources,s=>originTint(all[s].color));
  return {bar,bg};
}

function originLabels(symbol){
  return window.ATOMLAB_ORIGINS[symbol].map(s=>window.ATOMLAB_ORIGIN_SOURCES[s].label);
}

function renderOriginLegend(){
  const items=Object.values(window.ATOMLAB_ORIGIN_SOURCES).map(source=>`<span><i class="swatch" style="background:${source.color}"></i>${source.label}</span>`).join("");
  return `${items}<span class="legend-muted">Birden çok renk: birden çok kaynak; soldaki renk baskın kaynaktır, paylar şematiktir. Kaynak: J. Johnson, Güneş Sistemi'ndeki elementlerin kökeni.</span>`;
}

function setColorMode(mode){
  const origin=mode==="origin";
  document.getElementById("periodic-grid").classList.toggle("origin-mode",origin);
  document.getElementById("legend-family").hidden=origin;
  document.getElementById("legend-origin").hidden=!origin;
  document.querySelectorAll("[data-color-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.colorMode===mode)));
  document.querySelectorAll("#periodic-grid .cell[data-element]").forEach(node=>{
    const e=bySymbol[node.dataset.element];
    node.dataset.baseTitle??=node.title;
    node.title=origin?`${e.z} · ${e.name} · Köken: ${originLabels(e.symbol).join(", ")}`:node.dataset.baseTitle;
  });
}

function initCosmicOrigin(){
  document.querySelectorAll("#periodic-grid .cell[data-element]").forEach(node=>{
    const {bar,bg}=originStyle(node.dataset.element);
    node.style.setProperty("--origin-bar",bar);
    node.style.setProperty("--origin-bg",bg);
  });
  document.getElementById("legend-origin").innerHTML=renderOriginLegend();
  document.querySelectorAll("[data-color-mode]").forEach(b=>b.addEventListener("click",()=>setColorMode(b.dataset.colorMode)));
}

initCosmicOrigin();
