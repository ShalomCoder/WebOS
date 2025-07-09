// Built by Agbongo Shalom Kwame (ask_vd)

windowID = 1;
alertID = 1;

function closeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;
  win.remove();

  // Remove from global registry
  window.openWindows = window.openWindows.filter(w => w.windowID !== id);
}

function maximizeWindow(id) {
  const win = document.querySelector(`#window-${id}`);
  if (!win) return;

  const isMaximized = win.classList.contains("maximized");

  if (!isMaximized) {
    // Convert current bounding box into fixed dimensions
    const rect = win.getBoundingClientRect();

    // Lock it in place by setting inline styles
    win.style.position = "fixed";
    win.style.left = `${rect.left}px`;
    win.style.top = `${rect.top}px`;
    win.style.width = `${rect.width}px`;
    win.style.height = `${rect.height}px`;

    // Save current values to restore later
    win.dataset.prevLeft = win.style.left;
    win.dataset.prevTop = win.style.top;
    win.dataset.prevWidth = win.style.width;
    win.dataset.prevHeight = win.style.height;

    // Maximize
    win.style.left = "0px";
    win.style.top = "55px"; // Assuming top bar height
    win.style.width = "100vw";
    win.style.height = "calc(100vh - 55px)";
    win.classList.add("maximized");

    Draggable.get(win)?.disable();
  } else {
    // Restore saved dimensions
    win.style.left = win.dataset.prevLeft;
    win.style.top = win.dataset.prevTop;
    win.style.width = win.dataset.prevWidth;
    win.style.height = win.dataset.prevHeight;
    win.classList.remove("maximized");

    Draggable.get(win)?.enable();
  }
}

function AppWindow(title="New Window", name="New Window", w=600, h=400, bg= "rgba(0, 0, 0, .7)", fg="#fff", titlebg="#000000e6", titlefg="#fff"){
    this.title = title;
    this.name = name;
    this.width = w;
    this.height = h;
    this.background = bg;
    this.foreground = fg;
    this.titleBarBackground = titlebg;
    this.titleBarColor = titlefg;

    this.windowContainer = document.querySelector("#windows");
    this.id = windowID++;

    this.windowHTML = `
        <div id="window-${this.id}" class="window backdrop-blur-sm rounded-[1.3rem] overflow-auto m-10 absolute p-[10px] shadow-[0px_0px_5px_#1113]" style="top:10px; left:10px;">
        <div id="title-bar${this.id}" class="w-full transition-colors duration-300 h-[35px] flex items-center pr-1 pl-3 cursor-move rounded-full">
            <style>
                #title-bar${this.id}:hover{
                    background-color: ${this.titleBarBackground};
                    color: ${this.titleBarColor};
                }
            </style>
            <p id="window-title${this.id}">${this.title}</p>
            <div class="ml-auto flex items-center">
            <button class="w-7 h-7 rounded-full hover:bg-neutral-800 active:bg-neutral-700 mr-2" onclick="maximizeWindow(${this.id})" title="Maximize this Window"><i class="bi-arrows-fullscreen text-[6px]"></i></button>
            <button class="w-7 h-7 rounded-full hover:bg-red-500 hover:text-white" onclick="closeWindow(${this.id})" title="Close this Window"><i class="bi-x"></i></button>
            </div>
        </div>
        <div id="window-content${this.id}" class="text-white text-sm p-4 h-[calc(100%-35px)] overflow-y-auto"></div>
        </div>
    `;

    this.windowContainer.insertAdjacentHTML("beforeend", this.windowHTML);

    this.window = document.querySelector(`#window-${this.id}`);
    this.titleBar = document.querySelector(`#title-bar${this.id}`);
    
    this.window.style.width = this.width + 'px';
    this.window.style.height = this.height + 'px';
    this.window.style.backgroundColor = this.background;
    this.window.style.color = this.foreground;
    
    Draggable.create(this.window, { trigger: this.titleBar });
    
    interact(this.window).resizable({
        edges: { left: true, right: true, bottom: true, top: false },
        listeners: {
            move(event) {
                let { x, y } = event.target.dataset;

        x = parseFloat(x) || 0;
        y = parseFloat(y) || 0;

        // update the element's style
        event.target.style.width = `${event.rect.width}px`;
        event.target.style.height = `${event.rect.height}px`;

        const left = (parseFloat(event.target.style.left) || 0) + event.deltaRect.left;
        const top = (parseFloat(event.target.style.top) || 0) + event.deltaRect.top;
        
        event.target.style.left = `${left}px`;
        event.target.style.top = `${top}px`;
        
    }
},
modifiers: [
    interact.modifiers.restrictSize({
        min: { width: 300, height: 200 }
    })
],
inertia: true
});

    this.content = document.querySelector(`#window-content${this.id}`);

    this.setTitle = (newTitle) => {
        this.title = newTitle;
        document.querySelector(`#window-title${this.id}`).innerHTML = newTitle;
    }

    this.windowID = this.id;

    this.setContent = (markup) => {
        this.content.innerHTML = markup;
    }

    // Track in global window list
    if (!window.openWindows) window.openWindows = [];
    window.openWindows.push(this);

}

function AlertWindow(title="Alert", description="System Alert!", icon="bi-exclamation-triangle", secondaryButtonText="Cancel", primaryButtonText="OK", color="#ff0"){
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.button1 = secondaryButtonText;
    this.button2 = primaryButtonText;
    this.id = alertID++;

    this.alertHTML = `
    <div class="alert-container${this.id} w-vw h-screen bg-white/90 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div class="alert${this.id} w-[400px] min-h-[100px] bg-white/70 backdrop-blur-sm rounded-[1.3rem] py-4 px-5">
        <div class="text-right">
          <button type="button" role="button" class="w-5 h-5 rounded-full hover:bg-neutral-200 active:bg-neutral-400" onclick="closeAlert(${this.id})"><i class="bi-x"></i></button>
        </div>
        <div class="flex items-center">
          <div class="alert-icon${this.id} mr-5">
            <i class="${icon} text-6xl" style="color:${this.color}"></i>
          </div>
          <div class="alert-text${this.id}">
            <p class="alert-title${this.id} font-bold text-md">${this.title}</p>
            <p>${this.description}</p>
          </div>
        </div>
        <div class="alert-buttons${this.id} w-full mt-3 flex space-x-2">
          <button type="button" role="button" class="alert-secondary-button${this.id} w-1/2 text-center font-semibold border-[2px] border-black text-black border-solid py-1 rounded-[.7rem] hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-200">${this.button1}</button>
          <button type="button" role="button" class="alert-primary-button${this.id} w-1/2 text-center font-semibold py-1 rounded-[.7rem] bg-black hover:bg-neutral-800 active:bg-neutral-700 transition-colors duration-200 text-white">${this.button2}</button>
        </div>
      </div>
    </div>
    `;

    //Check if another alert is open before displaying this one
    if (window.alertIsOpen === false || !window.alertIsOpen){
        document.querySelector('#windows').insertAdjacentHTML('beforeend', this.alertHTML);
    }
    else{
        alertID--;
        displayOnAlertClose(this.title, this.description, this.icon, this.button1, this.button2, this.color, this.id);
        return;
    }

    if(!window.alertIsOpen){
        window.alertIsOpen = true;
        return;
    }
    window.alertIsOpen = true;
}

function displayOnAlertClose(title, description, icon, primaryButtonText, secondaryButtonText, color, id){
    function checkOpenAlert(){
        if(!window.alertIsOpen){
            clearAlertInterval();
            setTimeout(function(){
                AlertWindow(title, description, icon, secondaryButtonText, primaryButtonText, color);
            }, 1000)
            return true;

        }
        return false;
    }

    window.alertInterval = setInterval(checkOpenAlert, 1000);
}

function clearAlertInterval(){
    clearInterval(window.alertInterval);
}

function closeAlert(id){
    document.querySelector(`.alert-container${id}`).remove();
    window.alertIsOpen = false;
}