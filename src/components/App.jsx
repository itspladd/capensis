import '../styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Router components
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
import Loading from './Loading'
import Header from './Header';
import StatusBar from './StatusBar';
import Authentication from './Authentication'

import NewBlockForm from './NewBlockForm';
import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';
import Report from './Report';
import Footer from './Footer';

// Custom hooks
import useAuthentication from '../hooks/useAuthentication'
import useWeeklyBlocks from '../hooks/useWeeklyBlocks';
import useSessionTracking from '../hooks/useSessionTracking';
import usePopupModal from '../hooks/usePopupModal';

// Helper functions
import { blockIsOnDay } from '../helpers/timeHelpers';

export default function App() {


  const [loading, username, login, logout] = useAuthentication();
  const [blocks, refreshBlocks, currentDay, changeDay] = useWeeklyBlocks(username);
  const [currentSession, toggleSession] = useSessionTracking(username);
  const [showForm, closeForm, show] = usePopupModal();
  const [projects, setProjects] = useState({})

  // Load new projects when the username changes
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
      {loading && <Loading>Loading...</Loading>}

      {/* If there's no valid login: */}
      {!loading && !username &&
        <Authentication login={login} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Router basename="/capensis">
            <Header username={username} handleLogout={logout} currentSession={currentSession} />
            <StatusBar currentSession={currentSession} projects={projects} />
            <NewBlockForm
              show={show}
              handleClose={closeForm}
              currentDay={currentDay}
              projects={projects}
              blocks={blocks}
              refreshBlocks={refreshBlocks}
            />
            <div className="App-body mt-1">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule
                    blocks={blocks.filter(block => blockIsOnDay(block, currentDay))}
                    day={currentDay}
                    goToTomorrow={() => changeDay(1)}
                    goToYesterday={() => changeDay(-1)}
                    showForm={showForm}
                  />
                </Route>
                <Route exact path="/week" >
                  <WeekSchedule />
                </Route>
                <Route exact path="/projects" >
                  <ProjectList projects={projects} setProjects={setProjects} />
                </Route>
                <Route exact path="/reports" >
                  <Report
                    projects={projects}
                    day={currentDay}
                    lastWeek={() => changeDay(-7)}
                    nextWeek={() => changeDay(7)}
                  />
                </Route>
              </Switch>
            </div>
          </Router>
        </>
      }
      <Footer />
    </div>
  );
}
