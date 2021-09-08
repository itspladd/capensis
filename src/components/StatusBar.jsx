import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { currentSession, projects} = props;

  const tracking = currentSession.id !== undefined;
  const projectTitle = tracking && projects[currentSession.project_id].title

  return (
    <div className={`statusBar border-top border-info
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