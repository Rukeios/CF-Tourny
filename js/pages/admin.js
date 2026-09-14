
/* =========================================================
   STAFF ACCESS GATE

   This is a curtain, not a lock. The check runs in the
   visitor's browser, so anyone determined can get past it.
   It keeps the public out of staff tools. It is not security.
   Nothing sensitive lives in this file either way.

   TO CHANGE THE PASSWORD:
     1. Unlock the page with the current password
     2. Use the "Change password" box at the top
     3. Copy the hash it gives you
     4. Paste it over PASS_HASH below, save, re-upload
   ========================================================= */

/* default password: caribbeanfye */
let PASS_HASH =
  "7dc3857fcee0d191ae6e1a3f901f145c600e3fbff37c4ffe32d6890094cf1475";


/* --------------------------------------------------------
   SHA-256

   crypto.subtle only exists in a secure context: https or
   localhost. Opening the file straight off disk (file://)
   does not qualify, so we fall back to a plain JS version.
   -------------------------------------------------------- */
function _sha256js(ascii){
  function rr(v,a){ return (v>>>a)|(v<<(32-a)); }
  var mm=Math.pow, M=mm(2,32), i, j, res='', words=[],
      asciiBitLength=ascii.length*8,
      hash=_sha256js.h=_sha256js.h||[],
      k=_sha256js.k=_sha256js.k||[], primeCounter=k.length,
      isComposite={};
  for(var candidate=2; primeCounter<64; candidate++){
    if(!isComposite[candidate]){
      for(i=0;i<313;i+=candidate) isComposite[i]=candidate;
      hash[primeCounter]=(mm(candidate,.5)*M)|0;
      k[primeCounter++]=(mm(candidate,1/3)*M)|0;
    }
  }
  ascii+='\x80';
  while(ascii.length%64-56) ascii+='\x00';
  for(i=0;i<ascii.length;i++){
    j=ascii.charCodeAt(i);
    if(j>>8) return;
    words[i>>2]|=j<<((3-i)%4)*8;
  }
  words[words.length]=(asciiBitLength/M)|0;
  words[words.length]=asciiBitLength;

  for(j=0;j<words.length;){
    var w=words.slice(j,j+=16), oldHash=hash;
    hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15], w2=w[i-2],
          a=hash[0], e=hash[4],
          temp1=hash[7]
            +(rr(e,6)^rr(e,11)^rr(e,25))
            +((e&hash[5])^(~e&hash[6]))
            +k[i]
            +(w[i]=(i<16)?w[i]:(
                w[i-16]
                +(rr(w15,7)^rr(w15,18)^(w15>>>3))
                +w[i-7]
                +(rr(w2,17)^rr(w2,19)^(w2>>>10))
              )|0),
          temp2=(rr(a,2)^rr(a,13)^rr(a,22))
            +((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(temp1+temp2)|0].concat(hash);
      hash[4]=(hash[4]+temp1)|0;
    }
    for(i=0;i<8;i++) hash[i]=(hash[i]+oldHash[i])|0;
  }
  for(i=0;i<8;i++){
    for(j=3;j+1;j--){
      var b=(hash[i]>>(j*8))&255;
      res+=((b<16)?0:'')+b.toString(16);
    }
  }
  return res;
}

async function sha256(text){
  try{
    if(window.crypto && crypto.subtle && window.isSecureContext){
      const buf = new TextEncoder().encode(text);
      const h = await crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(h))
        .map(b => b.toString(16).padStart(2,'0')).join('');
    }
  }catch(e){ /* fall through */ }
  return _sha256js(unescape(encodeURIComponent(text)));
}


/* --------------------------------------------------------
   SECURITY QUESTION

   Asked before any password change. Stops someone changing
   the password on an unlocked machine.

   The answer is normalised before hashing: lowercased,
   trimmed, full stops removed, repeated spaces collapsed.
   So capitalisation, trailing full stops and extra spaces
   all still match.

   TO CHANGE THE QUESTION OR ANSWER
     1. Edit SECURITY_QUESTION below to whatever you want
     2. Type the new answer into the box and press
        "Hash an answer" to get its hash
     3. Paste that over SECURITY_ANSWER_HASH
   -------------------------------------------------------- */

const SECURITY_QUESTION = "What is the name of my fourth son?";
const SECURITY_ANSWER_HASH = "af2f38c7edb6f2cfdb8ac42a8af9e9ab682a2edfbd545a084b4885031494b919";

function normAnswer(s){
  return String(s).trim().toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ');
}

async function checkAnswer(v){
  const h = await sha256(normAnswer(v));
  return h === SECURITY_ANSWER_HASH;
}

async function hashAnswer(){
  const v = document.getElementById('pw-answer').value;
  const out = document.getElementById('pw-out');
  if(!v){ out.textContent = 'Type an answer first.'; return; }
  const h = await sha256(normAnswer(v));
  out.innerHTML = 'Hash for that answer. Paste it over '
    + 'SECURITY_ANSWER_HASH in this file:<br><br>' + h;
}

/* a password set through the page lives here, per browser */
function storedHash(){
  try{ return localStorage.getItem('cf_pw'); }catch(e){ return null; }
}
function storeHash(h){
  try{ localStorage.setItem('cf_pw', h); return true; }
  catch(e){ return false; }
}
function clearStoredHash(){
  try{ localStorage.removeItem('cf_pw'); }catch(e){}
}
function activeHash(){ return storedHash() || PASS_HASH; }


function unlock(){
  document.getElementById('gate').style.display = 'none';
  document.body.classList.remove('locked');
  const shell = document.getElementById('app-shell');
  if(shell) shell.classList.remove('hidden');
  const tool = document.getElementById('pwtool');
  if(tool){
    tool.style.display = 'block';
    const ql = document.getElementById('secq-label');
    if(ql) ql.textContent = SECURITY_QUESTION;
  }
  try{ sessionStorage.setItem('cf_ok','1'); }catch(e){}
  if(typeof boot === 'function') boot();
}


async function tryUnlock(){
  const inp = document.getElementById('gate-pw');
  const err = document.getElementById('gate-err');
  const val = inp.value;
  if(!val){ err.textContent = 'Enter the password.'; return; }
  let h;
  try{ h = await sha256(val); }
  catch(e){ err.textContent = 'Could not check the password.'; return; }
  if(h === activeHash()){
    err.textContent = '';
    unlock();
  } else {
    err.textContent = 'Wrong password.';
    inp.value = '';
    inp.focus();
  }
}

async function setPassword(){
  const pw  = document.getElementById('pw-new').value;
  const ans = document.getElementById('pw-answer').value;
  const out = document.getElementById('pw-out');

  if(!pw){ out.textContent = 'Type a new password first.'; return; }
  if(!ans){
    out.innerHTML = '<strong style="color:#E0A24F">'
      + 'Answer the security question before changing the password.'
      + '</strong>';
    document.getElementById('pw-answer').focus();
    return;
  }

  let ok = false;
  try{ ok = await checkAnswer(ans); }catch(e){}
  if(!ok){
    out.innerHTML = '<strong style="color:#E05A4A">'
      + 'That is not the right answer. Password unchanged.</strong>';
    document.getElementById('pw-answer').value = '';
    return;
  }

  const h = await sha256(pw);
  if(storeHash(h)){
    out.innerHTML =
      '<strong style="color:var(--teal)">Password changed on this browser.</strong>'
      + '<br><br>To make it the default for everyone, paste this over '
      + 'PASS_HASH in the file and re-upload:<br><br>' + h;
  } else {
    out.innerHTML = 'Could not save it here. Paste this over PASS_HASH '
      + 'in the file instead:<br><br>' + h;
  }
  document.getElementById('pw-new').value = '';
  document.getElementById('pw-answer').value = '';
}

async function resetPassword(){
  const ans = document.getElementById('pw-answer').value;
  const out = document.getElementById('pw-out');
  if(!ans){
    out.innerHTML = '<strong style="color:#E0A24F">'
      + 'Answer the security question first.</strong>';
    return;
  }
  let ok = false;
  try{ ok = await checkAnswer(ans); }catch(e){}
  if(!ok){
    out.innerHTML = '<strong style="color:#E05A4A">'
      + 'That is not the right answer.</strong>';
    return;
  }
  clearStoredHash();
  out.innerHTML = 'Back to the password built into the file.';
  document.getElementById('pw-answer').value = '';
}



/* skip the gate if already unlocked this browser session */
(function(){
  let ok = false;
  try{ ok = sessionStorage.getItem('cf_ok') === '1'; }catch(e){}
  if(ok){ unlock(); }
  else{
    document.body.classList.add('locked');
    const shell = document.getElementById('app-shell');
    if(shell) shell.classList.add('hidden');
    setTimeout(() => {
      const el = document.getElementById('gate-pw');
      if(el) el.focus();
    }, 60);
  }
})();


