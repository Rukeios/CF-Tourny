function line(label, value, href){
  if(!value) return '';
  const v = href ? '<a href="' + href + '">' + esc(value) + '</a>' : esc(value);
  return '<tr><td>' + esc(label) + '</td><td>' + v + '</td></tr>';
}

function renderContact(){
  /* primary contact card */
  const c = document.getElementById('primary');
  let h = '';
  if(CONTACT.email){
    h += '<a class="big" href="mailto:' + esc(CONTACT.email) + '">' +
         esc(CONTACT.email) + '</a><br>';
  }
  if(CONTACT.phone){
    h += '<a class="big" href="tel:' +
         esc(CONTACT.phone.replace(/[^0-9+]/g,'')) + '">' +
         esc(CONTACT.phone) + '</a><br>';
  }
  if(!h){
    h = '<div class="none">Email and phone are being set up. ' +
        'Until then, the fastest way to reach us is Discord.</div>';
  } else if(CONTACT.hours){
    h += '<div style="color:var(--muted);font-size:14px;margin-top:6px">' +
         esc(CONTACT.hours) + '</div>';
  }
  c.innerHTML = h;

  /* business details table */
  let t = '';
  t += line('Organisation', CONTACT.business || 'CaribbeanFye');
  t += line('Location', CONTACT.location);
  t += line('Email', CONTACT.email,
            CONTACT.email ? 'mailto:' + CONTACT.email : null);
  t += line('Phone', CONTACT.phone,
            CONTACT.phone ? 'tel:' + CONTACT.phone.replace(/[^0-9+]/g,'') : null);
  t += line('Discord', 'Join the server', DISCORD_INVITE);
  document.getElementById('biz').innerHTML =
    '<table class="biz-table">' + t + '</table>';

  /* social cards */
  const names = {tiktok:['TikTok','Gameplay edits and highlights'],
                 youtube:['YouTube','Full matches and recaps'],
                 instagram:['Instagram','Announcements and clips'],
                 twitter:['X','Live updates on match nights'],
                 twitch:['Twitch','Streamed events']};
  let s = '';
  Object.keys(names).forEach(k => {
    const url = SOCIAL[k];
    if(!url || url === '#') return;
    s += '<a class="cbox" href="' + url + '" target="_blank" rel="noopener">' +
         '<h3>' + names[k][0] + '</h3><p>' + names[k][1] + '</p></a>';
  });
  document.getElementById('social').innerHTML = s
    ? '<div class="cards">' + s + '</div>'
    : '<div class="cbox"><div class="none">Social accounts are not live yet. ' +
      'Everything happens in the Discord for now.</div></div>';
}


function renderAll(){renderContact();}

