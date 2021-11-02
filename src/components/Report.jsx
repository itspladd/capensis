import axios from "axios"
import { useEffect, useState } from "react"

import '../styles/Report.css';

import Loading from './Loading'
import ReportItem from './ReportItem'

export default function Report(props) {
  const { projects, day } = props;

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get(`/api/reports/week`)
         .then(res => setReportData(res.data))
         .catch(err => setError(err))
         .finally(() => setLoading(false))

  }, [projects])

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
      />
    )
  })

  return (
    <div className="report container">
      {loading && <Loading>Loading report...</Loading>}
      {!loading && error && <p>{error.message}</p>}
      {!loading && !error && reportData.length === 0 && (
      <ul>
        {report}
      </ul>)}
      {!loading && !error && !reportData.length && (
      <>
        <p>Nothing to report.</p>
        <p>Go schedule some projects!</p>
      </>)}
    </div>
  )
}