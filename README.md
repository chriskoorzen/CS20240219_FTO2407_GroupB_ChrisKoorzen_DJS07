# DJS07 - Meme Generator

## Using this App
1. Get a random Meme image using the "Get a random meme image" button.
2. Select your text size.
3. Enter you text bits into the "Meme Text box". Hit "Enter" to create it.
4. Move your text bit where you want it on the image.
5. Repeat steps 2-4 as many times as you like.
6. Hit "Save" to create and download your newly created meme!


## Challenges
**Moving MemeTexts into a custom place on the Image.**\
Solved this by using the Draggable API of HTML5 and leveraging the CSS position, display properties.

**Getting the right and bottom boundary of a changing meme image.**\
Solved this by passing down a function to the children that can dynamically access these properties when needed. Necessary to keep the texts "bounded" on the image - the user should not be allowed to move the texts anywhere on the screen.

**Keeping text size consistent after user changes their preference.**\
Solved this by making it an unchanging state on the children MemeText element. This property is thus only set once and used in determining the resulting render.

**Saving the completed image.**\
To implement this functionality from scratch was going to take a lot of time. Luckily there was a library available for this.

## Notes
**For coaches:** Navigate to ```/public``` to display the App.