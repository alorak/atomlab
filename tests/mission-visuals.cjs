const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const atomSrc=fs.readFileSync(path.join(root,"app.js"),"utf8");
const missionSrc=fs.readFileSync(path.join(root,"missions.js"),"utf8");
const visualSrc=fs.readFileSync(path.join(root,"mission-visuals.js"),"utf8");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const atomAPI=new Function(atomSrc.replace(/init\(\);\s*$/,"return {bySymbol,shellInfo,palette,family,CARD_INFO,groupOf};"))();
const missions=new Function("window",missionSrc.replace(/initMissions\(\);\s*$/,"return window.ATOMLAB_MISSIONS;"))({});
const viz=new Function("bySymbol","shellInfo","palette","family","CARD_INFO","groupOf",
  visualSrc+"\nreturn {MISSION_VISUAL_SPECS,renderMissionDiagram};"
)(atomAPI.bySymbol,atomAPI.shellInfo,atomAPI.palette,atomAPI.family,atomAPI.CARD_INFO,atomAPI.groupOf);

assert.equal(missions.length,26);
assert.equal(Object.keys(viz.MISSION_VISUAL_SPECS).length,26);
assert.ok(html.indexOf("mission-visuals.js")>html.indexOf("app.js"));
assert.ok(html.indexOf("mission-visuals.js")<html.indexOf("missions.js"));
assert.ok(missionSrc.includes("renderMissionDiagram(selected)"),"Missing visual solution integration");

for(const mission of missions){
 const spec=viz.MISSION_VISUAL_SPECS[mission.id];
 assert.ok(spec,mission.id+" lacks graph");
 const actual={};
 for(const node of spec.nodes)actual[node[0]]=(actual[node[0]]||0)+1;
 assert.deepEqual(Object.entries(actual).sort(),Object.entries(mission.atoms).sort(),mission.id+" has wrong card count");
 const rendered=viz.renderMissionDiagram(mission);
 assert.ok(rendered.includes('role="img"'),mission.id+" is missing accessible diagram");
 assert.ok(rendered.includes('data-visual-kind="'+spec.kind+'"'),mission.id);
 assert.equal((rendered.match(/class="diagram-atom"/g)||[]).length,spec.nodes.length,mission.id);
 if(spec.kind==="ionic"){
   assert.equal(spec.edges.length,0,mission.id+" must not have localized covalent edges");
   assert.ok(rendered.includes("iyonik bileşikler bağımsız molekül değildir"),mission.id);
 }
 if(spec.kind==="network"){
   assert.equal(spec.edges.length,0,mission.id+" graph would suggest an isolated molecule");
   assert.ok(rendered.includes("kovalent ağ kristalde devam eder"),mission.id);
 }
}
const oxy=missions.find(m=>m.formula==="O₂");
const oxygenSvg=viz.renderMissionDiagram(oxy);
assert.equal((oxygenSvg.match(/data-symbol="O"/g)||[]).length,2);
assert.equal((oxygenSvg.match(/stroke-width="3" stroke-linecap="round"/g)||[]).length,2,"O2 must have 2 parallel bond lines");
for(const [formula,expected] of [["H₂",1],["N₂",3]]){
 const rendered=viz.renderMissionDiagram(missions.find(m=>m.formula===formula));
 assert.equal((rendered.match(/stroke-width="3" stroke-linecap="round"/g)||[]).length,expected);
}
const salt=viz.renderMissionDiagram(missions.find(m=>m.formula==="NaCl"));
assert.ok(salt.includes("Na⁺")&&salt.includes("Cl⁻"));
console.log("OK: 26 graphical mission solutions; correct cards, covalent bonds, ionic charges and network distinctions.");
