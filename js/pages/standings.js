let SEASON_LABEL = "Season 1";

/* diff is optional point differential, used as a tiebreaker */
let STANDINGS = [
  /* {team:"Island Kings",  w:6, l:1, diff:+42},
     {team:"Reef Runners",  w:5, l:2, diff:+18},
     {team:"Trench Mob",    w:4, l:3, diff:-6},  */
];

let RECENT = [
  /* {date:"Sat 12 Sep", home:"Island Kings", away:"Reef Runners", winner:"Island Kings"}, */
];
/* ========================================================= */


/* head to head record between two teams, from RECENT */
function headToHead(x, y){
  let xw = 0, yw = 0;
  RECENT.forEach(r => {
    const pair = (r.home === x && r.away === y) ||
                 (r.home === y && r.away === x);
    if(!pair || !r.winner) return;
    if(r.winner === x) xw++;
    else if(r.winner === y) yw++;
  });
  return yw - xw;   /* negative means x is ahead */
}

function renderStandings(){
  const el = document.getElementById('standings');
  if(!STANDINGS.length){
    el.innerHTML = '<div class="empty">No standings yet. ' +
      'They will appear here once the season is under way.</div>';
    document.getElementById('legend').style.display = 'none';
    return;
  }
  const rows = STANDINGS.slice().map(r => {
    const gp = r.w + r.l;
    return {team:r.team, w:r.w, l:r.l, gp:gp,
            pct: gp ? r.w/gp : 0,
            diff: (r.diff === undefined ? null : r.diff)};
  }).sort((a,b) => {
    /* 1. win percentage */
    if(b.pct !== a.pct) return b.pct - a.pct;
    /* 2. head to head, from RECENT */
    const hh = headToHead(a.team, b.team);
    if(hh !== 0) return hh;
    /* 3. point differential, if recorded */
    if(a.diff !== null && b.diff !== null && a.diff !== b.diff){
      return b.diff - a.diff;
    }
    /* 4. more wins */
    if(b.w !== a.w) return b.w - a.w;
    /* still level: flagged as unresolved, not sorted by name */
    a.tied = true; b.tied = true;
    return 0;
  });

  const n = rows.length;
  let h = '<table><tr><th class="rank"></th><th>Team</th>' +
          '<th class="num">W</th><th class="num">L</th>' +
          '<th class="num">GP</th><th class="num">PCT</th></tr>';
  rows.forEach((r,i) => {
    let cls = '';
    if(n >= 8 && i < 4) cls = 'top';
    if(n >= 8 && i >= n-4) cls = 'bot';
    h += '<tr class="' + cls + '"><td class="rank">' + (i+1) + '</td>' +
         '<td class="tm">' + esc(r.team) + '</td>' +
         '<td class="num">' + r.w + '</td>' +
         '<td class="num">' + r.l + '</td>' +
         '<td class="num">' + r.gp + '</td>' +
         '<td class="num pct">' + r.pct.toFixed(3).replace(/^0/,'') +
         (r.tied ? ' <span class="tiemark" title="Tiebreak match required">*</span>' : '') +
         '</td></tr>';
  });
  h += '</table>';
  el.innerHTML = h;
  document.getElementById('legend').style.display = (n >= 8) ? 'block' : 'none';
}

function renderResults(){
  const el = document.getElementById('results');
  if(!RECENT.length){
    el.innerHTML = '<div class="empty">No results posted yet.</div>';
    return;
  }
  el.innerHTML = RECENT.map(r => {
    const hw = r.winner === r.home, aw = r.winner === r.away;
    return '<div class="res"><div>' +
      '<span class="' + (hw?'w':'') + '">' + esc(r.home) + '</span>' +
      ' <span class="d">vs</span> ' +
      '<span class="' + (aw?'w':'') + '">' + esc(r.away) + '</span>' +
      '</div><div class="d">' + esc(r.date || '') + '</div></div>';
  }).join('');
}



function renderAll(){document.getElementById('season-label').textContent=SEASON_LABEL;renderStandings();renderResults();}
loadData('data/standings.json',{seasonLabel:SEASON_LABEL,standings:STANDINGS,recent:RECENT}).then(d=>{SEASON_LABEL=d.seasonLabel||SEASON_LABEL;STANDINGS=d.standings||[];RECENT=d.recent||[];renderAll();});

