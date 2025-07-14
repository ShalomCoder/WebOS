// Written by Shalom Agbongo (ask_vd)
// Window Object
function UIWindow(
  title = "New Window",
  name = "New Window",
  width = "500",
  height = "400",
  background = "#ffffffcc",
  foreground = "#010101ff",
  titleBarBackground = "#ffffffff",
  titleBarForeground = "#000000ff"
  ){
  // Declare object properties
  this.title = title;
  this.name = name;
  this.width = width;
  this.height = height;
  this.background = background;
  this.foreground = foreground;
  this.titleBarBackground = titleBarBackground;
  this.titleBarForeground = titleBarForeground;

  // Select the window area and set an ID
  this.desktop = document.querySelector("#windows");
  this.id = window.windowID++;

  // HTML and Styling for the window
  this.windowMarkup = `
      <div id="window-${this.id}" class="window backdrop-blur-sm rounded-[1.3rem] overflow-auto m-10 absolute p-[10px] shadow-[0px_0px_5px_#1113] z-[9]">
      <div id="title-bar${this.id}" class="w-full transition-colors duration-300 h-[35px] flex items-center pr-1 pl-3 cursor-move rounded-full">
          <style>
              #title-bar${this.id}:hover{
                  background-color: ${this.titleBarBackground};
                  color: ${this.titleBarColor};
              }
          </style>
          <p id="window-title${this.id}">${this.title}</p>
          <div class="ml-auto flex items-center">
          <!--<button class="w-7 h-7 rounded-full hover:bg-neutral-800 active:bg-neutral-700 mr-2" onclick="maximizeWindow(${this.id})" title="Maximize this Window"><i class="bi-arrows-fullscreen text-[6px]"></i></button>-->
          <button class="w-7 h-7 rounded-full hover:bg-red-500 hover:text-white" onclick="__$kernel_closeWindow$__(${this.id})" title="Close this Window"><i class="bi-x"></i></button>
          </div>
      </div>
      <div id="window-content${this.id}" class="text-white text-sm p-4 h-[calc(100%-35px)] overflow-y-auto"></div>
      </div>
  `;

  // Append the window to the desktop
  this.desktop.insertAdjacentHTML(`beforeend`, this.windowMarkup);

  // Select the window for object methods
  this.window = document.querySelector(`#window-${this.id}`);

  // Set the dimensions of the window
  this.window.style.width = this.width + 'px';
  this.window.style.height = this.height + 'px';
  this.window.style.backgroundColor = this.background;
  this.window.style.color = this.foreground;

  // Set the position of the window
  this.window.style.top = '10px';
  this.window.style.left = '20px';
  this.window.style.zIndex = '9';

  // Define the title bar for draggable
  this.titleBar = document.querySelector(`#title-bar${this.id}`);

  // Make the window draggable and resizable
  Draggable.create(this.window, { trigger: this.titleBar });
  
  this.resizeInstance = interact(this.window).resizable({
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

  // Add the window to the global list of open windows
  window.openWindows.push(this);


  // Define object methods and properties

  // Content property
  this.content = document.querySelector(`#window-content${this.id}`);

  // Window ID property
  this.windowID = this.id;

  // Set title method
  this.setTitle = (newTitle) => {
      this.title = newTitle;
      document.querySelector(`#window-title${this.id}`).innerHTML = newTitle;
  }

  // Set content method
  this.setContent = (content) => {
      this.content.innerHTML = content;
  }

  // Set background method
  this.setBackground = (color) => {
    this.window.style.backgroundColor = color;
  }

  // Set foreground method
  this.setForeground = (color) => {
    this.window.style.color = color;
  }

  // Set window width method
  this.setWidth = (width) => {
    this.window.style.width = width;
  }

  // Set window height method
  this.setHeight = (height) => {
    this.window.style.height = height;
  }

  // Set no resize method
  this.noResize = () => {
    this.resizeInstance.resizable(false);
  };
}

// Alert Object
function UIAlert(
  title="Alert", 
  description="System Alert!", 
  icon="bi-exclamation-triangle", 
  primaryButtonText="OK", 
  primaryButtonAction="close", 
  secondaryButtonText="Cancel", 
  secondaryButtonAction="", 
  color="#ff0"
){
  // Define object properties
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.button1 = secondaryButtonText;
    this.button2 = primaryButtonText;
    this.id = alertID++;
    this.button1Action = secondaryButtonAction;
    this.button2Action = primaryButtonAction;


    this.buttonHTML = ``;
    
    if (this.button2Action === "close"){
      this.button2Action = `__$kernel_closeAlert$__(${this.id})`;
    }

    if(this.button1 === ''){
      this.buttonHTML = `
          <button type="button" role="button" class="alert-primary-button${this.id} w-full text-center font-semibold py-2 rounded-[.7rem] bg-black hover:bg-neutral-800 active:bg-neutral-700 transition-colors duration-200 text-white" onclick="${this.button2Action}">${this.button2}</button>
      `;
    }
    else{
       this.buttonHTML = `
          <button type="button" role="button" class="alert-secondary-button${this.id} w-1/2 text-center font-semibold border-[2px] border-black text-black border-solid py-2 rounded-[.7rem] hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-200" onclick="${this.button1Action}">${this.button1}</button>
          <button type="button" role="button" class="alert-primary-button${this.id} w-1/2 text-center font-semibold py-2 rounded-[.7rem] bg-black hover:bg-neutral-800 active:bg-neutral-700 transition-colors duration-200 text-white" onclick="${this.button2Action}">${this.button2}</button>
    `;
    }


    this.alertHTML = `
    <div class="alert-container${this.id} w-vw h-screen bg-white/70 backdrop-blur-sm flex items-center justify-center fixed left-0 top-0 right-0 bottom-0" style="z-index:9999;">
      <div class="alert${this.id} w-[400px] min-h-[100px] bg-white/70 backdrop-blur-sm rounded-[1.3rem] py-4 px-5 shadow-[0px_0px_15px#1113]">
        <div class="text-right">
          <button type="button" role="button" class="w-5 h-5 rounded-full hover:bg-neutral-200 active:bg-neutral-400" onclick="__$kernel_closeAlert$__(${this.id})"><i class="bi-x"></i></button>
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
          ${this.buttonHTML}
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
        __$kernel_displayOnAlertClose$__(this.title, this.description, this.icon, this.button1, this.button2, this.color, this.id);
        return;
    }

    if(!window.alertIsOpen){
        window.alertIsOpen = true;
        return;
    }
    window.alertIsOpen = true;
}

// Toast Notification Object
function UIToast(
  title="Notification", 
  content="", 
  icon="bi-app-notification",
  iconColor="#000"
){
  //Define object properties
  this.title = title;
  this.content = content;
  this.icon = icon;
  this.duration = localStorage.getItem('notDur') * 1000;
  // For debugging
  // console.log(this.duration);
  this.id = window.toastID++;
  this.iconColor = iconColor;

  this.closeButton = ``;
  if (localStorage.getItem("autoHideToast") === "false") this.closeButton = `<button class="w-5 h-5 rounded-full ml-auto" onclick="__$kernel_hideToast$__(${this.id}, '${this.title}', '${this.content}', '${this.icon}')"><i class="bi-x"></i></button>`;

  this.notificationHTML = `
  <div id="notification${this.id}" class="w-[360px] h-fit bg-white/60 hover:bg-white/80 hover:scale-[102%] transition-all duration-200 backdrop-blur-md rounded-[1.3rem] px-4 py-3 shadow-[0px_0px_15px_#1113] hover:shadow-[0px_0px_30px_#1116] z-[99999]">
    <div class="notification-title-bar${this.id} flex">
      <p class="text-sm font-bold">${this.title}</p>
      ${this.closeButton}
    </div>
    <div class="notification-content${this.id} flex h-fit">
      <div class="notification-icon${this.id} text-5xl w-1/6 flex pt-1 justify-center" style="color:${this.iconColor}">
        <i class="${this.icon}"></i>
      </div>
      <div class="w-5/6 h-full min-h-[55px] overflow-auto ml-auto pl-4 flex items-center">
        <p class="leading-snug">${this.content}</p>
      </div>
    </div>
  </div>
  `;

  let notificationContainer = document.querySelector("#notifications");
  notificationContainer.classList.remove("hidden");
  notificationContainer.classList.add("flex");

  const f_id = this.id;
  const f_title = this.title;
  const f_content = this.content;
  const f_icon = this.icon;

  function hideThisNotification(){
    __$kernel_hideToast$__(f_id, f_title, f_content, f_icon);
  }
  
  if(window.notificationDisplayed && window.notificationDisplayed === true){
    __$kernel_displayOnNotificationClose$__(this.id, this.title, this.content, this.icon);
    window.toastID--;
    // setTimeout(hideThisNotification, this.duration);
  }
  else{
    notificationContainer.insertAdjacentHTML('beforeend', this.notificationHTML);
    notificationContainer.style.top = "35px";
    // Only hide the toast if the user sets auto hide
    if (localStorage.getItem('autoHideToast') === "true") setTimeout(hideThisNotification, this.duration);
    window.notificationDisplayed = true;
  }
}

// Function to close windows
// PLEASE FOR THE SAKE OF SANITY, FOR THE LOVE OF WebOS DO NOT OVERRIDE OR REDECLARE THESE FUNCTIONS!
// PLEASE!
function __$kernel_closeWindow$__(id){
    // Get the window
    const win = document.getElementById(`window-${id}`);
    // Stop the function if window is not found
    if (!win) return;
    // Remove the window
    win.remove();

    // Remove the window from the global list of open windows
    window.openWindows = window.openWindows.filter(w => w.windowID !== id);

    // Check if the window started a camera stream and close the stream
    if (cameraStreams.has(id)) {
        const stream = cameraStreams.get(id);
        stream.getTracks().forEach(track => track.stop());
        cameraStreams.delete(id);
    }
}

// Function to queue an alert
function __$kernel_displayOnAlertClose$__(title, description, icon, primaryButtonText, secondaryButtonText, color, id){
    function checkOpenAlert(){
        if(!window.alertIsOpen){
            __$kernel_clearAlertInterval$__();
            setTimeout(function(){
                UIAlert(title, description, icon, secondaryButtonText, primaryButtonText, color);
            }, 1000)
            return true;
        }
        return false;
    }

    window.alertInterval = setInterval(checkOpenAlert, 1000);
}

// Function to clear the alert interval
function __$kernel_clearAlertInterval$__(){
  clearInterval(window.alertInterval);
}

// Function to close an alert
function __$kernel_closeAlert$__(id){
  document.querySelector(`.alert-container${id}`).remove();
  document.querySelector(`.alert-container${id}`).style.top = '-3000px';
  window.alertIsOpen = false;
}

// Function to hide a toast
function __$kernel_hideToast$__(id, title, content, icon){
  // Get and empty the notification container
  let notificationContainer = document.querySelector('#notifications');
  notificationContainer.innerHTML = "";
  notificationContainer.classList.remove("flex");
  notificationContainer.classList.add("hidden");

  // Change the global notification displayed state to false
  window.notificationDisplayed = false;

  // Later implementation
  // Check if another notification with the same ID has already been pushed by the user manually closing the toast
  window.notificationPile.push({id: id, title: title, content: content, icon: icon});
}

function __$kernel_displayOnNotificationClose$__(id, title, content, icon){
  function displayNotification(){
    if(!window.notificationDisplayed) {
      setTimeout(function(){new PushNotification(title, content, icon);}, 500);
      clearPushInterval();
      return true;
    }
    return false;
  }

  window.pushInterval = setInterval(displayNotification);
}

function __$kernel_clearPushInterval$__(){
  clearInterval(window.pushInterval);
}

// Function to render the notifications in the notification menu
function __$kernel_renderNotifications$__(){
    const notifications = window.notificationPile;
    const notificationCenter = document.querySelector("#notification-center");

    notificationCenter.innerHTML = '';

    notifications.forEach(n => {
        let notificationHTML = `
        <div id="notification${n.id}" class="w-full h-fit bg-white/60 hover:bg-white/80 hover:scale-[102%] transition-all duration-200 backdrop-blur-md rounded-[1.1rem] px-4 py-3 shadow-[0px_0px_15px_#1113] hover:shadow-[0px_0px_30px_#1116] z-[99999]">
            <div class="notification-title-bar flex">
                <p class="text-sm font-bold">${n.title}</p>
                <button class="w-5 h-5 rounded-full ml-auto" onclick="__$kernel_removeNotification$__(${n.id})"><i class="bi-x"></i></button>
            </div>
            <div class="notification-content flex h-fit">
                <div class="notification-icon text-5xl w-1/6 flex pt-1 justify-center">
                <i class="${n.icon}"></i>
                </div>
                <div class="w-5/6 h-full min-h-[55px] overflow-auto ml-auto pl-4 flex items-center">
                <p class="leading-snug">${n.content}</p>
                </div>
            </div>
        </div>
        `;

        notificationCenter.insertAdjacentHTML('beforeend', notificationHTML);
    });

    if (notifications.length < 1) notificationCenter.innerHTML = `<p class="w-full h-full flex items-center justify-center text-white font-bold">No notifications</p>`;
}

function __$kernel_removeNotification$__(id){
    window.notificationPile = window.notificationPile.filter(n => n.id !== id);
    __$kernel_renderNotifications$__();
}

window.webos = {
    lockscreen: function(){
        location.href = './lockscreen.php';
    },
    settings: function(){
        openSettings();
    },
    logout: function(){
        location.href = './index.php';
    },
    refresh: function(){
        location.reload();
    }
}