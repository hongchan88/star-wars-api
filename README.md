## Star Wars movie search website

- Building website using star wars movie api on https://www.swapi.tech/

## Used libraries

- react-hook-form
- framer-motion
- react-icons
- sass

### Pages and functions

## Home page

- [x] Header fixed navigation
- [x] Fixed header nav + scroll down will change background color to black
- [x] Search bar on header -> search will direct to /search/index.js page
- [x] Added animation to moving between active page on navigation with red dot

## Movies page /movies/index.js

- [x] Showing list of the movies using slides
- [x] Next slide/back slide function click arrow icon
- [x] Heart icon hover will scale icon and tap to rotateZ for animation effect
- [x] Click heart icon to favourite movie/unfavourite
- [x] Favourite movie will move to top of the slider list
- [x] Animation motion developed using framer motion library

## Individual movie page /films/[id].js

- [x] Each movie page has all information of the movie and list of characters using slides
- [x] Hovering each character box will animate to show more info link
- [x] Limiting characters API for each movie by slice.(0,7) as api will return error if too many requests
- [x] Detail of the the character including height, name ,birthday .. etc
- [x] clicking other than the box of the detail box will return to list of the characters page

## Search page /search/index.js

- [x] Click search icon on the header nav bar will animate to show input box
- [x] Search movie title by keyword

## Other functions

- [x] Loading animation between routes (random array number -> get random icons within 8 icons)
- [x] Deployed on vercel
