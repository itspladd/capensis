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

import BlockFormModal from './BlockFormModal';
import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';
import Sessions from './SessionComponents/Sessions';
import Report from './Report';
import Footer from './Footer';

// Custom hooks
import useAppData from '../hooks/useAppData'
import useDateTracking from '../hooks/useDateTracking';
import useWeeklyData from '../hooks/useWeeklyData';
import useSessionTracking from '../hooks/useSessionTracking';
import usePopupBlockForm from '../hooks/usePopupBlockForm';

// Helper functions
import { blockIsOnDay } from '../helpers/timeHelpers';

export default function App() {

  const [day, week, changeDay] = useDateTracking();
  const { state, authActions } = useAppData();
  const [blocks, sessions, refreshData] = useWeeklyData(state.user, week);
  const [currentProject, toggleSession] = useSessionTracking(state.user, refreshData);
  const [blockFormState, blockFormActions] = usePopupBlockForm(blocks, day, refreshData);
  const [projects, setProjects] = useState({})

  // Load new projects when the username changes
  useEffect(() => {
    axios.get('/api/projects')
      .then(res => {
        const projectList = {};
        res.data.projects.forEach(project => projectList[project.id] = project)
        setProjects(projectList)
      })
  }, [state.user])
  console.log(state)
  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {state.loading && <Loading>Loading...</Loading>}

      {/* If there's no valid login: */}
      {!state.loading && !state.user &&
        <Authentication login={authActions.login} />
      }

      {/* If we've successfully logged in: */}
      {!state.loading && state.user &&
        <>
          <Router basename="/capensis">
            <Header username={state.user.username} logout={authActions.logout} />
            <StatusBar currentProject={currentProject} projects={projects} />
            {/* BlockFormModal is a popup modal, so it's always here,
            but only displayed if "show" is true */}
            <BlockFormModal
              state={blockFormState}
              actions={blockFormActions}
              currentDay={day}
              projects={projects}
            />
            <div className="App-body">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule
                    blocks={blocks.filter(block => blockIsOnDay(block, day))}
                    day={day}
                    goToTomorrow={() => changeDay(1)}
                    goToYesterday={() => changeDay(-1)}
                    newBlock={blockFormActions.new}
                    editBlock={blockFormActions.edit}
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
