import axios from "axios"
import { useEffect, useState } from "react"

export default function Reports(props) {
  const { projects } = props;

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios.get(`/api/reports/week`)
         .then(res => setReportData(res.data))

  }, [projects])

  const report = reportData.map(project => {
    // Totals are returned in seconds.
    const { project_id, sessions_total, blocks_total } = project
    const projectName = projects[project_id].title;
    const secondsToHours = 1/(60*60);
    const sessionHours = (sessions_total * secondsToHours) || 0
    const blockHours = (blocks_total * secondsToHours) || 0
    return (
    <li key={project_id}>
      {projectName}: {sessionHours.toPrecision(1)} / {blockHours} hours
    </li>
    )
  })

  return (
    <div className="reports">
      <ul>
        {report}
      </ul>
    </div>
  )
}