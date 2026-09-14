function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
function loadData(path,fallback){if(typeof fetch!=='function')return Promise.resolve(fallback);return fetch(path).then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).catch(()=>fallback);}
function siteBoot(){if(typeof initChrome==='function')initChrome(document.body.dataset.page||'');if(typeof applyLang==='function')applyLang();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',siteBoot);else siteBoot();
