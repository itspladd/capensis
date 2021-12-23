import { useContext } from 'react'

import SessionList from './SessionList'
import PageHeader from '../PageHeader'

import { makeWeekString } from '../../helpers/stringHelpers'
import { projectsWithSessions, projectsWithoutSessions } from '../../helpers/projectHelpers'

import '../../styles/SessionsPage.css'

// Context
import { ReducerState, ReducerActions } from '../../reducer/context'

export default function Sessions () {
  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const { projects, sessions, day } = state;

  const sessionListsByProject = projectsWithSessions(projects, sessions)
    .map(project => (
      <SessionList
      key={project.id}
      title={project.title}
      sessions={sessions.filter(session => session.project_id === project.id)}
      />
    ))

  const untrackedProjects = projectsWithoutSessions(projects, sessions)

  return (
    <section className={`sessions`}>
      <PageHeader
        nav
        back={actions.date.lastWeek}
        forward={actions.date.nextWeek}
        title="Sessions"
        subtitle={makeWeekString('EN-US', day)}
      />
      <article>
        { sessionListsByProject }
        { untrackedProjects.length > 0 &&
          <SessionList
            title={"Untracked Projects"}
            sessions={untrackedProjects}
          />
        }
      </article>
    </section>
  )
}