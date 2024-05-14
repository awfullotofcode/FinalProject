# Ninja Run
#### Video Demo:  <URL HERE>
#### Description:
This is my first web-based game developed purely in HTML, CSS, and JavaScript, the user controls a ninja with keyboard directional keys and the purpose is to jump through platforms, dodge obstacles, and fight enemies.

##### 05/13/2024
###### How I implemented the animations
A lot of today was spent on creating the ninjas running animations frame by frame in Adobe Illustrator, I am no expert in graphic design but I feel i did well for my first animations I've made. His running consists of 4 frames, I know ALOT, but it took me a while to learn how to work illustrator and get the results i wanted. The frames are recycled by reflecting them when the character is moving in the opposite direction. I used an array in JS to load up the images and loop through them depending on which direction the keybutton was pressed.
###### Ninja Properties for movement logic
I created a variable for ninja that stores different properties. In his properties I added multiple flags (like isOnGround, movingLeft, movingRight) to store whether he was moving a certain direction, depending on key input. The movement is still a little buggy but I've yet to improve as it will take me time. This is essentialy the first project I've ever worked on. To admit, whenever there was bugs I could not seem to resolve aside from extensive searching on the web, I used CS50's duck debugger as well as ChatGPT which have been tremendous tools I am ever so thankful for.
###### 05/14/2024
##### Minor updates
I have added a favicon to the main pages title to add a little style. In addition I've transferred the 'floor properties' to another variable named 'gameEnvironment', I plan to add any game environment properties like platforms colors etc to this variable
