let LANG='en';try{LANG=localStorage.getItem('cf_lang')||'en';}catch(e){}
function tr(s){if(LANG==='en')return s;const k=String(s).trim();return STR[k]!==undefined?STR[k]:s;}
function walkTranslate(root,back){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),jobs=[];while(w.nextNode()){const n=w.currentNode,raw=n.nodeValue,t=raw.trim();if(!t)continue;if(n.parentElement&&(/SCRIPT|STYLE/.test(n.parentElement.tagName)||n.parentElement.closest('.langtog')))continue;let out=null;if(!back){if(!n.__en)n.__en=t;if(STR[n.__en]!==undefined)out=STR[n.__en];}else if(n.__en)out=n.__en;if(out!==null&&out!==undefined)jobs.push([n,raw.replace(t,out)]);}jobs.forEach(j=>j[0].nodeValue=j[1]);}
function applyLang(){document.documentElement.lang=LANG;document.querySelectorAll('.langtog button').forEach(b=>b.classList.toggle('on',b.dataset.l===LANG));if(typeof renderAll==='function')renderAll();walkTranslate(document.body,LANG==='en');}
function setLang(l){LANG=l;try{localStorage.setItem('cf_lang',l);}catch(e){}applyLang();}
function buildLangToggle(nav){
  const d=document.createElement('div');
  d.className='langtog';
  d.innerHTML='<button data-l="en">EN</button><button data-l="es">ES</button>';
  document.body.appendChild(d);
  d.querySelectorAll('button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
}
