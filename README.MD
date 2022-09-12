ABOUT THE GAME

This is a Tower Defense game with a pokemon theming. Place Towers to catch all of the Psyduck, to steal their money and defend your home town.


CONTROLS 

Hover over tile you want to place a tile on, and either: 
CLICK for a "Basic Tower 
PRESS 1 for a "Sniper Tower"


TECHNOLOGIES USED

Canvas
HTML
CSS
JavaScript
TILED


APPROACH

I started by making the map, using assets from itch.io and placing them with TILED, which also allowed for placing coordinates on my tile map, then I could plug those in to my game. From there, I had to research how to get those enemies to those points. The solution ended up being to use trigonometry to find the hypotenuse between two points on the canvas, and then move the enemy in that direction by pushing the ratios of sin() and cos() on the x and y coordinates. This same concept was used to find the projectile trajectory. 

The other major challenges were understanding the use of dynamic arrays, managing which functions and objects would be called before others and their dependencies. I originally attempted import file structures but it quickly became too much and I reverted to traditional script linking.


STILL TO BE DONE

A lot hopefully, including but not limited to:

-Animations (first attempt resulted in flickering issues)

-Better control scheme and UI

-
