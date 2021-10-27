import axios from "axios"
import { useEffect, useState } from "react"

import '../styles/ReportBar.css';

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
    const projectName = projects[project_id] && projects[project_id].title;
    const secondsToHours = 1/(60*60);
    const sessionHours = (sessions_total * secondsToHours) || 0
    const blockHours = (blocks_total * secondsToHours) || 0
    return (
    <li key={project_id}>
      {projectName}: {sessionHours.toPrecision(1)} / {blockHours} hours
    </li>
    )
  })

  const ReportBar = props => {
    const {color, progress, goal} = props

    const getPercentage = (num, denom) => {
      const percent = (num/denom) * 100;
      return Math.round(percent*1000) / 1000;
    }

    const style = {
      backgroundColor: color
    }

    return (
      <div className="reportBar" style={style}>
        <div className="reportBar-inner">{getPercentage(progress, goal)}</div>
      </div>
    )
  }

  return (
    <div className="reports container">
      <ul>
        {report}
        
      </ul>
      <ReportBar
        progress={5}
        goal={10000}
        color="red"
      />
    </div>
  )
}