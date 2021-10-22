import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { currentSession, projects} = props;

  const loading = !projects;
  const tracking = currentSession && projects && projects[currentSession.project_id]

  const bgColor = () => {
    if (tracking) return 'bg-success text-light';
    if (!tracking) return 'bg-secondary text-light';
  }

  return (
    <div className={`statusBar ${bgColor()}`}>
      { loading &&
        `Loading...`
      }
      { tracking &&
        `Currently tracking ${projects[currentSession.project_id].title}`
      }
      { currentSession && !projects[currentSession.project_id] &&
        `ERROR: Trying to track project ID ${currentSession.project_id}, but it was not found.`
      }
      { !currentSession &&
        `Not currently tracking`
      }
    </div>
  )
}