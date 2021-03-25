<div align="center">
  <h1>Route Lookup</h1>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f81dae2a-f3d2-46eb-b1d7-69071ee19a4c/deploy-status)](https://app.netlify.com/sites/goofy-meitner-a2c969/deploys)

# Introduction

This project is a webapp that was originally created for Solidabis' code challenge of April 2020. The original challenge page can be found here: https://koodihaaste.solidabis.com/ (Be wary: their certificate for the page has ran out). Goal of the challenge was to create a route search web application where the user could select a route between two stops and receive the fastest possible route to get between the two stops using the available bus lines. I've continued the application even after the challenge with various improvements. If you want to see how the code was at the time of the submission, check one of the tags.

This web page can be tried out from here: https://goofy-meitner-a2c969.netlify.app/

### Description

This application uses the provided route data json to first render the bus stops and the roads between them. JSON data is not used as it is but is mapped to a more easily handleable format with mapper classes. Bus stops are rendered in a crawling style: we first start from one of the stops and then render the neighbouring stops and their neighbours and so on. Neighbours are placed in one of the eight available directions and the duration between the stops affects the lenght of the road when possible. Route calculation between the stops is done using adapted [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) which takes into account which bus line should be used between the roads as well.

### Technologies used

- React and React-Redux
  - Core of the application
- Typescript
  - Adds typing to Javascript and makes it easier to write bug free code
- Webpack
  - Compresses the codebase into a smaller space and transpiles them to run on older browsers
- Jest
  - Testing
- Material UI
  - User Interface components
- Lodash
  - General purpose conditions

Developed on Windows 10 Home version 1909.

### How to run

#### Requirements

1. If you do not have Node.js or npm on your computer, start by downloading it from here: https://www.npmjs.com/get-npm
2. ~ 500 mb storage space

#### Running the application

1. Download this repository and extract it
2. Open your preferred command line at the extracted folder
3. Type `npm install`
4. After installation is complete, type `npm start`
5. Browser window should now open with the application

### Other commands

- npm test
  - Run tests to ensure the application is working correctly. All of the tests should pass.
- npm run build
  - Create a production bundle to /dist folder
