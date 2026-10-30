const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(root,f),"utf8");
const atomSrc=read("app.js"),detailSrc=read("element-details.js"),modalSrc=read("element-modal.js");
const missionSrc=read("missions.js"),html=read("index.html");

const atomAPI=new Function(atomSrc.replace(/init\(\);\s*$/,"return {bySymbol,shellInfo,shellSvg,palette,family,varsFor,categoryLabel,ACTIVE,CARD_ORDER};"))();
const win={};
new Function("window",missionSrc.replace(/initMissions\(\);\s*$/,""))(win);
new Function("window",detailSrc)(win);
const details=win.ATOMLAB_ELEMENT_DETAILS;
const modal=new Function("window","bySymbol","shellInfo","shellSvg","palette","family","varsFor","categoryLabel","ACTIVE",
  modalSrc.replace(/initElementModal\(\);\s*$/,"return {renderElementDetails,missionsUsing};")
)(win,atomAPI.bySymbol,atomAPI.shellInfo,atomAPI.shellSvg,atomAPI.palette,atomAPI.family,atomAPI.varsFor,atomAPI.categoryLabel,atomAPI.ACTIVE);

// Curated content exists for all 118 elements.
assert.equal(Object.keys(details).length,118);
for(const symbol of Object.keys(atomAPI.bySymbol)){
  const d=details[symbol],z=atomAPI.bySymbol[symbol].z;
  assert.ok(d,"missing details "+symbol);
  for(const key of ["mass","phase","life","fact"])assert.ok(typeof d[key]==="string"&&d[key].length>0,symbol+" "+key);
  assert.match(d.mass,/^(\d+,\d+|\[\d+\])$/,symbol+" mass");
  assert.match(d.phase,/^(Katı|Sıvı|Gaz|Bilinmiyor)/,symbol+" phase");
  // Natural elements describe where they occur; synthetic ones (Z≥95) how they are made.
  if(z>=95){
    assert.ok(d.made&&!d.universe&&!d.earth,symbol+" synthetic");
    assert.ok(d.mass.startsWith("["),symbol+" synthetic mass");
  }else{
    for(const key of ["universe","earth","forms"])assert.ok(typeof d[key]==="string"&&d[key].length>0,symbol+" "+key);
    assert.ok(!d.made,symbol+" is natural");
    assert.ok(d.partners.length>=1,symbol+" partners");
  }
  for(const [symbols,text] of d.partners||[]){
    assert.ok(symbols.length>=1&&text,symbol+" partner entry");
    for(const s of symbols)assert.ok(atomAPI.bySymbol[s],symbol+" unknown partner "+s);
  }
}
for(const [symbol,phase] of [["Br","Sıvı"],["Hg","Sıvı"],["Xe","Gaz"],["Rn","Gaz"],["W","Katı"]])assert.equal(details[symbol].phase,phase,symbol);
for(const noble of ["He","Ne","Ar","Kr","Rn"])assert.ok(details[noble].partnersNote.includes("bağ yapmaz"),noble+" must not imply bonding");

// Rendered dialog: curated sections, clickable partner atoms and mission links.
const fe=modal.renderElementDetails("Fe");
for(const text of ["Evrende nerede","Dünya'da nerede","Doğada hangi formda","Sık birlikte bulunduğu atomlar","Canlılarda ve günlük hayatta","Hematit","55,845"])assert.ok(fe.includes(text),"Fe dialog missing "+text);
assert.ok(fe.includes('class="element-link" data-element="O"'),"partner atoms must be buttons");
assert.ok(fe.includes('data-mission="A06" data-stage="4"'),"Fe must link to Fe₂O₃ mission");
assert.ok(fe.includes('id="element-dialog-title"'));
assert.ok(fe.includes('<article class="atom-card">'));
// Mission links are derived from mission data, not typed by hand.
for(const symbol of atomAPI.CARD_ORDER){
  const expected=win.ATOMLAB_MISSIONS.filter(m=>m.atoms[symbol]).length;
  assert.equal((modal.renderElementDetails(symbol).match(/data-mission=/g)||[]).length,expected,symbol+" mission links");
}
assert.equal(modal.missionsUsing("H").length,8);
assert.ok(!modal.renderElementDetails("Ne").includes("Görevlerde"),"no empty mission section");

// Every element renders; virtual ones keep the virtual-card styling and note.
for(const symbol of Object.keys(atomAPI.bySymbol)){
  const e=atomAPI.bySymbol[symbol],out=modal.renderElementDetails(symbol);
  assert.ok(out.includes(e.name)&&out.includes("Biliyor muydun?"),"dialog for "+symbol);
  assert.ok(!out.includes("henüz eklenmedi"),symbol+" has content");
  if(!atomAPI.ACTIVE.has(symbol)){
    assert.ok(out.includes("atom-card virtual")&&out.includes("Sanal kart"),symbol+" virtual");
    assert.ok(out.includes("fiziksel kart setinde yer almıyor"),symbol+" notice");
  }
}
const og=modal.renderElementDetails("Og");
assert.ok(og.includes("Nasıl üretilir?")&&og.includes("Ne işe yarar?")&&!og.includes("Evrende nerede"));
assert.ok(og.includes("Köşeli parantezli kütle"));
assert.ok(!og.includes("Sık birlikte bulunduğu atomlar"),"no empty partner section");
const au=modal.renderElementDetails("Au");
assert.ok(au.includes("nötron yıldızı")&&au.includes('data-element="Ag"')&&!au.includes("Köşeli parantezli"));

// Page wiring: dialog element, detail button and script order.
assert.ok(html.includes('<dialog id="element-dialog"'));
assert.ok(html.includes('id="open-details"'));
const order=["app.js","element-details.js","element-modal.js","mission-visuals.js","missions.js"].map(f=>html.indexOf(f));
assert.deepEqual([...order].sort((a,b)=>a-b),order,"script order");
assert.ok(missionSrc.includes('class="atom-chip" data-element='),"mission atom chips open element details");
console.log("OK: 118 curated element dialogs, synthetic-element sections, partner atoms and mission links.");
