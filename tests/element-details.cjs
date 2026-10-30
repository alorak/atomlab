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
  modalSrc.replace(/initElementModal\(\);\s*$/,"return {renderElementDetails,naturalOccurrence,missionsUsing};")
)(win,atomAPI.bySymbol,atomAPI.shellInfo,atomAPI.shellSvg,atomAPI.palette,atomAPI.family,atomAPI.varsFor,atomAPI.categoryLabel,atomAPI.ACTIVE);

// Curated content exists for exactly the 25 card elements.
assert.deepEqual(Object.keys(details).sort(),[...atomAPI.CARD_ORDER].sort());
for(const symbol of atomAPI.CARD_ORDER){
  const d=details[symbol];
  for(const key of ["mass","phase","universe","earth","forms","life"])assert.ok(typeof d[key]==="string"&&d[key].length>0,symbol+" "+key);
  assert.match(d.mass,/^\d+,\d+$/,symbol+" mass");
  assert.match(d.phase,/^(Katı|Sıvı|Gaz)/,symbol+" phase");
  assert.ok(d.partners.length>=1,symbol+" partners");
  for(const [symbols,text] of d.partners){
    assert.ok(symbols.length>=1&&text,symbol+" partner entry");
    for(const s of symbols)assert.ok(atomAPI.bySymbol[s],symbol+" unknown partner "+s);
  }
}
for(const noble of ["He","Ne","Ar"])assert.ok(details[noble].partnersNote.includes("bağ yapmaz"),noble+" must not imply bonding");

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

// Non-card elements: honest notice instead of invented content.
for(let z=1;z<=118;z++){
  const e=atomAPI.bySymbol[Object.keys(atomAPI.bySymbol).find(s=>atomAPI.bySymbol[s].z===z)];
  const out=modal.renderElementDetails(e.symbol);
  assert.ok(out.includes(e.name),"dialog for "+e.symbol);
  if(!atomAPI.ACTIVE.has(e.symbol)){
    assert.ok(out.includes("atom-card virtual")&&out.includes("Sanal kart"),e.symbol+" virtual");
    assert.ok(out.includes("fiziksel kart setinde yer almıyor"),e.symbol+" notice");
  }
}
assert.ok(modal.renderElementDetails("Og").includes("Doğada bulunmaz"));
assert.ok(modal.renderElementDetails("Tc").includes("Kararlı izotopu yoktur"));
assert.ok(modal.renderElementDetails("Ra").includes("Radyoaktiftir"));
assert.equal(modal.naturalOccurrence(29),null);

// Page wiring: dialog element, detail button and script order.
assert.ok(html.includes('<dialog id="element-dialog"'));
assert.ok(html.includes('id="open-details"'));
const order=["app.js","element-details.js","element-modal.js","mission-visuals.js","missions.js"].map(f=>html.indexOf(f));
assert.deepEqual([...order].sort((a,b)=>a-b),order,"script order");
assert.ok(missionSrc.includes('class="atom-chip" data-element='),"mission atom chips open element details");
console.log("OK: 25 curated element dialogs, partner atoms, mission links and 93 virtual-card notices.");
