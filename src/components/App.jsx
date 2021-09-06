import '../styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Router components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Custom components
import Header from './Header';
import LoginRegister from './LoginRegister';
import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';
import Block from './Block';

// Custom hooks
import useAuthentication from '../hooks/useAuthentication'

export default function App() {

  const [loading, username, setUsername] = useAuthentication();
  const [blocks, setBlocks] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());

  const handleLogout = event => {
    event.preventDefault();
    axios.post(`/api/logout`)
         .then(res => setUsername(res.data.username))
  }

  const loadWeeklyBlocks = () => {
    axios.get(`/api/blocks/week`)
    .then(res => generateBlockComponents(res.data))
    .then(blocks => setBlocks(blocks))
  }

  const generateBlockComponents = blockArray => {
    return blockArray.map(blockObj => <Block
      day={new Date(blockObj.schedule_date)}
      {...blockObj}
      />)
  }

  // Load weekly blocks any time the username changes
  useEffect(loadWeeklyBlocks, [username]);

  // Change the day by a positive or negative amount
  const changeDay = days => {
    const deltaMs = 1000*60*60*24*days;
    setCurrentDay(new Date(currentDay.valueOf() + deltaMs))
  }


  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {loading && <p>Currently loading...</p>}

      {/* If there's no valid login: */}
      {!loading && !username &&
        <LoginRegister setUsername={setUsername} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Header username={username} handleLogout={handleLogout} />
          <Router>
            <Switch>
              <Route exact path={["/", "/day"]}>
                <DaySchedule
                  blocks={blocks}
                  day={currentDay}
                  tomorrow={() => changeDay(1)}
                  yesterday={() => changeDay(-1)}
                />
              </Route>
              <Route exact path="/week" >
                <WeekSchedule />
              </Route>
              <Route exact path="/projects" >
                <ProjectList />
              </Route>
              <Route exact path="/reports" >
                <p>Reports component</p>
              </Route>
            </Switch>
          </Router>
        </>
      }
    </div>
  );
}
