document.body.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    return false;
  }
});

window.windowID = 1;
window.alertID = 1;
window.toastID = 1;
window.openWindows = [];
window.appRegistry = [];
window.notificationPile = [];

window.dock = {
  addAppIcon: function (bootstrapIconClass, appName, launchFunction, iconColor = '#000') {
    const dockElement = document.getElementById("dock");
    if (!dockElement) {
      console.warn("Dock element not found");
      return;
    }

    const iconDiv = document.createElement("div");
    iconDiv.className =
      "icon bg-white/50 text-black hover:bg-white backdrop-blur-md transition-colors duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow-[0px_0px_7px_#1114]";
    iconDiv.title = appName;
    iconDiv.onclick = launchFunction;

    const icon = document.createElement("i");
    icon.className = `${bootstrapIconClass} text-2xl`;
    icon.style.color = iconColor;

    iconDiv.appendChild(icon);
    dockElement.appendChild(iconDiv);
  },
};

// Boot WebOS for current user
async function bootWebOS(username) {
  const res = await fetch(`./userfiles/${username}/user.json`);
  const user = await res.json();

  if(user.installedApps == []){
    document.getElementById("dock").style.display = "none";
  }

  for (const file of user.installedApps) {
    const script = document.createElement("script");
    script.src = `/apps/${file}`;
    script.defer = true;
    document.body.appendChild(script);
  }

  document.getElementById("username").innerHTML = "WebOS &dash; " + user.username;
  sessionStorage.setItem("uh", username);
}

function registerAppMetadata(appInfo) {
  // Save for task manager, terminal, etc.
  const protectedApps = [];
  window.appRegistry.push(appInfo);

  // Show on dock
  if (window.dock && typeof dock.addAppIcon === "function") {
    dock.addAppIcon(appInfo.icon, appInfo.name, appInfo.run, appInfo.iconColor);
  }
}

function init(){
    const timeElement = document.getElementById('time');
    const topBar = document.getElementById('top-bar')

    let bgColor = localStorage.getItem('bgColor');
    let timeColor = localStorage.getItem('timeColor');

    if(bgColor && timeColor){
        document.body.style.background = bgColor;
        topBar.style.color = timeColor;
    }
    else{
        localStorage.setItem('bgColor', '#f00');
        localStorage.setItem('timeColor', '#fff');

        document.body.style.background = '#f00';
        topBar.style.color = '#fff';
    }

    
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    };
    
    updateTime();
    setInterval(updateTime, 30000);
}

const powerToggleBtn = document.getElementById("power-menu-toggle");
const powerMenu = document.getElementById("power-menu");

// Hide by default (if not already styled that way)
powerMenu.style.display = "none";

powerToggleBtn.addEventListener("click", () => {
  if (powerMenu.style.display === "none") {
    powerMenu.style.display = "block";
  } else {
    powerMenu.style.display = "none";
  }
});

// Optional: click outside to close
document.addEventListener("click", (e) => {
  if (!powerMenu.contains(e.target) && !powerToggleBtn.contains(e.target)) {
    powerMenu.style.display = "none";
  }
});

const notificationToggleBtn = document.getElementById("notifications-toggle");
const notificationMenu = document.getElementById("notification-center");

// Hide by default (if not already styled that way)
notificationMenu.style.display = "none";

notificationToggleBtn.addEventListener("click", () => {
  if (notificationMenu.style.display === "none") {
    __$kernel_renderNotifications$__();
    notificationMenu.style.display = "block";
  } else {
    notificationMenu.style.display = "none";
  }
});

// Optional: click outside to close
document.addEventListener("click", (e) => {
  if (!notificationMenu.contains(e.target) && !notificationToggleBtn.contains(e.target)) {
    notificationMenu.style.display = "none";
  }
});