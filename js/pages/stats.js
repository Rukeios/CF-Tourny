let SEASON_LABEL = "Season 1";

let PLAYERS = [
  /* {name:"Dunker69", team:"Island Kings", gp:7,
      ppg:18.4, rpg:6.1, apg:4.2, spg:1.8, bpg:0.6, fg:47.2, tp:36.5}, */
];
/* ========================================================= */

let sortKey = 'ppg', sortDir = -1, teamFilter = '', view = 'leaders';

function fmt(n){ return (n === null || n === undefined || isNaN(n))
  ? '-' : Number(n).toFixed(1); }

function setView(v){
  view = v;
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('on', t.dataset.v === v));
  render();
}
function setSort(k){
  if(sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = -1; }
  render();
}
function setTeam(v){ teamFilter = v; render(); }

function rows(){
  return PLAYERS.filter(p => !teamFilter || p.team === teamFilter);
}

function leadersHTML(){
  const boards = [
    ['ppg','Points per game'], ['rpg','Rebounds per game'],
    ['apg','Assists per game'], ['spg','Steals per game'],
    ['bpg','Blocks per game'],  ['fg','Field goal %']
  ];
  let h = '<div class="lb-grid">';
  boards.forEach(b => {
    const list = rows().filter(p => p[b[0]] !== undefined && p[b[0]] !== null)
      .slice().sort((x,y) => y[b[0]] - x[b[0]]).slice(0,5);
    if(!list.length) return;
    h += '<div class="lb"><h3>' + b[1] + '</h3>';
    list.forEach((p,i) => {
      const v = b[0] === 'fg' ? fmt(p[b[0]]) + '%' : fmt(p[b[0]]);
      h += '<div class="lb-row"><span class="n">' + (i+1) + '</span>' +
           '<span class="who">' + esc(p.name) +
           (p.team ? ' <span class="tn">' + esc(p.team) + '</span>' : '') +
           '</span><span class="v">' + v + '</span></div>';
    });
    h += '</div>';
  });
  return h + '</div>';
}

function tableHTML(){
  const cols = [['ppg','PPG'],['rpg','RPG'],['apg','APG'],['spg','SPG'],
                ['bpg','BPG'],['fg','FG%'],['tp','3P%']];
  const list = rows().slice().sort((a,b) => {
    if(sortKey === 'name' || sortKey === 'team'){
      return String(a[sortKey]||'').localeCompare(String(b[sortKey]||'')) * -sortDir;
    }
    const x = a[sortKey] === undefined ? -1 : a[sortKey];
    const y = b[sortKey] === undefined ? -1 : b[sortKey];
    return (y - x) * (sortDir < 0 ? 1 : -1);
  });
  let h = '<div class="scroll"><table><tr><th class="rank"></th>' +
    '<th onclick="setSort(\'name\')">Player</th>' +
    '<th onclick="setSort(\'team\')">Team</th>' +
    '<th class="num" onclick="setSort(\'gp\')">GP</th>';
  cols.forEach(c => h += '<th class="num" onclick="setSort(\'' + c[0] +
                          '\')">' + c[1] + '</th>');
  h += '</tr>';
  list.forEach((p,i) => {
    h += '<tr><td class="rank">' + (i+1) + '</td>' +
         '<td class="pn">' + esc(p.name) + '</td>' +
         '<td class="tn">' + esc(p.team || '-') + '</td>' +
         '<td class="num">' + (p.gp || 0) + '</td>';
    cols.forEach(c => {
      const isPct = (c[0] === 'fg' || c[0] === 'tp');
      const v = p[c[0]] === undefined ? '-'
                : (isPct ? fmt(p[c[0]]) + '%' : fmt(p[c[0]]));
      h += '<td class="num' + (c[0] === sortKey ? ' lead' : '') + '">' + v + '</td>';
    });
    h += '</tr>';
  });
  return h + '</table></div>';
}

function render(){
  const el = document.getElementById('stats');
  if(!PLAYERS.length){
    el.innerHTML = '<div class="empty">No stats yet. ' +
      'Player numbers appear here once the season is under way.</div>';
    document.getElementById('filt').style.display = 'none';
    return;
  }
  document.getElementById('filt').style.display = '';
  el.innerHTML = (view === 'leaders') ? leadersHTML() : tableHTML();
}

function boot(){
  document.getElementById('season-label').textContent = SEASON_LABEL;
  const teams = [];
  PLAYERS.forEach(p => { if(p.team && teams.indexOf(p.team) < 0) teams.push(p.team); });
  const sel = document.getElementById('team');
  sel.innerHTML = '<option value="">All teams</option>' +
    teams.map(t => '<option value="' + esc(t) + '">' + esc(t) + '</option>').join('');
  render();
}


function renderAll(){boot();}
loadData('data/stats.json',{seasonLabel:SEASON_LABEL,players:PLAYERS}).then(d=>{SEASON_LABEL=d.seasonLabel||SEASON_LABEL;PLAYERS=d.players||[];renderAll();});
