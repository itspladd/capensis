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
import NoAuthUser from './NoAuthUser'

import NewBlockForm from './NewBlockForm';
import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';
import Reports from './Reports';
import Footer from './Footer';

// Custom hooks
import useAuthentication from '../hooks/useAuthentication'
import useWeeklyBlocks from '../hooks/useWeeklyBlocks';
import useSessionTracking from '../hooks/useSessionTracking';
import usePopupModal from '../hooks/usePopupModal';

export default function App() {


  const [loading, username, login, logout] = useAuthentication();
  const [blocks, refreshBlocks, currentDay, changeDay] = useWeeklyBlocks(username);
  const [currentSession, toggleSession] = useSessionTracking(username);
  const [showForm, closeForm, show] = usePopupModal();
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
        <NoAuthUser login={login} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Router basename="/capensis">
            <Header username={username} handleLogout={logout} currentSession={currentSession} />
            <StatusBar currentSession={currentSession} projects={projects} />
            <NewBlockForm 
              show={show}
              handleShow={showForm}
              handleClose={closeForm}
              currentDay={currentDay}
              projects={projects}
              blocks={blocks}
              refreshBlocks={refreshBlocks}
            />
            <Switch>
              <Route exact path={["/", "/schedule"]}>
                <DaySchedule
                  blocks={blocks}
                  day={currentDay}
                  tomorrow={() => changeDay(1)}
                  yesterday={() => changeDay(-1)}
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
                <Reports projects={projects} />
              </Route>
            </Switch>
          </Router>
        </>
      }
      <Footer />
    </div>
  );
}
