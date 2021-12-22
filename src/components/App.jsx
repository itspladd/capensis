import '../styles/App.css';

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
import useAppData from '../reducer/useAppData'
import usePopupBlockForm from '../hooks/usePopupBlockForm';

// Helper functions
import { blockIsOnDay } from '../helpers/timeHelpers';
import { allTrue } from '../helpers/boolHelpers';

export default function App() {

  const { state, dateActions, authActions, dataActions } = useAppData();
  const [blockFormState, blockFormActions] = usePopupBlockForm(state.blocks, state.day, dataActions);

  const doneLoading = allTrue(state.loaded);

  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {!doneLoading && <Loading>Loading...</Loading>}

      {/* If there's no valid login: */}
      {doneLoading && !state.user &&
        <Authentication authActions={authActions} />
      }

      {/* If we've successfully logged in: */}
      {doneLoading && state.user &&
        <>
          <Router basename="/capensis">
            <Header username={state.user.username} logout={authActions.logout} />
            <StatusBar state={state} />
            {/* BlockFormModal is a popup modal, so it's always here,
            but only displayed if "show" is true */}
            <BlockFormModal
              state={blockFormState}
              actions={blockFormActions}
              currentDay={state.day}
              projects={state.projects}
            />
            <div className="App-body">
              <Switch>
                <Route exact path={["/", "/schedule"]}>
                  <DaySchedule
                    blocks={state.blocks.filter(block => blockIsOnDay(block, state.day))}
                    day={state.day}
                    goToTomorrow={() => dateActions.changeDay(1)}
                    goToYesterday={() => dateActions.changeDay(-1)}
                    newBlock={blockFormActions.new}
                    editBlock={blockFormActions.edit}
                    toggleSession={dataActions.toggleSession}
                    dataActions={dataActions}
                  />
                </Route>
                <Route exact path="/week" >
                  <WeekSchedule />
                </Route>
                <Route exact path="/projects" >
                  <ProjectList projects={state.projects} dataActions={dataActions} />
                </Route>
                <Route exact path="/sessions">
                  <Sessions
                    sessions={state.sessions}
                    projects={state.projects}
                    day={state.day}
                    lastWeek={() => dateActions.changeDay(-7)}
                    nextWeek={() => dateActions.changeDay(7)}
                    state={state}
                    dataActions = {dataActions}
                    toggleSession={dataActions.toggleSession} />
                </Route>
                <Route exact path="/reports" >
                  <Report
                    projects={state.projects}
                    day={state.day}
                    lastWeek={() => dateActions.changeDay(-7)}
                    nextWeek={() => dateActions.changeDay(7)}
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
