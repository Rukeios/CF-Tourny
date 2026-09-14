let NEXT_EVENT = {
  kicker: "Next up",
  title:  "Open Bracket Night",
  when:   "Friday, 7:00 PM Central",
  detail: "Free entry. Teams of five, three active and two subs. Sign up in #signups."
};

let ANNOUNCEMENTS = [
  {
    date:  "Coming soon",
    title: "Season 1 registration opens",
    body:  "Eight franchise slots. Free for the first season. Qualifier tournaments announced in Discord."
  },
  {
    date:  "Now running",
    title: "Weeknight solo drafts",
    body:  "No team? Play solo drafts on weeknights. Orgs are watching and signing."
  }
];

let SCHEDULE = [
  {day: "Friday",    time: "7:00 PM CT", what: "Tournaments"},
  {day: "Saturday",  time: "6:00 PM CT", what: "Season matches"},
  {day: "Weeknights", time: "Varies",    what: "Solo drafts and exhibitions"}
];

let RULES = [
  "All players must be 18 or older",
  "One team per player. No dual rosters.",
  "Winning captain posts a screenshot to #results",
  "15 minute no-show clock, then automatic forfeit",
  "Zero tolerance for harassment",
  "League recording settles any disputed result",
  "Payment between an org and its players is between them"
];

function buildPage(){
document.getElementById('next-event').innerHTML =
  '<div class="next-up">' +
    '<div class="kicker">' + esc(NEXT_EVENT.kicker) + '</div>' +
    '<h3>' + esc(NEXT_EVENT.title) + '</h3>' +
    '<div class="when">' + esc(NEXT_EVENT.when) + '</div>' +
    '<div class="detail">' + esc(NEXT_EVENT.detail) + '</div>' +
  '</div>';

document.getElementById('announcements').innerHTML =
  ANNOUNCEMENTS.map(a =>
    '<div class="ann"><div class="date">' + esc(a.date) + '</div>' +
    '<h4>' + esc(a.title) + '</h4>' +
    '<p>' + esc(a.body) + '</p></div>'
  ).join('');

document.getElementById('schedule').innerHTML =
  '<table><tr><th>Day</th><th>Time</th><th>What</th></tr>' +
  SCHEDULE.map(s =>
    '<tr><td class="day">' + esc(s.day) + '</td>' +
    '<td class="time">' + esc(s.time) + '</td>' +
    '<td>' + esc(s.what) + '</td></tr>'
  ).join('') + '</table>';

document.getElementById('rules').innerHTML =
  '<ul class="rules-list">' +
  RULES.map(r => '<li>' + esc(r) + '</li>').join('') +
  '</ul>';

}
buildPage();
document.getElementById('year').textContent = new Date().getFullYear();


function renderAll(){buildPage();}
loadData('data/announcements.json',ANNOUNCEMENTS).then(d=>{ANNOUNCEMENTS=d;renderAll();});
loadData('data/schedule.json',{nextEvent:NEXT_EVENT,items:SCHEDULE}).then(d=>{NEXT_EVENT=d.nextEvent||NEXT_EVENT;SCHEDULE=d.items||SCHEDULE;renderAll();});
loadData('data/rules.json',{summary:RULES}).then(d=>{RULES=d.summary||d;renderAll();});

