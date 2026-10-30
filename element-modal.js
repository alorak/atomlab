"use strict";

// Element detail dialog for all 118 elements. Full content is curated only
// for the 25 card elements (element-details.js); others get a short notice.

function naturalOccurrence(z){
  if(z>=95)return "Doğada bulunmaz; nükleer reaktörlerde veya parçacık hızlandırıcılarında yapay olarak üretilir. En ağır olanlar yalnızca birkaç atom hâlinde ve çok kısa ömürlü elde edilmiştir.";
  if(z===93||z===94)return "Uranyum cevherlerinde yalnızca eser miktarda doğal olarak bulunur; kullanılanların neredeyse tamamı nükleer reaktörlerde üretilir.";
  if(z===43||z===61)return "Kararlı izotopu yoktur; doğada yalnızca uranyum cevherlerinde eser miktarda bulunur. Kullanılanlar yapay olarak üretilir.";
  if(z===90||z===92)return "Radyoaktiftir; Dünya oluştuğundan beri kayaçlarda bulunur ve yavaşça bozunarak gezegenin iç ısısına katkıda bulunur.";
  if(z>=84&&z<=91)return "Radyoaktiftir; doğada yalnızca uranyum ve toryumun bozunmasıyla oluşan eser miktarlarda bulunur.";
  return null;
}

function missionsUsing(symbol){
  return (window.ATOMLAB_MISSIONS||[]).filter(m=>m.atoms[symbol]);
}

function elementLink(symbol){
  const e=bySymbol[symbol];
  return `<button type="button" class="element-link" data-element="${symbol}" style="${varsFor(e.z)}" title="${e.name} detayları">${symbol}</button>`;
}

function detailSection(title,body){
  return `<section class="detail-section"><h3>${title}</h3>${body}</section>`;
}

function renderElementDetails(symbol){
  const e=bySymbol[symbol],info=shellInfo(e),data=(window.ATOMLAB_ELEMENT_DETAILS||{})[symbol];
  const virtual=!ACTIVE.has(symbol);
  const groupLabel=info.group?`${info.group}. grup`:categoryLabel(e.z);
  const type=categoryLabel(e.z),color=palette[family(e.z)][0];
  const facts=[
    data&&["Atom kütlesi",data.mass],
    data&&["Oda sıcaklığında",data.phase],
    ["Elektron dağılımı",info.shells.join(" – ")],
    ["Grup",groupLabel]
  ].filter(Boolean).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  let sections="";
  if(data){
    const partners=data.partners.map(([symbols,text])=>`<li><span class="partner-atoms">${symbols.map(elementLink).join("")}</span><span>${text}</span></li>`).join("");
    sections+=detailSection("Evrende nerede, nasıl oluşur?",`<p>${data.universe}</p>`);
    sections+=detailSection("Dünya'da nerede bulunur?",`<p>${data.earth}</p>`);
    sections+=detailSection("Doğada hangi formda?",`<p>${data.forms}</p>`);
    sections+=detailSection("Sık birlikte bulunduğu atomlar",`${data.partnersNote?`<p class="partner-note">${data.partnersNote}</p>`:""}<ul class="partner-list">${partners}</ul>`);
    sections+=detailSection("Canlılarda ve günlük hayatta",`<p>${data.life}</p>`);
    if(data.fact)sections+=detailSection("Biliyor muydun?",`<p>${data.fact}</p>`);
  }else{
    const nature=naturalOccurrence(e.z);
    if(nature)sections+=detailSection("Doğada bulunuşu",`<p>${nature}</p>`);
    sections+=`<p class="detail-note">Bu element fiziksel kart setinde yer almıyor. Ayrıntılı bulunuş ve kullanım bilgileri şimdilik kart setindeki 25 element için hazırlandı.</p>`;
  }
  const missions=missionsUsing(symbol);
  if(missions.length){
    const links=missions.map(m=>`<button type="button" class="mission-link" data-mission="${m.id}" data-stage="${m.stage}"><small>${m.id}</small> ${m.name} <b>${m.formula}</b></button>`).join("");
    sections+=detailSection("Görevlerde",`<div class="mission-links">${links}</div>`);
  }
  return `<div class="element-detail" style="${varsFor(e.z)}">
    <header class="element-dialog-header">
      <div class="dialog-symbol">${e.symbol}</div>
      <div><h2 id="element-dialog-title">${e.name}</h2><p>${e.z} · ${type} · ${virtual?"Sanal kart":"Kart setinde var"}</p></div>
      <button type="button" class="dialog-close" data-close aria-label="Kapat">×</button>
    </header>
    <div class="element-dialog-body">
      <div class="dialog-side">
        <article class="atom-card${virtual?" virtual":""}">
          <div class="card-header"><strong>${e.name}</strong><small>${groupLabel}</small><div class="card-z">${e.z}</div></div>
          <div class="diagram">${shellSvg(e,info,color)}</div>
          <div class="card-footer">${type}</div>
        </article>
        <dl class="atom-facts">${facts}</dl>
      </div>
      <div class="dialog-main">
        ${sections}
        <p class="detail-sources">${data?"Bolluk değerleri yaklaşık ve yuvarlanmıştır (kaynaklar: RSC Periyodik Tablo, USGS, CRC Handbook). ":""}Elektron kabukları öğretici şemadır; noktalar elektronların gerçek konumları değildir.</p>
      </div>
    </div>
  </div>`;
}

function openElementModal(symbol){
  const dialog=document.getElementById("element-dialog");
  if(!dialog||!bySymbol[symbol])return;
  dialog.innerHTML=renderElementDetails(symbol);
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
  dialog.querySelector(".dialog-close").focus();
}

function initElementModal(){
  const dialog=document.getElementById("element-dialog");
  dialog.addEventListener("click",event=>{
    if(event.target===dialog||event.target.closest("[data-close]"))return dialog.close();
    const atom=event.target.closest(".element-link[data-element]");
    if(atom)return selectElement(atom.dataset.element,{details:true});
    const mission=event.target.closest("[data-mission]");
    if(mission){
      dialog.close();
      switchLabView("missions");
      showMission(Number(mission.dataset.stage),mission.dataset.mission);
    }
  });
  document.getElementById("open-details").addEventListener("click",()=>openElementModal(selected));
  document.getElementById("periodic-grid").addEventListener("dblclick",event=>{
    const cell=event.target.closest("[data-element]");
    if(cell)openElementModal(cell.dataset.element);
  });
}

initElementModal();
