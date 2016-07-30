<?php

/* --------------------------------------------------

  YAKME - Settings

--

  'yakme_height' > the height of every field

     0    : the height grows with the content itself
     240  : a fixed height in pixels for the editfield

--

  'yakme_images' > check markdown-images url

    0     : do not check image validity (default)
    1     : check markdown-images for validity

--

  'panel.stylesheet' > style the editor / preview

  /site/fields/yakme/assets/css/kirby.css for more

-------------------------------------------------- */

c::set('yakme_height', 420);
c::set('yakme_images', 1);
c::set("panel.stylesheet", "assets/css/yakme.css");

/* --------------------------------------------------

?>