Hi there!

## Getting Started

First, install the dependencies with

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design choices

I opted for a simple design with a clean and minimalistic look. Personally, I prefer having all the options on one page instead of navigating through 3 pages with one option each. To make it feel nice, I have implemented some animations and only open the next set of inputs or selects when the user picked the current one. However, once the user has come far enough to open the additional information (fuel type, transmission, engine size), I left the section open because I think it would be unintuitive to close everything on change of make or model and I would "pull the rug" under the users feet. I placed date of manufacture next to model because at first I used it to further filter the submodels (after reading the task again, I don't anymore) but also because it makes the UI look cleaner if there are no submodels.
After the user has picked the most important pieces of information about the car, they can then click on the summary button which scrolls down and gives the user a summary of their chosen options with two buttons to either edit or continue. I don't like the option to edit single attributes a lot personally, which is why I opted for scrolling the user back up to change their inputs there. The redirect to the /done page completes the process and let's the user go back to the home page.

The website is responsive and adapts to different screen sizes. I have used the [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) font and the carpata colours and logo to make it more life-like.

Disclaimer: I added the confetti solely for the amusement of the test administator and would of course not include it in a production environment.

For the API I used a simple node backend which can be built directly in the Nextjs app. I have three routes with get requests for makes, models and submodels respectively.

## Assumptions made

-   I assumed that the optional categories (fuel type, transmission, engine size) were not for filtering and do not need to be filtered.
-   Furthermore, I assumed that once the user clicked on find parts, going back would be a reset.

## What I would improve or add with more time

-   I would add redux toolkit state management to keep state between the /done and home page to improve UX.
-   Apart from that I would include a call to an AI to show an image of the car selected to make it easier for inexperienced users to know whether they have picked the right car.
-   I have used a third-party select component for searching through (a potentially big) list of makes, but ideally would build my own component since I can then control it better. I would also filter the remaining categories based on previous choices to make the margin of error as small as possible.
