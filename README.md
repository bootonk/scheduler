# Interview Scheduler

Booking an interview should feel easy and seamless and this application does just that. Users will be able to select an appointment, add the student and interviewer, and save the spot! Editing, deleting functionality is included alongside error messaging (just in case).

But that doesn't mean there isn't a lot of work going on under the hood!

As a React app, the user will experience a single page application with SASS for consistent styling. Data is persistent with the help of a WebSocket server and PostresSQL database. Our client connects with the database with the help of Axios API calls.

This application has been heavily tested across the board with static, unit, integration and end to end testing. All with the help of Storybook, Jest, and Cypress.

## A Sneak Peek

## Getting Started

1. Install dependencies (listed below in more detail)

   ```sh
   npm install
   ```

2. Run the Webpack Development Server

   ```sh
   npm start
   ```

3. Run the Jest Test Framework

   ```sh
   npm test
   ```

4. Run the Storybook Visual Testbed

   ```sh
   npm run storybook
   ```

## Dependencies

- axios ^0.20.0
- classnames ^2.2.6
- normalize.css ^8.0.1
- react ^16.9.0

## Development Dependencies

- @babel/core ^7.4.3
- @storybook/react ^5.0.10
- @testing-library/react ^8.0.7
- babel-loader 8.1.0
- prop-types ^15.8.1
- react-test-renderer ^16.9.0
- sass ^1.53.0
