
/* =========================================================
   STAFF ACCESS GATE

   This is a curtain, not a lock. The check runs in the
   visitor's browser, so anyone determined can get past it.
   It keeps the public out of staff tools. It is not security.
   Nothing sensitive lives in this file either way.

   The password is changed only by editing this file and
   deploying it. There is no password-change control in the
   browser.
   ========================================================= */

/* default password: BigCARIB551 */
let PASS_HASH =
  "202ed6f5adeacca431e02d9b54fd3d8880198a342f768b2be821b0a94cc7e891";


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


function unlock(){
  document.getElementById('gate').style.display = 'none';
  document.body.classList.remove('locked');
  const shell = document.getElementById('app-shell');
  if(shell) shell.classList.remove('hidden');
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
  if(h === PASS_HASH){
    err.textContent = '';
    unlock();
  } else {
    err.textContent = 'Wrong password.';
    inp.value = '';
    inp.focus();
  }
}

/* Always show the gate: each visit requires a fresh login. */
(function(){
  document.body.classList.add('locked');
  const shell = document.getElementById('app-shell');
  if(shell) shell.classList.add('hidden');
  setTimeout(() => {
    const el = document.getElementById('gate-pw');
    if(el) el.focus();
  }, 60);
})();

