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
import Sessions from './SessionComponents/Sessions';
import Report from './Report';
import Footer from './Footer';

// Custom hooks
import useDay from '../hooks/useDay';
import useWeek from '../hooks/useWeek';
import useAuthentication from '../hooks/useAuthentication'
import useWeeklyData from '../hooks/useWeeklyData';
import useSessionTracking from '../hooks/useSessionTracking';
import usePopupModal from '../hooks/usePopupModal';

// Helper functions
import { blockIsOnDay } from '../helpers/timeHelpers';

export default function App() {

  const [day, changeDay] = useDay();
  const [week] = useWeek(day)
  const [loading, username, login, logout] = useAuthentication();
  const [blocks, sessions, refreshData] = useWeeklyData(username, week);
  const [currentProject, toggleSession] = useSessionTracking(username, refreshData);
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
    <div className="App">
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
            <Header username={username} handleLogout={logout} />
            <StatusBar currentProject={currentProject} projects={projects} />
            {/* NewBlockForm is a popup modal, so it's always here,
            but only displayed if "show" is true */}
            <NewBlockForm
              show={show}
              handleClose={closeForm}
              currentDay={day}
              projects={projects}
              blocks={blocks}
              refreshData={refreshData}
            />
            <div className="App-body">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule
                    blocks={blocks.filter(block => blockIsOnDay(block, day))}
                    day={day}
                    goToTomorrow={() => changeDay(1)}
                    goToYesterday={() => changeDay(-1)}
                    showForm={showForm}
                    toggleSession={toggleSession}
                    refreshData={refreshData}
                  />
                </Route>
                <Route exact path="/week" >
                  <WeekSchedule />
                </Route>
                <Route exact path="/projects" >
                  <ProjectList projects={projects} setProjects={setProjects} />
                </Route>
                <Route exact path="/sessions">
                  <Sessions
                    sessions={sessions}
                    projects={projects}
                    day={day}
                    lastWeek={() => changeDay(-7)}
                    nextWeek={() => changeDay(7)}
                    refreshData={refreshData}
                    toggleSession={toggleSession} />
                </Route>
                <Route exact path="/reports" >
                  <Report
                    projects={projects}
                    day={day}
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
