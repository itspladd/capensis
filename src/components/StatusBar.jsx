import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { state } = props;

  const { trackedSession, projects, loading } = state;

  const projectExists = trackedSession && projects[trackedSession.project_id];

  console.log("StatusBar session:", trackedSession)
  const bgColor = () => {
    if (trackedSession) return 'bg-success text-light';
    if (!trackedSession) return 'bg-secondary text-light';
  }

  return (
    <div className={`statusBar ${bgColor()}`}>
      { loading &&
        `Loading...`
      }
      { trackedSession && projectExists &&
        `Currently tracking ${projects[trackedSession.project_id].title}`
      }
      { trackedSession && !projectExists &&
        `ERROR: Trying to track project ID ${trackedSession.project_id}, but it was not found.`
      }
      { !trackedSession &&
        `Not currently tracking`
      }
    </div>
  )
}