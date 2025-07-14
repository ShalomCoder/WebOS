<?php
session_start();
if($_SESSION["logged_in"] == true){
  echo "";
}
else{
  header("Location: ./index.php");
  exit;
}

$userhash = $_SESSION["userhash"];
?>
<!DOCTYPE html>
<html lang="en" oncontextmenu="return false;">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="bootstrap-icons.css" />
  <script src="./gsap/minified/gsap.min.js"></script>
  <script src="./gsap/minified/Draggable.min.js"></script>
  <script src="./interact.min.js"></script>
  <script src="./dayjs.min.js"></script>
  <script>gsap.registerPlugin(Draggable)</script>
  <script src="./kernel.js"></script>
  <script src="./apps/store.webapp"></script>
  <script src="./apps/settings.webapp"></script>
  <script src="./apps/task-manager.webapp"></script>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <title>WebOS</title>
</head>
<div class="hidden md:block" id="desktop">
<body class="overflow-clip h-screen w-vw bg-no-repeat" onload="init()">

  <div id="top-bar" class="flex items-center px-2 py-1 fixed top-0 left-0 right-0 w-full h-[35px] bg-white/30 backdrop-blur-md z-[99999] cursor-default select-none">
    <div id="username-container">
      <p id="username" class="text-sm font-bold"></p>
    </div>
    <div id="time-container" class="bg-transparent ml-auto flex items-center space-x-1">
      <div class="mr-3">
        <!-- <i class="bi-app-indicator"></i> -->
        <!-- <div id="notification-count-outer" class="text-xs bg-white/70 hover:bg-white transition-colors duration-200 cursor-default text-black w-5 h-5 flex items-center justify-center text-center rounded-full font-bold"><span id="notification-count" class="w-full h-full"></span></div> -->
      </div>
      <p id="time" class="text-sm font-light hover:bg-white/30 transition-colors duration-200 rounded-full px-2 py-px"></p>
      <p id="notifications-toggle" class="hover:bg-white/30 transition-colors duration-200 w-6 h-6 text-center rounded-full"><i class="bi-bell"></i> </p>
      <p id="power-menu-toggle" class="hover:bg-white/30 transition-colors duration-200 w-6 h-6 text-center rounded-full"><i class="bi-power"></i> </p>
    </div>
  </div>

  <div id="power-menu" class="w-fit min-h-[100px] bg-white/60 fixed top-[45px] right-[10px] rounded-[1.3rem] shadow-[0px_0px_15px_#1113] backdrop-blur-md z-[9999] p-3">
    <div id="power-menu-grid" class="grid grid-cols-2 gap-2">
      <div id="power-log-out" class="w-full bg-white/50 h-[75px] px-6 rounded-[1rem] flex flex-col items-center justify-center hover:bg-white/70 transition-colors duration-200 cursor-pointer shadow-[0px_0px_15px_#1113]" onclick="webos.logout()">
        <i class="power-icon bi-arrow-bar-right text-2xl"></i>
        <p class="power-text">Logout</p>
      </div>

      <div id="power-lock" class="w-full bg-white/50 h-[75px] px-6 rounded-[1rem] flex flex-col items-center justify-center hover:bg-white/70 transition-colors duration-200 cursor-pointer shadow-[0px_0px_15px_#1113]" onclick="webos.lockscreen()">
        <i class="power-icon bi-lock text-2xl"></i>
        <p class="power-text">Lock</p>
      </div>

      <div id="power-refresh" class="w-full bg-white/50 py-2 px-3 rounded-[1rem] flex flex-row items-center hover:bg-white/70 transition-colors duration-200 cursor-pointer col-span-2 shadow-[0px_0px_15px_#1113]" onclick="webos.refresh()">
        <i class="power-icon bi-arrow-counterclockwise text-lg"></i>
        <p class="power-text ml-2">Refresh</p>
      </div>

      <div id="power-settings" class="w-full bg-white/50 py-2 px-3 rounded-[1rem] flex flex-row items-center hover:bg-white/70 transition-colors duration-200 cursor-pointer col-span-2 shadow-[0px_0px_15px_#1113]" onclick="webos.settings()">
        <i class="power-icon bi-gear text-lg"></i>
        <p class="power-text ml-2">Settings</p>
      </div>

      <div id="power-shutdown" class="w-full bg-white/50 h-[75px] px-6 rounded-[1rem] flex flex-col items-center justify-center hover:bg-[#f00]/80 hover:text-white font-bold transition-colors duration-200 cursor-pointer col-span-2 text-[#f00] shadow-[0px_0px_15px_#1113]">
        <i class="power-icon bi-power text-2xl"></i>
        <p class="power-text">Shutdown</p>
      </div>
    </div>
  </div>

  <div id="notifications" class="w-vw z-[99999] fixed top-[-3000px] min-h-[1px] right-0 left-0 p-4 items-center justify-center space-y-5 overflow-auto hidden transition-all duration-500">
  </div>

  <div id="notification-center" class="space-y-3 min-h-fit max-h-[460px] overflow-auto p-6 w-[400px] bg-white/50 fixed right-[10px] top-[45px] rounded-[1.3rem] backdrop-blur-md z-[99999] shadow-[0px_0px_20px_#1113]">
    <!-- <p class="font-bold py-2 px-4 backdrop-blur-sm rounded-full z-[999] bg-white text-black">Notifications</p> -->
  </div> 

  <div id="taskbar-container-container" class="flex justify-center z-[99999] select-none">
    <div id="taskbar-container" class="w-fit fixed bottom-2 space-x-2 flex z-[99999]">
      <div id="dock" class="w-fit px-3 h-[70px] bg-white/70 backdrop-blur-sm transition-all duration-300 mx-auto bottom-2 rounded-full flex justify-center items-center flex-row space-x-3 z-[9998] shadow-[0px_0px_20px_#1113]">
      </div>


      <script src="./boot.js"></script>
      <script>bootWebOS("<?php echo $userhash; ?>")</script>

      <div id="dock2"  class="w-fit px-3 h-[70px] bg-white/70 backdrop-blur-sm transition-all duration-300 mx-auto bottom-2 rounded-full flex justify-center items-center flex-row space-x-3 z-[9998] shadow-[0px_0px_20px_#1113]">
        <div class="icon bg-white/50 text-black hover:bg-white backdrop-blur-md transition-colors duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow-[0px_0px_7px_#1114]" title="Task Manager" onclick="newTaskManagerWindow()"><i class="bi-cpu text-2xl"></i></div>
        <div class="icon bg-white/50 hover:bg-white backdrop-blur-md transition-colors duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow-[0px_0px_7px_#1113]" title="Store" onclick="newStoreWindow()"><i class="bi-shop-window text-2xl"></i></div>
        <div class="icon bg-white/50 text-black hover:bg-white backdrop-blur-md transition-colors duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow-[0px_0px_7px_#1114]" title="Settings" onclick="openSettings()"><i class="bi-gear text-2xl"></i></div>
      </div>
    </div>
  </div>

  <div id="windows" class="w-vw h-screen z-[9]">
  </div>

  <script>
    // openSettings();
  </script>
</div>


<div class="md:hidden flex flex-col items-center justify-center w-vw h-screen">
  <p class="font-bold text-white text-5xl">Web OS</p>
  <p class="font-semibold text-white text-xl mt-6 text-center max-w-[600px] mx-auto px-5">This screen size is not recommended for WebOS. <br> <a href="./index-bypass.html" class="underline">Continue anyway</a></p>
</div>
</body>
</html>