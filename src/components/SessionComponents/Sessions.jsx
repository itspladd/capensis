import SessionList from './SessionList'
import PageHeader from '../PageHeader'

import { makeWeekString } from '../../helpers/stringHelpers'
import { projectsWithSessions, projectsWithoutSessions } from '../../helpers/projectHelpers'

import '../../styles/SessionsPage.css'

export default function Sessions (props) {
  const {
    day,
    sessions=[],
    projects=[],
    dataActions,
    lastWeek,
    nextWeek,
    state } = props;

  const sessionListsByProject = projectsWithSessions(projects, sessions)
    .map(project => (
      <SessionList
      key={project.id}
      title={project.title}
      sessions={sessions.filter(session => session.project_id === project.id)}
      dataActions={dataActions}
      state={state}
      />
    ))

  const untrackedProjects = projectsWithoutSessions(projects, sessions)

  return (
    <section className={`sessions`}>
      <PageHeader
        nav
        back={lastWeek}
        forward={nextWeek}
        title="Sessions"
        subtitle={makeWeekString('EN-US', day)}
      />
      <article>
        { sessionListsByProject }
        { untrackedProjects.length > 0 &&
          <SessionList
            title={"Untracked Projects"}
            sessions={untrackedProjects}
            dataActions={dataActions}
            state={state}
          />
        }
      </article>
    </section>
  )
}