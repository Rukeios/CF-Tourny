let FAQ = [
  {cat:"Getting started", items:[
    {q:"How do I join?",
     a:"Join the Discord, read and accept the rules, then answer the onboarding questions. That gets you into the community channels straight away."},
    {q:"Does it cost anything?",
     a:"No. Tournaments are free to enter right now, and the first season is free as well. If that changes, it will be announced well in advance and you will know the price before you commit."},
    {q:"Do I need a team?",
     a:"To play in tournaments, yes. Teams are five players minimum, three active and two subs. If you do not have one, register as a free agent and post in the looking-for-team channel. Orgs check both."},
    {q:"How old do I have to be?",
     a:"Eighteen or older. No exceptions."},
    {q:"What regions can play?",
     a:"Anyone can join the community. Tournaments are currently scheduled around North American evenings, so that is where competition is most practical right now."}
  ]},

  {cat:"Tournaments", items:[
    {q:"When do tournaments run?",
     a:"Friday nights at 7:00 PM Central. Season matches are Saturdays at 6:00 PM Central. Weeknights are solo drafts and exhibitions."},
    {q:"How do I sign my team up?",
     a:"Fill out the team registration form linked in the signups channel. Once we verify the roster you get your Team Captain and Player roles."},
    {q:"Can I change my lineup between games?",
     a:"Yes. Lineups lock per game, not per tournament. A five man roster can rotate all five across a series so nobody sits the whole night."},
    {q:"What happens if a team does not show?",
     a:"Fifteen minute clock, then automatic forfeit. No discussion. Set your alarms."},
    {q:"How are brackets seeded?",
     a:"Standard seeding, so the top seed plays the bottom seed and strong teams cannot meet before the later rounds. If there are no standings yet, it is a random draw."}
  ]},

  {cat:"Results and disputes", items:[
    {q:"How do results get reported?",
     a:"The winning team captain posts a screenshot of the final screen in the results channel. No screenshot, no result. If a captain does not post, that team forfeits their next match."},
    {q:"What if we disagree on a result?",
     a:"Every match is recorded by the league. That recording is the tiebreaker. Open a dispute ticket and we will check the footage."},
    {q:"Someone is cheating or being toxic. What do I do?",
     a:"Open a ticket in the disputes channel with whatever evidence you have. Harassment is zero tolerance."},
    {q:"Why can only captains post results?",
     a:"It keeps the results channel clean and gives one clear person accountable per team. Everyone else can read it."}
  ]},

  {cat:"Season and franchises", items:[
    {q:"What is a franchise?",
     a:"An organization holding a protected slot in the season. Minimum five players, no upper limit as long as everyone has a job title. Franchises get a protected season slot, a vote on season changes, and their own channels."},
    {q:"How do I get a franchise slot?",
     a:"Win one of the qualifier tournaments. Slots for the first season are free."},
    {q:"Can a franchise lose its slot?",
     a:"Yes. Slot protection lasts one season. The bottom four teams re-enter the qualifiers, entry fee waived, and play a qualifier winner to keep their place."},
    {q:"Can I be on two teams?",
     a:"No. One team per player. We check every roster against the others before verifying, and doubling up gets both rosters flagged."},
    {q:"Can a franchise be sold or transferred?",
     a:"With league approval, yes. The league does not take a cut."}
  ]},

  {cat:"Community", issues:true, items:[
    {q:"Do you only play Dunk City Dynasty?",
     a:"DCD is the competitive side, but the server has channels for other mobile games and a general lounge. Grab the ping roles for whatever you play."},
    {q:"How do I get pinged for tournaments?",
     a:"Pick up the Tournament Ping role during onboarding or in the roles channel. We do not ping the whole server for events."},
    {q:"Can I help run things?",
     a:"Eventually, yes. Staff comes from people already active and helpful in the server. Stick around, be useful, and it tends to sort itself out."}
  ]}
];
/* ========================================================= */

function renderFAQ(filter){
  const wrap = document.getElementById('faq');
  const f = (filter || '').toLowerCase().trim();
  let html = '', shown = 0;

  FAQ.forEach(group => {
    const hits = group.items.filter(it =>
      !f || it.q.toLowerCase().includes(f) || it.a.toLowerCase().includes(f));
    if(!hits.length) return;
    html += '<div class="cat">' + esc(group.cat) + '</div>';
    hits.forEach(it => {
      shown++;
      html += '<div class="qa" onclick="this.classList.toggle(\'open\')">' +
              '<div class="q"><span>' + esc(it.q) +
              '</span><span class="mk">+</span></div>' +
              '<div class="a">' + esc(it.a) + '</div></div>';
    });
  });

  wrap.innerHTML = html;
  document.getElementById('none').style.display = shown ? 'none' : 'block';
}
renderFAQ('');


function renderAll(){renderFAQ('');}
loadData('data/faq.json',FAQ).then(d=>{FAQ=d;renderAll();});



