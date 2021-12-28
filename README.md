## Star Wars movie search website

- Building website using star wars movie api on https://www.swapi.tech/

## Used libraries

- react-hook-form
- framer-motion
- react-icons
- sass

### pages and functions

## Home page

- [x] Header fixed navigation
- [x] fixed header + scroll down will change background color to black
- [x] search bar on header -> search will direct to /search/index.js page
- [x] added motion to show active page on navigation with red dot

## Movies page /movies/index.js

- [x] showing list of the movies using slides
- [x] heart icon hover will scale and tap to rotateZ for animation effect
- [x] click heart icon to favourite movie/unfavourite
- [x] favourite movie will move to top of the list
- [x] slider , hover and tap motion using framer motion library

## Individual movie page /films/[id].js

- [x] Each movie page has all information of the movie and list of characters using slides
- [x] hovering each character box will animate to show more info link
- [x] limit getting characters for each movie by slice.(0,7) as api will return error if too many requests
- [x] more info box of each character include detail of the the character including height, name etc
- [x] clicking other than the box of the detail box will return to list of the characters page

## search page /search/index.js

- [x] clicking search icon will animate to show input box
- [x] search movie by keyword includes in the title

## other functions

- [x] Loading animation between routes ... (random array number -> get random icons)
- [x] deploy on vercel
