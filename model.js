/* Walleye Watch: intentionally simplified cohort model. See MODEL.md. */
(function(root){
'use strict';
function rng(seed){let a=(Number(seed)>>>0)||1;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
const foods={low:.78,normal:1,high:1.18};
function copies(f){return f.genes.flat().reduce((a,b)=>a+b,0);}
function length(f,food='normal',age=f.age){const adult=(34+3*copies(f)+f.noise)*foods[food];return +(adult*(age>=6?1:.24)).toFixed(1);}
function stats(fish,food){const n=fish.length;return {n,mean:n?fish.reduce((s,f)=>s+length(f,food),0)/n:null,p:n?fish.reduce((s,f)=>s+copies(f),0)/(6*n):null,loci:[0,1,2].map(i=>n?fish.reduce((s,f)=>s+f.genes[i][0]+f.genes[i][1],0)/(2*n):null)};}
class Model{
 constructor(settings={}){this.settings={seed:42,mode:'none',intensity:40,food:'normal',...settings};if(!['none','random','large'].includes(this.settings.mode))throw Error('Invalid mode');if(!foods[this.settings.food])throw Error('Invalid food');this.settings.intensity=Math.max(0,Math.min(60,Number(this.settings.intensity)||0));this.random=rng(this.settings.seed);this.generation=1;this.phase='adults';this.nextId=1;this.history=[];this.removed=[];this.lastParents=[];this.fish=Array.from({length:60},()=>this.make());this.record();}
 make(genes,parents){return {id:this.nextId++,genes:genes||Array.from({length:3},()=>[+(this.random()<.5),+(this.random()<.5)]),noise:(this.random()+this.random()-1)*3,sex:this.random()<.5?'F':'M',age:genes?1:6,parents:parents||[]};}
 record(){const s=stats(this.fish,this.settings.food);this.history.push({generation:this.generation,phase:this.phase,...s});return s;}
 harvest(){if(this.phase!=='adults')return false;this.removed=[];let count=this.settings.mode==='none'?0:Math.round(this.fish.length*this.settings.intensity/100);for(let n=0;n<count;n++){const weights=this.fish.map(f=>this.settings.mode==='large'?Math.exp((length(f,this.settings.food)-43)/5):1);let z=this.random()*weights.reduce((a,b)=>a+b,0),idx=weights.length-1;for(let i=0;i<weights.length;i++){z-=weights[i];if(z<0){idx=i;break;}}this.removed.push(this.fish.splice(idx,1)[0]);}this.phase='survivors';this.record();return true;}
 reproduce(){if(this.phase!=='survivors'||this.generation>=12)return false;const females=this.fish.filter(f=>f.sex==='F'),males=this.fish.filter(f=>f.sex==='M');if(!females.length||!males.length){this.phase='stopped';this.record();return false;}this.lastParents=this.fish.map(f=>({...f,genes:f.genes.map(g=>g.slice())}));this.fish=Array.from({length:60},()=>{const mom=females[Math.floor(this.random()*females.length)],dad=males[Math.floor(this.random()*males.length)];const genes=[0,1,2].map(i=>[mom.genes[i][+(this.random()<.5)],dad.genes[i][+(this.random()<.5)]]);return this.make(genes,[mom.id,dad.id]);});this.generation++;this.phase='juveniles';this.record();return true;}
 grow(){if(this.phase!=='juveniles')return false;this.fish.forEach(f=>f.age=6);this.phase='adults';this.removed=[];this.record();return true;}
 step(){if(this.phase==='adults')return this.harvest();if(this.phase==='survivors')return this.reproduce();if(this.phase==='juveniles')return this.grow();return false;}
 snapshot(){return JSON.parse(JSON.stringify({settings:this.settings,generation:this.generation,phase:this.phase,history:this.history,fish:this.fish,lastParents:this.lastParents,removed:this.removed}));}
}
const api={Model,stats,length,copies,rng,foods};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.WWModel=api;
})(typeof window!=='undefined'?window:globalThis);
