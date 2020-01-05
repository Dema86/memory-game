# memory-game
The game has 12 cards. Each card consists of a container div named .
memory-card, which holds two img elements. The first one represents the card front-face and the second its back-face.
---------------
*index.html          The initial template linking both css and js files.
*styles.css           We will use a simple but yet very useful reset, applied to all items.

The box-sizing: border-box property includes padding and border values into element’s total width and height.
By setting display: flex to the body and margin: auto to the .memory-card container, it will be centered both vertically and horizontally.
.memory-card will also be a sticky postion. By default, the items are set to shrink in width to fit the container. 
By setting transform-style: preserve-3d along one line, accordingly to their size.
Let’s make one row, 12 cards each by setting width to 250% and height to 20% , 10px from margin.
The property position: absolute set to both front-face and back-face, 
will remove the elements from the original position, and stack them on top of each other.
also add a rotate effect. The :active pseudo class will be triggered every time the element gets clicked. 
It will apply a .10s transition to its size.
\\rotate Card
To rotate the card when clicked, a class rotate is added to the element. 
For that, let’s select all memory-card elements with document.querySelectorAll. 
Then loop through them with forEach and attach an event listener. 
Every time a card gets clicked rotateCard function will be fired. 
The this variable represents the card that was clicked. The function accesses the element’s classList and toggles the rotate class:
In the CSS the rotate class rotates the card 180deg:
To produce the 3D  effect, we will add the perspective property to .memory-card. 
That property sets how far in the z plane the object is from the user. 
The lower the value the bigger the perspective effect. For a subtle effect, let’s apply 1000px:
To the .memory-card elements let’s add transform-style: preserve-3d, 
to position them in the 3D space created in the parent, instead of flattening it to the z = 0 plane (transform-style).
Now, a transition has to be applied to the transform property to produce the movement effect:

So, we got the card to 3D rotate, But why isn’t the card face showing up? Right now, both .
front-face and .back-face are stacked up onto each other, because they are absolutely positioned. Every element has a back face, 
which is a mirror image of its front face. The property backface-visibility defaults to visible, 
so when we rotate the card, what we get is the "?"bage back face.
To reveal the image underneath it, let’s apply backface-visibility: hidden to .front-face and .back-face.
If we refresh the page and rotate a card, it’s gone!
//checkForMatch
Now that we haverotating cards, let’s handle the matching logic.

When we click the first card, it needs to wait until another card is rotated. 
The variables hasrotateCard and rotateCard will manage the rotate state. 
In case there is no card rotated, hasrotateCard is set to true and rotatedCard is set to the clicked card. 
Let’s also switch the toggle method to add:

So now, when the user clicks the second card, we will fall into the else block in our condition. 
We will check to see if it’s a match. In order to do that, let’s identify each card.

Whenever we feel like adding extra information to HTML elements, 
we can make use of data attributes. By using the following syntax: data, where,it can be any word, 
that attribute will be inserted in the element’s dataset property. So, let’s add a data-framework to each card.
Let’s extract the matching logic to its own method checkForMatch() and also set hasrotateCard back to false. 
In case of a match, disableCards() is invoked and the event listeners on both cards are detached, 
to prevent further rotating. Otherwise, unrotateCards() will turn both cards back by a 1000ms timeout that removes the rotate class.
//Lock Board
So now that we have the matching logic covered, we need to lock the board. 
I lock the board to avoid two sets of cards being turned at the same time, otherwise the rotating will fail.
declare a lockBoard variable. When the player clicks the second card, lockBoard will be set to true and the condition
if (lockBoard) return; will prevent any card rotating before the cards are hidden or match.

The firstCard and secondCard variables need to be reset after each round, so let’s extract that to a new method resetBoard(). 
Let’s place the hasrotatedCard = false; and lockBoard = false there too.
//shuffle cards
There is 12 cards in the game, so we will iterate through them, generate a random number between 0 and 12 and assign 
it to the flex-item order property.In order to invoke the shuffle function, let’s make it a Immediately Function ,
which means it will execute itself right after its declaration. The scripts should look like this.
//update timer
The Duration is time value based in seconds.
//start/restart
adding a stop and reset button for the following count up, so that it does start game till i press start, 
and it does reset unless i press reset.
//end game
When all cards are matched, the game ends and the total number of clicks are displayed to the console with congrates message.
