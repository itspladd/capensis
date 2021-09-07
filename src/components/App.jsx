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
import StatusBar from './StatusBar';
import LoginRegister from './LoginRegister';
import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';

// Custom hooks
import useAuthentication from '../hooks/useAuthentication'
import useWeeklyBlocks from '../hooks/useWeeklyBlocks';
import useSessionTracking from '../hooks/useSessionTracking';

export default function App() {


  const [loading, username, setUsername, logout] = useAuthentication();
  const [blocks, currentDay, changeDay] = useWeeklyBlocks(username);
  const [currentSession, toggleSession] = useSessionTracking(username);
  const [projects, setProjects] = useState({})

  useEffect(() => {
    axios.get('/api/projects')
         .then(res => {
           const projectList = {};
           res.data.projects.forEach(project => projectList[project.id] = project)
           setProjects(projectList)
         })
  }, [username])

  return (
    <div className="App"
      onClick={toggleSession}
    >
      {/* If we haven't finished trying to log in: */}
      {loading && <p>Currently loading...</p>}

      {/* If there's no valid login: */}
      {!loading && !username &&
        <LoginRegister setUsername={setUsername} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Router>
            <Header username={username} handleLogout={logout} currentSession={currentSession} />
            <StatusBar currentSession={currentSession} projects={projects} />
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
                <ProjectList projects={projects} setProjects={setProjects} />
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
