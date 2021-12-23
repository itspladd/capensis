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

// Context
import { ReducerState } from '../reducer/context'

export default function App() {
  const state = useContext(ReducerState)
  const userLoaded = state.loaded.user;
  const loggedIn = state.user;

  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      { !userLoaded && <Loading>Loading...</Loading>}

      {/* If there's no valid login: */}
      { userLoaded && !loggedIn &&
        <Authentication />
      }

      {/* If we've successfully logged in: */}
      { loggedIn &&
        <>
          <Router basename="/capensis">
            <Header />
            <StatusBar />

            <div className="App-body">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule />
                </Route>
                <Route exact path="/week" >
                  <WeekSchedule />
                </Route>
                <Route exact path="/projects" >
                  <ProjectList />
                </Route>
                <Route exact path="/sessions">
                  <Sessions />
                </Route>
                <Route exact path="/reports" >
                  <Report />
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
