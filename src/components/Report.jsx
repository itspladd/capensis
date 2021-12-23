import axios from "axios"
import { useEffect, useState, useContext } from "react"

import '../styles/Report.css';

import Loading from './Loading'
import PageHeader from './PageHeader'
import ReportItem from './ReportItem'

import { makeWeekString } from '../helpers/stringHelpers'

// Context
import { ReducerState, ReducerActions } from '../reducer/context'

export default function Report() {
  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const { loaded, day, reports, projects } = state
  const loading = !loaded.data.reports
  const empty = !reports.length

  const report = reports.map(project => {
    // Totals are returned in seconds.
    const { project_id, sessions_total, blocks_total } = project
    const projectName = projects[project_id] && projects[project_id].title;
    const secondsToHours = 1/(60*60);
    const sessionHours = (sessions_total * secondsToHours) || 0
    const blockHours = (blocks_total * secondsToHours) || 0
    return (
      <ReportItem
        key={project_id}
        title={projectName}
        progress={sessionHours}
        goal={blockHours}
      />
    )
  })

  return (
    <div className="report">
      <PageHeader
        nav
        back={actions.date.lastWeek}
        forward={actions.date.nextWeek}
        title="Report"
        subtitle={`${makeWeekString('EN-US', day)}, ${day.getFullYear()}`}
      />
      {loading && <Loading>Loading report...</Loading>}
      {!loading && !empty > 0 && (
        <ul>
          {report}
        </ul>
        )}
      {!loading && empty && (
      <div className="report-empty">
        <p>You don't have anything scheduled this week!</p>
      </div>)}
    </div>
  )
}