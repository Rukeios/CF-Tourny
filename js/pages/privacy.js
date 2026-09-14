const UPDATED = "September 2026";

const SECTIONS = [
 {h:"What we collect", p:[
  "When you register a team or sign up as a free agent, we collect your Discord username, your in-game name, your region, your availability, and your confirmation that you are 18 or older.",
  "When you join the Discord server, Discord itself holds your account information under its own privacy policy. We see your username, your roles, and anything you post in the server.",
  "We record match sessions for dispute resolution and for content. Those recordings show in-game names and gameplay, not personal information."
 ]},
 {h:"What we do not collect", p:[
  "We do not collect email addresses through our signup forms.",
  "We do not collect payment information. We do not process payments.",
  "We do not use tracking cookies or advertising networks on this site."
 ]},
 {h:"Why we collect it", p:[
  "To verify that a roster is eligible, that every player is 18 or older, and that nobody is signed to two teams at once.",
  "To assign the right roles in Discord and schedule matches.",
  "To confirm results, since screenshots show in-game names and we need to match those to registered players."
 ]},
 {h:"Where it lives", p:[
  "Signup responses are stored in Google Forms and Google Sheets, subject to Google's privacy policy.",
  "Community activity lives in Discord, subject to Discord's privacy policy.",
  "Match recordings are stored by the league and are not published in full without reason."
 ]},
 {h:"Who can see it", p:[
  "In-game names, team names, and results are public within the community. That is the nature of a competitive league.",
  "Discord usernames and availability are visible to league staff.",
  "We do not sell, rent, or share your information with third parties for marketing."
 ]},
 {h:"Age", p:[
  "This community is for people aged 18 and over. We do not knowingly collect information from anyone under 18.",
  "If you believe someone under 18 has registered, contact us and we will remove them and their data."
 ]},
 {h:"Your choices", p:[
  "You can ask us to remove your registration and your data at any time. Contact us and we will do it.",
  "Leaving the Discord server removes your access but does not automatically delete past messages or registration records. Ask if you want those removed too.",
  "Match results and standings from completed seasons are part of the competitive record and are generally kept."
 ]},
 {h:"Changes", p:[
  "If this policy changes in a way that matters, we will say so in the announcements channel rather than quietly editing this page."
 ]},
 {h:"Contact", p:[
  'Questions about any of this go to the addresses on the <a href="contact.html" style="color:var(--coral)">contact page</a>, or to staff in Discord.'
 ]}
];
function drawSections(){
document.getElementById("body").innerHTML = SECTIONS.map(s => '<div class="sec"><h3>' + esc(s.h) + '</h3>' + s.p.map(x => '<p>' + x + '</p>').join("") + '</div>').join("");
document.getElementById("updated").textContent = "Last updated: " + UPDATED;
}


function renderAll(){drawSections();}

