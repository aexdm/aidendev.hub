const userId = "853310319002517524";

document.getElementById("bannerImg").src =
  "https://i.pinimg.com/1200x/f0/d6/78/f0d678abc0a35a63dd7aa5c9381d4086.jpg";

function switchTab(tabId){
  document.querySelectorAll(".tab").forEach(t=> t.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

const ws = new WebSocket("wss://api.lanyard.rest/socket");
const colors = {online:"#43b581", idle:"#faa61a", dnd:"#f04747", offline:"gray"};

ws.onopen = ()=> ws.send(JSON.stringify({op:2, d:{subscribe_to_id:userId}}));
ws.onmessage = e=>{
  const msg = JSON.parse(e.data);
  if(msg.op!==0) return;
  const d = msg.d;
  const u = d.discord_user;

  document.getElementById("avatarBig").src =
    `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`;
  document.getElementById("username").textContent = u.global_name||u.username;
  document.getElementById("statusText").textContent = d.discord_status;
  document.getElementById("statusDot").style.background = colors[d.discord_status]||"gray";

  const act = d.activities?.find(a=>a.type===0);
  const card = document.getElementById("activityCard");
  if(act){
    card.classList.remove("hidden");
    document.getElementById("activityName").textContent = act.name||"";
    document.getElementById("activityState").textContent = act.state||act.details||"";
    if(act.assets?.large_image){
      const img = act.assets.large_image;
      document.getElementById("activityIcon").src = img.startsWith("mp:external/")
        ? `https://media.discordapp.net/external/${img.split("mp:external/")[1]}`
        : `https://cdn.discordapp.com/app-assets/${act.application_id}/${img}.png`;
    } else document.getElementById("activityIcon").src = "";
  } else card.classList.add("hidden");
};

function openSettings(){
  const modal = document.getElementById("settingsModal");
  modal.classList.remove("hidden");
  modal.querySelector(".modal-box").classList.add("pop");
}
function closeSettings(){
  const modal = document.getElementById("settingsModal");
  modal.classList.add("hidden");
  modal.querySelector(".modal-box").classList.remove("pop");
}

const words = ["Money","Roblox","Art","Friends","Idk","Myself","My phone","Lua","Drawing","Fashion"];
let i=0;
setInterval(()=>{
  const el = document.getElementById("aboutWord");
  if(!el) return;
  el.style.opacity = 0;
  setTimeout(()=>{
    el.textContent = words[i];
    el.style.opacity = 1;
    i=(i+1)%words.length;
  },300);
},1800);