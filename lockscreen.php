<?php
  session_start();
  if (isset($_GET["keysnap"]) && $_GET["keysnap"] == "wrongpassword"){
    $keysnap = `<p class="mb-2 text-[#f00]">Wrong Username or Password!</p>`;
  }
  else{
    $keysnap = '';
  }
  $_SESSION["logged_in"] = false;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Locked - WebOS</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="bootstrap-icons.css" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <style>
    body {
      background: #f00;
      background-size: cover;
      overflow: clip;
    }
    .glass {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 1.5rem;
      /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25); */
    }
  </style>
</head>
<body class="flex items-center justify-center min-h-screen">

  <div class="glass p-10 w-[90%] max-w-md text-center text-black">
    <i class="bi-display text-5xl mb-4 text-black/90"></i>
    <h1 class="text-2xl font-bold mb-2">WebOS is locked</h1>
    <form action="login.php" method="POST" class="flex flex-col items-center space-y-2">
      <input type="text" name="username" placeholder="Username" required 
        class="w-full h-10 rounded-full px-4 bg-black/50 placeholder-white text-white outline-none focus:ring-2 focus:ring-white" />

      <input type="password" name="password" placeholder="Password" required 
        class="w-full h-10 rounded-full px-4 bg-black/50 placeholder-white text-white outline-none focus:ring-2 focus:ring-white" />

        <button type="submit" class="ml-auto text-nowrap py-1 px-4 bg-black/50 hover:bg-neutral-900 transition-colors duration-200 text-white font-semibold text-center rounded-full flex items-center">
        <i class="bi-box-arrow-in-right mr-2 text-2xl"></i> Log In
      </button>
    </form>
  </div>

</body>
</html>
