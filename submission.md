# Submission Notes

These notes will be read by HubSpot developers. Drop us a line!

## Given more time, what would you have done differently?

If I had more time, I probably would have spent more time optimizing the code in general. Determining whether certain functions should be in their own component, or if I could have consolidated anything else. I would have spent some time implementing new features like a sort function or more filters, especially if this web page was being built to handle more data. I would have spent some time making general qol and design updates like a dark mode, or more detailed responsive elements.

## How did you deviate from the directions, if at all, and why?

I hope this is the right place to describe where I may have done additional things and not just what was different from the directions but here goes!

### Exercise 1
- For this exercise I did edit the DOM to for the benefit of css readability and added a class, so that I didn't have to use the first-child selector. But I understood the directions as to not change any of the html elements themselves.
- The only other thing is that the button color is fairly different from the example, this is because I made an effort for these exercises to be compliant with accessibility standards, which I'll mention more of for exercise 2.

### Exercise 2
- I used the React framework for this exercise, and we really get into the code within the mediaPage.js file wich imports all of the individual components used.
- As an extra piece in this exercise, I made an effort to make everything with accessibility in mind, and followed every standard highlighted in Google Lighthouse. This included background color changes for contrast, making sure all interactive elements were tabbable, and that form elements had the appropriate labeling.
- I noticed on image didn't have a link for the poster art, so I made sure to handle cases like that with a filler image.
- I added in filter pills so that users can see each of the individual filters they have selected, and remove them individually as well if desired.
- Used fuse.js to implement fuzzy search for the search bar.

## Is there anything else you'd like to let us know?

I really enjoyed this exercise! I feel like a lot of tough challenges were hit like working with pseudo-elements and styling custom input elements. I am grateful that this project was doable in a reasonable amount of time, and something that I can use for my own portfolio regardless of outcome. Thanks for the exercise and I hope we'll be talking soon!
