export function projectsWithSessions(projects, sessions) {
  return Object.values(projects)
    .filter(project => projectHasSessions(project, sessions))
}

export function projectsWithoutSessions(projects, sessions) {
  return Object.values(projects)
    .filter(project => !projectHasSessions(project, sessions))
}

export function projectHasSessions(project, sessions) {
  return sessions
  .filter(session => session.project_id === project.id)
  .length > 0;
}