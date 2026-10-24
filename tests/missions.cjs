const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const script=fs.readFileSync(path.join(root,"missions.js"),"utf8");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const win={};
const expose=script.replace(/initMissions\(\);\s*$/,"return {stages:window.ATOMLAB_STAGES,missions:window.ATOMLAB_MISSIONS};");
assert.notEqual(expose,script);
const {stages,missions}=new Function("window",expose)(win);
assert.equal(stages.length,4);
assert.equal(missions.length,26);
assert.deepEqual([1,2,3,4].map(s=>missions.filter(m=>m.stage===s).length),[4,8,8,6]);
assert.equal(new Set(missions.map(m=>m.id)).size,26);
const formulas=missions.map(m=>m.formula);
for(const f of ["H₂","O₂","N₂","H₂O","CH₄","CO₂","NH₃","NaCl","MgCl₂","CaCl₂","SiO₂","SiC","BCl₃","Al₂O₃","Fe₂O₃"])assert.ok(formulas.includes(f),f);
for(const m of missions){
 assert.ok(m.name&&m.goal&&m.answer&&m.why&&m.concept,m.id);
 assert.ok(Object.entries(m.atoms).length>0,m.id);
 assert.ok(Object.values(m.atoms).every(n=>Number.isInteger(n)&&n>0),m.id);
}
for(const id of ["mission-stage-tabs","mission-list","mission-detail","missions-view","periodic-view"])assert.ok(html.includes('id="'+id+'"'),id);
assert.ok(html.includes("missions.js"));
console.log("OK: 26 missions, four stages, formulas and UI containers");
