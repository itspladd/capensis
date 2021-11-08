<!-- TITLE -->
<div align="center">
<img src="docs/capensis-logo.svg" height="100" width="100">
<h1>| Capensis |</h1>
  <h2>A Time-Tracking Scheduler For Anyone</h2>


### Live at [pladd.dev/capensis](http://pladd.dev/capensis)!

Built with [React](https://reactjs.org/), [React-Bootstrap](https://react-bootstrap.github.io/), [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/),  [PostgreSQL](https://www.postgresql.org/), and [Storybook](https://storybook.js.org/)

### 🚧 Currently under development! 🚧
</div>

# 💡 About

**Capensis** is a scheduling and time-tracking app that helps you plan, track, and review your time-management goals.

Trying to reach 150 minutes of exercise a week? **Capensis can help.**

Do you want to spend at least 2 hours a day learning something new? **Capensis.**

Perhaps you'd like to better understand how much time you're *really* spending on homework for each of your classes? **That's literally, actually what Capensis was designed for.**

# ⏳ Features

- Create a list of projects you'd like to track
- Use the interactive schedule to schedule blocks of time for each project
- Click on a block to start and stop time tracking!
- Capensis keeps track of how much time you've scheduled versus how much time you've tracked.
- At any time, you can view reports of your progress, grouped by week. The reports make it easy to see which goals you've met, which goals still need work, and which goals you've overshot!

# 🧰 Installation

Want to tinker with Capensis locally? You'll need [NPM](https://www.npmjs.com/), this repository, and the API server repository: https://github.com/itspladd/capensis-api

<details><summary style="font-size: 1.2rem;">Click to expand instructions</summary>

**Before you start:** You will need a PSQL database available for Capensis to use. You can either use a database URL string, or the host, port, database name, and login information for your database.

1. Clone both repositories into separate folders: `capensis` and `capensis-api`.

2. Open two terminal windows.

3. In one terminal, navigate to `capensis-api` and install dependencies:
```
cd capensis-api
npm install
```
4. Open the `.env.example` file, fill in your database information, and rename the file to `.env`.

5. Set up the database schema and seed data with the following two commands:
```
npm run db:reset
npm run db:migrate
```
6. Start the API server:
```BASH
# To start server in normal mode:
npm start
# To start server in "auto-restart on save" mode:
npm run dev
```

7. In the second terminal, navigate to `capensis` and install dependencies:
```
cd capensis
npm install
```
8. Start the client.
```
npm start
```

</details>