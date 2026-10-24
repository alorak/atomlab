const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const src = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const source = src.replace(/init\(\);\s*$/, "return {CARD_INFO,CARD_ORDER,mainRows,elements,bySymbol,family};");
assert.notEqual(source, src, "init() call must be removable for data test");
const {CARD_INFO,CARD_ORDER,mainRows,elements,bySymbol,family} = new Function(source)();
assert.equal(Object.keys(elements).length,118);
assert.equal(CARD_ORDER.length,25);
assert.equal(new Set(CARD_ORDER).size,25);
for (const symbol of CARD_ORDER) {
  const atom = bySymbol[symbol], meta = CARD_INFO[symbol];
  assert.ok(atom && meta, symbol);
  assert.equal(meta.shells.reduce((a,b)=>a+b,0),atom.z, symbol);
  const limits=[2,8,18,32,32,32,32];
  meta.shells.forEach((count,index)=> assert.ok(count>0 && count<=limits[index],symbol));
  assert.equal(meta.group>=1 && meta.group<=18,true, symbol);
  assert.ok(["nonmetal","metalloid","noble","alkali","alkaline","post","transition","dblock"].includes(family(atom.z)));
}
assert.equal(CARD_INFO.H.shells.join(","),"1");
assert.equal(CARD_INFO.He.shells.join(","),"2");
assert.equal(CARD_INFO.O.shells.join(","),"2,6");
assert.equal(CARD_INFO.Si.shells.join(","),"2,8,4");
assert.equal(CARD_INFO.Ge.shells.join(","),"2,8,18,4");
assert.equal(CARD_INFO.Fe.shells.join(","),"2,8,14,2");
assert.equal(CARD_INFO.Cu.shells.join(","),"2,8,18,1");
assert.equal(CARD_INFO.Zn.shells.join(","),"2,8,18,2");
assert.equal(mainRows.length,7);
mainRows.forEach(row=>assert.equal(row.length,18));
for (const id of ["page-periodic","page-atoms","periodic-grid","atom-selector","atom-preview","detail-shells"])
  assert.ok(html.includes('id="'+id+'"'),"Missing HTML container: "+id);
console.log("OK: 118-element periodic table, 25 selected cards, shell counts and page containers.");