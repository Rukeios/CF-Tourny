let RULES = [
  {h:"Eligibility", items:[
    "All players must be 18 years of age or older.",
    "A player may be rostered to one team only. No dual rosters.",
    "Every player must be in the CaribbeanFye Discord and have accepted the rules.",
    "Teams are five players minimum: three active and two substitutes.",
    "In-game names and Discord handles must both be registered so results can be verified."
  ]},
  {h:"Match play", items:[
    "Season matches run Saturdays at 6:00 PM Central. Tournaments run Fridays at 7:00 PM Central.",
    "Captains agree on a start time within the scheduled block. If they cannot agree, both teams take a no contest.",
    "Lineups lock per game, not per series. Any rostered player may be swapped in between games.",
    "A team that has not appeared fifteen minutes after the agreed start forfeits that match.",
    "Disconnects: if a player drops before either team reaches 10 points, the game restarts with the same lineups. After that threshold, play continues short-handed and the team may substitute at the next stoppage.",
    "If the game itself goes down or a server-wide fault occurs, the game restarts regardless of score.",
    "A team may claim a restart for connection reasons twice per season. After that, play continues."
  ]},
  {h:"Reporting results", items:[
    "The winning team captain posts a screenshot of the final screen in the results channel.",
    "No screenshot, no result.",
    "A captain who fails to report is sanctioned administratively, not competitively: first offence is a warning, second is a one match captain suspension, third is a franchise disciplinary point. Results are never altered over a reporting failure.",
    "If neither captain reports, staff resolve the match from the league recording.",
    "Only Team Captains and above may post in the results channel.",
    "Every match is recorded by the league. That recording settles any disputed result."
  ]},
  {h:"Conduct", items:[
    "Harassment of any kind is zero tolerance and results in immediate removal.",
    "Slurs, targeted abuse, and threats are not warnings. They are bans.",
    "Trash talk is fine. Making the server unpleasant is not.",
    "Disputes go in a ticket, not in general chat.",
    "Staff decisions are logged. If you think one was wrong, open a ticket and say why."
  ]},
  {h:"Competitive integrity", items:[
    "Deliberately losing a match is grounds for a one season ban from play.",
    "Betting on a match you are playing in is not permitted.",
    "We act on evidence, not suspicion. League recordings are the standard.",
    "An organization with multiple banned players loses its season slot.",
    "Penalties follow people, not organization names. Reforming under a new name does not clear a ban."
  ]},
  {h:"Standings and tiebreakers", items:[
    "Teams are ranked by win percentage.",
    "Ties are broken in this order: head to head record, then game differential, then total point differential, then a single tiebreak match.",
    "A tiebreak match is only played when a placement affects the top four or the bottom four.",
    "Team name is never used to break a tie.",
    "A no contest counts as a played game for neither team and does not affect win percentage."
  ]},
  {h:"Promotion and relegation", items:[
    "The bottom four franchises enter relegation at the end of each season. Entry fee is waived.",
    "Four qualifier tournaments run in the offseason. Each produces one winner.",
    "Relegation matches are seeded: 5th plays Qualifier A winner, 6th plays Qualifier B, 7th plays Qualifier C, 8th plays Qualifier D.",
    "The winner of each relegation match takes the season slot.",
    "A franchise that loses relegation keeps its Discord channels and may re-enter qualifiers next offseason."
  ]},
  {h:"Rosters and transfers", items:[
    "Organization personnel are unlimited. Owners, general managers, coaches, media staff and anyone else with a role in the org.",
    "The competitive roster is capped at eight and must hold at least five.",
    "Only players on the competitive roster may play league matches.",
    "Rosters lock at the start of the season. Transfers are permitted only during the mid-season transfer window.",
    "A released player may sign with another franchise immediately, but not with a franchise they have already played for that season.",
    "Rosters lock again for the playoffs and for relegation. No additions after the lock.",
    "A franchise short of three available players may use one emergency substitute per season from the free agent list, with staff approval."
  ]},
  {h:"Franchises", items:[
    "A franchise is an organization holding a protected season slot, five players minimum.",
    "Competitive rosters are capped at eight. Organization personnel beyond that are unlimited.",
    "Slot protection lasts one season. The bottom four re-enter qualifiers with the entry fee waived.",
    "Franchises may be transferred with league approval. The league takes no cut.",
    "Organizations are independent. The league is not party to any agreement between an org and its players.",
    "An org that takes winnings and does not pay its players is permanently removed, along with everyone involved."
  ]},
  {h:"Predictions", items:[
    "Prediction currency has no cash value and cannot be exchanged for anything.",
    "Players may not place predictions on matches they are playing in.",
    "Lines lock before lineups are announced.",
    "Prediction talk stays in its own channel, not in match coordination channels.",
    "Blaming a player for a lost prediction is treated as harassment."
  ]}
];
/* ========================================================= */

function drawRules(){
document.getElementById('rules').innerHTML = RULES.map(sec =>
  '<div class="rule-sec"><h3>' + esc(sec.h) + '</h3><ol>' +
  sec.items.map(i => '<li>' + esc(i) + '</li>').join('') +
  '</ol></div>').join('');
}


function renderAll(){drawRules();}
loadData('data/rules.json',{sections:RULES}).then(d=>{RULES=d.sections||d;renderAll();});


