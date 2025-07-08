window.appRegistry = [];

window.dock = {
  addAppIcon: function (bootstrapIconClass, appName, launchFunction) {
    const dockElement = document.getElementById("dock");
    if (!dockElement) {
      console.warn("Dock element not found");
      return;
    }

    const iconDiv = document.createElement("div");
    iconDiv.className =
      "icon bg-white/50 text-black hover:bg-white backdrop-blur-md transition-colors duration-200 w-12 h-12 flex items-center justify-center rounded-full";
    iconDiv.title = appName;
    iconDiv.onclick = launchFunction;

    const icon = document.createElement("i");
    icon.className = `${bootstrapIconClass} text-2xl`;

    iconDiv.appendChild(icon);
    dockElement.appendChild(iconDiv);
  },
};
// Register an app in the WebOS system

function registerAppMetadata(appInfo) {
  // Save for task manager, terminal, etc.
  window.appRegistry.push(appInfo);

  // Show on dock
  if (window.dock && typeof dock.addAppIcon === "function") {
    dock.addAppIcon(appInfo.icon, appInfo.name, appInfo.run);
  }
}

// Boot WebOS for current user
async function bootWebOS(username) {
  const res = await fetch(`/accounts/${username}.json`);
  const user = await res.json();

  for (const file of user.installedApps) {
    const script = document.createElement("script");
    script.src = `/apps/${file}`;
    script.defer = true;
    document.body.appendChild(script);
  }

  document.getElementById("username").textContent = user.username;
}