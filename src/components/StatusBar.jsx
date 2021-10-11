import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { currentSession, projects} = props;
  const tracking = currentSession.id !== undefined;
  const projectsLoaded = projects[currentSession.project_id] !== undefined;
  const projectTitle = tracking && projectsLoaded && projects[currentSession.project_id].title

  return (
    <div className={`statusBar mb-2 border-top border-info
      ${tracking ? 'bg-warning' : 'bg-info'}`}>
      { currentSession.id &&
        `Currently tracking ${projectTitle}`
      }
      { !currentSession.id &&
        `Not currently tracking`
      }
    </div>
  )
}