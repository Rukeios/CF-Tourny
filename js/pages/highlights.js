let CLIPS = [
  /*
  {
    id:    "dQw4w9WgXcQ",
    kind:  "yt",
    title: "Island Kings vs Reef Runners - Final",
    tag:   "Full match",
    date:  "Sep 12",
    note:  "Went to overtime. Worth the full watch."
  },
  {
    id:    "abc123",
    kind:  "short",
    title: "Dunker69 game winner",
    tag:   "Highlight",
    date:  "Sep 12",
    note:  ""
  },
  */
];
/* ========================================================= */

let vFilter = '';

function ytThumb(id){
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function embedSrc(c){
  if(c.kind === 'tiktok'){
    return 'https://www.tiktok.com/embed/v2/' + encodeURIComponent(c.id);
  }
  return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(c.id) +
         '?autoplay=1&rel=0&modestbranding=1';
}

function playClip(btn, idx){
  const c = CLIPS[idx];
  const frame = btn.closest('.vframe');
  frame.innerHTML = '<iframe src="' + embedSrc(c) + '" ' +
    'title="' + esc(c.title) + '" allowfullscreen ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; ' +
    'gyroscope; picture-in-picture"></iframe>';
}

function vTags(){
  const out = [];
  CLIPS.forEach(c => { if(c.tag && out.indexOf(c.tag) < 0) out.push(c.tag); });
  return out;
}

function renderClips(){
  const wrap = document.getElementById('vgrid');
  const fil  = document.getElementById('vfilters');
  if(!wrap) return;

  if(!CLIPS.length){
    fil.innerHTML = '';
    wrap.className = '';
    wrap.innerHTML =
      '<div class="vempty"><strong>' + tr('No clips yet') + '</strong>' +
      tr('Match footage and highlights go up here after every event night. ' +
         'Join the Discord to catch them live.') + '</div>';
    return;
  }

  wrap.className = 'vgrid';

  fil.innerHTML =
    '<button class="' + (vFilter === '' ? 'on' : '') + '" data-t="">' +
    tr('Everything') + '</button>' +
    vTags().map(t => '<button class="' + (vFilter === t ? 'on' : '') +
      '" data-t="' + esc(t) + '">' + esc(tr(t)) + '</button>').join('');

  fil.querySelectorAll('button').forEach(b => {
    b.onclick = () => { vFilter = b.dataset.t; renderClips(); };
  });

  const list = CLIPS.filter(c => !vFilter || c.tag === vFilter);

  wrap.innerHTML = list.map((c) => {
    const idx = CLIPS.indexOf(c);
    const vertical = (c.kind === 'short' || c.kind === 'tiktok');
    const thumb = (c.kind === 'tiktok')
      ? ''
      : ' style="background-image:url(' + ytThumb(c.id) + ')"';
    return '<div class="vcard">' +
      '<div class="vframe' + (vertical ? ' short' : '') + '">' +
        '<div class="vthumb"' + thumb +
          ' onclick="playClip(this,' + idx + ')" role="button" tabindex="0">' +
          '<div class="vplay"></div>' +
        '</div>' +
      '</div>' +
      '<div class="vmeta">' +
        (c.tag ? '<div class="tag">' + esc(tr(c.tag)) + '</div>' : '') +
        '<h3>' + esc(c.title) + '</h3>' +
        (c.note ? '<p>' + esc(c.note) + '</p>' : '') +
        (c.date ? '<div class="date">' + esc(c.date) + '</div>' : '') +
      '</div>' +
    '</div>';
  }).join('');
}



function renderAll(){renderClips();}
loadData('data/clips.json',CLIPS).then(d=>{CLIPS=d;renderAll();});



