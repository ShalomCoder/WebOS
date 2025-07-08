// Built by Agbongo Shalom Kwame (ask_vd)

windowID = 1;

function closeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;
  win.remove();

  // Remove from global registry
  window.openWindows = window.openWindows.filter(w => w.windowID !== id);
}

function AppWindow(title="New Window", w=600, h=400, bg= "rgba(0, 0, 0, .7)", fg="#fff", titlebg="#000000e6", titlefg="#fff"){
    this.title = title;
    this.width = w;
    this.height = h;
    this.background = bg;
    this.foreground = fg;
    this.titleBarBackground = titlebg;
    this.titleBarColor = titlefg;

    this.windowContainer = document.querySelector("#windows");
    this.id = windowID++;

    this.windowHTML = `
        <div id="window-${this.id}" class="window rounded-[1.3rem] overflow-auto m-10 absolute p-[10px] shadow-[0px_0px_5px_#1113]" style="top:10px; left:10px;">
        <div id="title-bar${this.id}" class="w-full transition-colors duration-300 h-[35px] flex items-center pr-1 pl-3 cursor-move rounded-full">
            <style>
                #title-bar${this.id}:hover{
                    background-color: ${this.titleBarBackground};
                    color: ${this.titleBarColor};
                }
            </style>
            <p id="window-title${this.id}">${this.title}</p>
            <div class="ml-auto flex items-center">
            <!--<button class="text-white w-7 h-7 rounded-full hover:bg-neutral-800 active:bg-neutral-700 mr-2" onclick="maximizeWindow(this)" title="Close this Window"><i class="bi-square text-[5px]"></i></button>-->
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