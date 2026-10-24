const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname,"..");
const src = fs.readFileSync(path.join(root,"app.js"),"utf8");
const html = fs.readFileSync(path.join(root,"index.html"),"utf8");
const css = fs.readFileSync(path.join(root,"styles.css"),"utf8");
const noInit = src.replace(/init\(\);\s*$/,"return {CARD_INFO,CARD_ORDER,mainRows,elements,bySymbol,ACTIVE,groupOf,categoryLabel,shellInfo,shellSvg,buildPeriodic,renderAtom};");
assert.notEqual(noInit,src,"init() should be present");
const api = new Function(noInit)();

assert.equal(Object.keys(api.elements).length,118);
assert.equal(api.CARD_ORDER.length,25);
assert.equal(api.ACTIVE.size,25);
assert.equal(new Set(api.CARD_ORDER).size,25);
for(let z=1;z<=118;z++){
  const e=api.elements[z],info=api.shellInfo(e);
  assert.ok(e && info,"missing element "+z);
  assert.equal(info.shells.reduce((a,b)=>a+b,0),z,"wrong electron count for "+z);
  assert.ok(info.shells.length>=1 && info.shells.length<=7,"shell count "+z);
  assert.ok(info.shells.every(n=>n>0 && n<=32),"invalid shell "+z);
  assert.ok(typeof api.categoryLabel(z)==="string" && api.categoryLabel(z).length>0,"missing class "+z);
  assert.equal(Boolean(info.virtual),!api.ACTIVE.has(e.symbol),"virtual state "+z);
  const svg=api.shellSvg(e,info,"#123456");
  assert.ok(svg.includes(info.shells.join("–")),"missing shell label "+z);
  if(z>2 && info.shells.at(-1)<=8){
    const outerDotCount=(svg.match(/stroke-width="2.3"/g)||[]).length;
    assert.equal(outerDotCount,8,"expected 8 valence slots "+z);
  }
}
for(const [sym,expected] of [["H","1"],["He","2"],["O","2,6"],["Si","2,8,4"],["Ge","2,8,18,4"],["Fe","2,8,14,2"],["Cu","2,8,18,1"],["Zn","2,8,18,2"]]){
  assert.equal(api.shellInfo(api.bySymbol[sym]).shells.join(","),expected,sym);
}
// The first pair (1s) must remain visible outside the element symbol;
// three-shell elements should no longer jump from radius 16 to 75.
for(const [symbol,radii] of [
  ["C",[43]],["O",[43]],["Si",[41,65]],["Al",[41,65]],
  ["P",[41,65]],["S",[41,65]],["Cl",[41,65]],["Ar",[41,65]],
  ["Ge",[38,56,73]],["Fe",[38,56,73]],["Cu",[38,56,73]]
]){
  const element=api.bySymbol[symbol];
  const svg=api.shellSvg(element,api.shellInfo(element),"#123456");
  const actual=[...svg.matchAll(/<circle cx="110" cy="110" r="([0-9.]+)" stroke="#9db1bf"/g)].map(match=>Number(match[1]));
  assert.deepEqual(actual,radii,"unbalanced inner shells for "+symbol);
  assert.ok(svg.includes('r="5" fill="#7999ad" opacity=".88"'),"inner electron pair too faint for "+symbol);
  assert.ok(radii[0]>25+5,"inner-shell electrons overlap nucleus for "+symbol);
}
assert.equal(api.groupOf(8),16);
assert.equal(api.groupOf(32),14);
assert.equal(api.groupOf(57),null);
assert.equal(api.mainRows.length,7);
api.mainRows.forEach(row=>assert.equal(row.length,18));
assert.ok(!html.includes("page-atoms"),"atom cards must not be a separate page");
assert.ok(!html.includes("118 ELEMENT · 25 KART"),"verbose intro removed");
assert.ok(!html.includes("<h1"),"standalone large heading removed");
for(const id of ["periodic-grid","periodic-search","only-available","atom-preview","card-status","detail-shells","inspector"]){
  assert.ok(html.includes('id="'+id+'"'),"missing single-page node "+id);
}
assert.ok(css.includes(".cell:hover"),"muted cells must remain interactable");

class FakeNode {
  constructor(tagName){this.tagName=tagName;this.children=[];this.dataset={};this.style={};this.listeners={};this.attributes={};this.className="";this.innerHTML="";this.textContent="";this.value="";this.checked=false;}
  append(...nodes){this.children.push(...nodes);}
  setAttribute(k,v){this.attributes[k]=v;}
  addEventListener(k,fn){this.listeners[k]=fn;}
  get classList(){return {
    contains:(name)=>this.className.split(/\s+/).includes(name),
    toggle:(name,force)=>{
      const current=new Set(this.className.split(/\s+/).filter(Boolean));
      const desired=force===undefined?!current.has(name):force;
      if(desired)current.add(name);else current.delete(name);
      this.className=Array.from(current).join(" ");return desired;
    }
  };}
  click(){this.listeners.click?.();}
  scrollIntoView(){}
}
const nodes={};
for(const id of ["periodic-grid","periodic-search","only-available","atom-preview","card-status","detail-title","detail-group","detail-shells","detail-type","detail-description","inspector"]){
  nodes[id]=new FakeNode("div");
}
global.document={
  createElement:(type)=>new FakeNode(type),
  getElementById:(id)=>{assert.ok(nodes[id],"unknown id "+id);return nodes[id];},
  querySelectorAll:(selector)=>{
    assert.equal(selector,"#periodic-grid .cell[data-element]");
    return nodes["periodic-grid"].children.filter(n=>n.dataset.element);
  }
};
global.window={innerWidth:1440};
api.buildPeriodic();
const buttons=nodes["periodic-grid"].children.filter(x=>x.tagName==="button");
assert.equal(buttons.length,118,"every element clickable, including muted ones");
api.renderAtom();
assert.ok(nodes["card-status"].textContent.includes("Kart setinde"));
const virtual=buttons.find(x=>x.dataset.element==="Og");
assert.ok(virtual.classList.contains("unavailable"));
virtual.click();
assert.ok(nodes["card-status"].textContent.includes("Sanal kart"));
assert.ok(nodes["atom-preview"].innerHTML.includes('class="atom-card virtual"'));
assert.ok(nodes["atom-preview"].innerHTML.includes("Oganesson"));
assert.equal(virtual.attributes["aria-pressed"],"true");
const hydrogen=buttons.find(x=>x.dataset.element==="H");
hydrogen.click();
assert.ok(nodes["card-status"].textContent.includes("Kart setinde"));
assert.ok(!nodes["atom-preview"].innerHTML.includes('atom-card virtual'));
assert.equal(hydrogen.attributes["aria-pressed"],"true");
assert.equal(virtual.attributes["aria-pressed"],"false");
console.log("OK: one-page UI, all 118 buttons, virtual and physical previews, 118 shell models.");
