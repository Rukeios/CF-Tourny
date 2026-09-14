const TEAM_FORM = "";        /* team registration form link */
const AGENT_FORM = "";       /* free agent form link */
const EMBED = false;
/* ========================================================= */

function embedUrl(u){
  if(!u) return "";
  return u.indexOf("?") > -1 ? u + "&embedded=true" : u + "?embedded=true";
}

function formBlock(url, label, cls){
  if(!url){
    return '<div class="soon">Registration opens shortly. ' +
           'Join the Discord and you will hear first.</div>';
  }
  if(EMBED){
    return '<div class="embed"><iframe src="' + embedUrl(url) +
           '" loading="lazy">Loading...</iframe></div>';
  }
  return '<a class="btn ' + cls + '" href="' + url +
         '" target="_blank" rel="noopener">' + label + '</a>';
}

function drawJoin(){
document.getElementById('team-form').innerHTML =
  formBlock(TEAM_FORM, 'Register a team', 'go');
document.getElementById('agent-form').innerHTML =
  formBlock(AGENT_FORM, 'Register as a free agent', 'coral');
}


function renderAll(){drawJoin();}

