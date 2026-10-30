const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(root,f),"utf8");
const atomSrc=read("app.js"),originSrc=read("cosmic-origin.js"),modalSrc=read("element-modal.js"),html=read("index.html"),css=read("styles.css");

const atomAPI=new Function(atomSrc.replace(/init\(\);\s*$/,"return {bySymbol,shellInfo,shellSvg,palette,family,varsFor,categoryLabel,ACTIVE};"))();
const win={};
const origin=new Function("window","bySymbol",originSrc.replace(/initCosmicOrigin\(\);\s*$/,"return {originStyle,originLabels,originTint,renderOriginLegend};"))(win,atomAPI.bySymbol);
const sources=win.ATOMLAB_ORIGIN_SOURCES,origins=win.ATOMLAB_ORIGINS;

// Every element has 1–3 known sources, dominant first, no duplicates.
assert.equal(Object.keys(origins).length,118);
for(const symbol of Object.keys(atomAPI.bySymbol)){
  const list=origins[symbol],z=atomAPI.bySymbol[symbol].z;
  assert.ok(list&&list.length>=1&&list.length<=3,symbol+" sources");
  assert.equal(new Set(list).size,list.length,symbol+" duplicate source");
  for(const s of list)assert.ok(sources[s],symbol+" unknown source "+s);
  if(z>=95)assert.deepEqual(list,["synthetic"],symbol+" is synthetic");
  else assert.ok(!list.includes("synthetic"),symbol+" is natural");
  if(list.includes("decay"))assert.equal(list.length,1,symbol+" decay is exclusive");
  const {bar,bg}=origin.originStyle(symbol);
  assert.ok(bar.startsWith("linear-gradient(90deg,"),symbol+" bar");
  assert.ok(bar.includes(sources[list[0]].color+" 0%"),symbol+" dominant band first");
  assert.ok(bg.includes("gradient"),symbol+" background");
}
for(const [symbol,expected] of [["H",["bb"]],["He",["bb"]],["Be",["cosmic"]],["O",["massive"]],["Au",["neutron"]],["Eu",["neutron"]],["Tc",["decay"]],["Og",["synthetic"]]])
  assert.deepEqual(origins[symbol],expected,symbol);
assert.ok(origins.Fe.includes("wd")&&origins.Fe.includes("massive"),"Fe from white dwarfs and massive stars");
assert.ok(origins.Ba[0]==="lowmass"&&origins.Pb[0]==="lowmass","s-process elements");
assert.ok(origins.Li.includes("bb"),"Li partly from Big Bang");

// Shares are schematic: two sources 65/35, three 50/30/20.
assert.ok(origin.originStyle("C").bar.includes("65% 100%"));
assert.ok(origin.originStyle("Li").bar.includes("80% 100%"));
assert.equal(origin.originTint("#000000",.24),"#c2c2c2");
assert.deepEqual(origin.originLabels("Au"),["Nötron yıldızı çarpışmaları"]);

// Legend names every source in palette order and cites the source chart.
const legend=origin.renderOriginLegend();
assert.equal((legend.match(/class="swatch"/g)||[]).length,8);
assert.ok(legend.includes("Johnson"));

// Modal shows the origin summary when origin data is present.
const modal=new Function("window","bySymbol","shellInfo","shellSvg","palette","family","varsFor","categoryLabel","ACTIVE",
  modalSrc.replace(/initElementModal\(\);\s*$/,"return {renderElementDetails};")
)(win,atomAPI.bySymbol,atomAPI.shellInfo,atomAPI.shellSvg,atomAPI.palette,atomAPI.family,atomAPI.varsFor,atomAPI.categoryLabel,atomAPI.ACTIVE);
const fe=modal.renderElementDetails("Fe");
assert.ok(fe.includes("Kozmik köken")&&fe.includes("Patlayan beyaz cüceler")&&fe.includes("İlk sıradaki kaynak baskındır"));
assert.ok(!modal.renderElementDetails("O").includes("İlk sıradaki kaynak"),"single source needs no dominance note");

// Page wiring.
assert.ok(html.includes('data-color-mode="origin"')&&html.includes('data-color-mode="family"'));
assert.ok(html.includes('id="legend-origin"')&&html.includes('id="legend-family"'));
assert.ok(html.indexOf("cosmic-origin.js")>html.indexOf("app.js")&&html.indexOf("cosmic-origin.js")<html.indexOf("element-modal.js"));
assert.ok(css.includes(".periodic-grid.origin-mode .cell[data-element]"));
assert.ok(css.includes("min(1040px"),"wider detail dialog");
console.log("OK: cosmic origins for 118 elements, schematic bands, legend, modal summary and color-mode switch.");
