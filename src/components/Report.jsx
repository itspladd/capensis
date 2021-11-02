import axios from "axios"
import { useEffect, useState } from "react"

import '../styles/Report.css';

import Button from 'react-bootstrap/Button'

import Loading from './Loading'
import ReportItem from './ReportItem'

import { makeWeekString } from '../helpers/stringHelpers'

export default function Report(props) {
  const { projects, day, lastWeek, nextWeek } = props;

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get(`/api/reports/week?date=${day.toISOString()}`)
         .then(res => setReportData(res.data))
         .catch(err => setError(err))
         .finally(() => setLoading(false))

  }, [projects, day])

  const report = reportData.map(project => {
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
      <div class="report-header">
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
          <h3>{makeWeekString('EN-US', day)}</h3>
          <span className="text-muted">{day.getFullYear()}</span>
        </div>
      {loading && <Loading>Loading report...</Loading>}
      {!loading && error && <p>{error.message}</p>}
      {!loading && !error && reportData.length > 0 && (
        <ul>
          {report}
        </ul>
        )}
      {!loading && !error && !reportData.length && (
      <div className="report-empty">
        <p>You don't have anything scheduled this week!</p>
      </div>)}
    </div>
  )
}