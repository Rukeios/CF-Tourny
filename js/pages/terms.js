const UPDATED = "September 2026";

const SECTIONS = [
 {h:"Who we are", p:[
  "CaribbeanFye is an independent community organisation running competitive events for Dunk City Dynasty and other games.",
  "We are not affiliated with, endorsed by, or sponsored by NetEase, the NBA, the NBPA, or any other rights holder. All game trademarks belong to their owners."
 ]},
 {h:"Taking part", p:[
  "You must be 18 or older to register or compete.",
  'Participation means agreeing to the <a href="rules.html" style="color:var(--coral)">league rules</a> as they stand at the time of the event.',
  "We may refuse or remove any participant whose conduct damages the community. That decision sits with league staff."
 ]},
 {h:"Entry and prizes", p:[
  "Events are currently free to enter. Any prize is stated before the event begins.",
  "If paid entry is introduced, the fee, the prize, and the refund terms will be published before signups open.",
  "Prizes are paid to the registered team captain unless stated otherwise. How a team divides a prize internally is between the team and its members.",
  "We are not party to any agreement between an organisation and its players."
 ]},
 {h:"Results", p:[
  "Results are decided by the reported screenshot and, where disputed, by the league recording.",
  "Staff decisions on disputes are final for that event. Repeated or serious matters can be appealed through a ticket."
 ]},
 {h:"Predictions", p:[
  "The prediction system uses community currency with no cash value.",
  "It cannot be bought, sold, exchanged, or converted into anything of value.",
  "It is a game within the community, not a wagering product."
 ]},
 {h:"Content", p:[
  "By competing you agree that we may record, stream, and publish footage of your matches for league content.",
  "You keep ownership of anything you create. Posting it in our channels gives us permission to share it with credit.",
  "Do not post content you do not have the right to post."
 ]},
 {h:"Availability", p:[
  "This site and these events are provided as they are. We run them as carefully as we can, but we cannot promise uninterrupted service.",
  "Schedules, formats, and structures may change between seasons. Changes are announced before they take effect."
 ]},
 {h:"Changes to these terms", p:[
  "We may update these terms. Material changes are announced in the announcements channel."
 ]},
 {h:"Contact", p:[
  'Questions go to the <a href="contact.html" style="color:var(--coral)">contact page</a> or to staff in Discord.'
 ]}
];
function drawSections(){
document.getElementById("body").innerHTML = SECTIONS.map(s => '<div class="sec"><h3>' + esc(s.h) + '</h3>' + s.p.map(x => '<p>' + x + '</p>').join("") + '</div>').join("");
document.getElementById("updated").textContent = "Last updated: " + UPDATED;
}


function renderAll(){drawSections();}

