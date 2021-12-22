import '../styles/App.css';
import { useContext } from 'react'

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

import DaySchedule from './DaySchedule';
import WeekSchedule from './WeekSchedule';
import ProjectList from './ProjectList';
import Sessions from './SessionComponents/Sessions';
import Report from './Report';
import Footer from './Footer';

// Custom hooks

// Helper functions
import { allTrue } from '../helpers/boolHelpers';

// Context
import { ReducerState, ReducerActions } from '../reducer/context'

export default function App() {
  console.log("rendering App")
  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const doneLoading = allTrue(state.loaded);

  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {!doneLoading && <Loading>Loading...</Loading>}

      {/* If there's no valid login: */}
      {doneLoading && !state.user &&
        <Authentication />
      }

      {/* If we've successfully logged in: */}
      {doneLoading && state.user &&
        <>
          <Router basename="/capensis">
            <Header username={state.user.username} logout={actions.auth.logout} />
            <StatusBar state={state} />

            <div className="App-body">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule />
                </Route>
                <Route exact path="/week" >
                  <WeekSchedule />
                </Route>
                <Route exact path="/projects" >
                  <ProjectList projects={state.projects} dataActions={actions.data} />
                </Route>
                <Route exact path="/sessions">
                  <Sessions
                    sessions={state.sessions}
                    projects={state.projects}
                    day={state.day}
                    lastWeek={() => actions.date.changeDay(-7)}
                    nextWeek={() => actions.date.changeDay(7)}
                    state={state}
                    dataActions = {actions.data}
                    toggleSession={actions.data.toggleSession} />
                </Route>
                <Route exact path="/reports" >
                  <Report
                    projects={state.projects}
                    day={state.day}
                    lastWeek={() => actions.date.changeDay(-7)}
                    nextWeek={() => actions.date.changeDay(7)}
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
