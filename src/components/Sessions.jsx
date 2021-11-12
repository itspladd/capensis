import Button from 'react-bootstrap/Button'
import SessionList from './SessionList'

import { makeWeekString } from '../helpers/stringHelpers'
import { projectsWithSessions, projectsWithoutSessions } from '../helpers/projectHelpers'

import '../styles/SessionsPage.css'

export default function Sessions (props) {
  const { day, sessions=[], projects=[], refreshData, lastWeek, nextWeek } = props;

  const sessionListsByProject = projectsWithSessions(projects, sessions)
    .map(project => (
      <SessionList
      title={project.title}
      sessions={sessions.filter(session => session.project_id === project.id)}
      refreshData={refreshData}
      />
    ))

  const untrackedProjects = projectsWithoutSessions(projects, sessions)

  return (
    <section className="sessions">
      <header>
        <nav>
          <Button
            variant="info"
            onClick={lastWeek}>
            {`<`}
          </Button>
          <Button
            variant="info"
            onClick={nextWeek}>
            {`>`}
          </Button>
        </nav>
        <div>
          <h3>Sessions</h3>
          <span className="text-muted">{makeWeekString('EN-US', day)}</span>
        </div>
      </header>
      { sessionListsByProject }
      { untrackedProjects.length > 0 &&
        <SessionList
          title={"Untracked Projects"}
          sessions={untrackedProjects}
          refreshData={refreshData}
        />
      }
    </section>
  )
}