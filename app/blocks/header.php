<?php 
include 'app/blocks/connect.php';
include 'app/func/name.php';
?>
<!DOCTYPE html>
<html lang="EN">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
<meta name="description" content="Get a wide range of popular software cheats for free at <?php echo $your_string; ?>! Explore our extensive database of well-known and premium cheats, all available at no cost. Find cheats for top software like Adobe Photoshop, Aida, Figma, and many more.">
<meta name="keywords" content="Free cheat collection, popular software cheats, software cheat shop, best software cheats, PC software cheats, elite cheats, Adobe Photoshop cheats, Aida cheats, Figma cheats, software cheat, cheat for software, software stream, Adobe Photoshop gameplay, Aida cheats, Figma guide, cheat Figma, Figma highlights, guide, Figma wtf, software moments, software cheat, software wipe, software money farming, cheat software, Adobe Photoshop stream, Figma raid, Figma cheats 2021, Crooked, abs, rust, download software cheats">
   <title><?php echo $your_string; ?></title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
   <link rel="icon" type="image/png" href="img/favicon.png" />
   <link rel="stylesheet" href="css/main.css">
   <link rel="stylesheet" href="webfonts/all.min.css">
</head>
<body>

   <div class="mobile-navbar">
      <a href="/">Main</a>
      <a href="tickets.php">Support</a>
      <a class="mb-change" href="politic.php">User agreement</a>
   </div>


   <header>
      <div class="container">
         <div class="navbar-nav fl ai-c">
            <a href="/" class="fl ai-c logo">
               <img src="img/logo.png" alt="">
               <span><?php echo $your_string; ?></span>
            </a>
            <div class="menu fl ai-c">
               <a href="/">Main</a>
               <a href="tickets.php">Support</a>
               <a class="mb-change" href="politic.php">User agreement</a>
                 <?php if ($authenticated) {
                  echo '            <a href="app/settings.php">Настройки сайта</a>';
            echo '            <a href="app/logout.php">Выйти</a>';
        }
         ?>



               
            </div>
            
           
            <label for="check" class="mobile-menu">
               <input type="checkbox" id="check" />
               <span></span>
               <span></span>
               <span></span>
            </label>
            
         </div>
         
      </div>
   </header>
   
      