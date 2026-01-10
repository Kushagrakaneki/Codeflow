## **5th jan-added emoji status feature**

**[problem]**-how to know when user stops typing for setting sad emoji

**[solution]**- usign setTimeout 

**[explanation]**- setTimeout waits for given delay before changing to sad face and if user types then addEventListener function restarts keeping the happy face 

**[addition]**- used debounce so that we can cancel old timer 
f we didn't "kill the old timer" (clearTimeout), debounce would be useless.

Here is what would happen without that killing part:

    You type "H" -> Timer 1 starts (for 500ms).

    You type "i" -> Timer 2 starts (for 500ms).

    500ms later: Timer 1 finishes -> Face turns Sad.

    501ms later: Timer 2 finishes -> Face turns Sad again.

The Problem: The face would turn Sad too early. It would turn sad 0.5s after the first letter ("H"), even though you were busy typing "i".

The Solution (Debounce): By killing the old timer, we say: "Ignore the 'H' timer. That is old news. Only listen to the latest timer."

So yes, Resetting the timer (killing the old one) is the entire magic of debounce. Without it, it's just a delayed chaos!


## **7th jan-added background music feature and color change**
-added ambient background music while typing 

-learned about relation between browsers and how to add audio in web pages

-currently the audio abruptly stops instead of fadin gin smoothly so still have to work on that.

-also asked chatgpt to test new look for codeflow and the result was very cool but i will not use ai code for my project . NO COPY PASTE .

-currently file is still there and i will code that look myself and then use it permanently

## **8th jan-learning react**

-currently learning react concepts like jsx,props,state etc 
