import {useState} from 'react'

import SessionList from './SessionList'

import '../styles/SessionsPage.css'

export default function Sessions (props) {
  const { sessions=[], projects=[], refreshData } = props;


  const sessionsByProject = Object.values(projects)
    .map(project => (
      <SessionList
      title={project.title}
      sessions={sessions.filter(session => session.project_id === project.id)}
      refreshData={refreshData}
      >
      </SessionList>
    ))


  return (
    <div className="sessions">{sessionsByProject}</div>
  )
}