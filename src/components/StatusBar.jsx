import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { currentProject, state } = props;

  const loading = !state.projects;
  const tracking = state.projects[currentProject]

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
        `Currently tracking ${state.projects[currentProject].title}`
      }
      { currentProject && !state.projects[currentProject] &&
        `ERROR: Trying to track project ID ${currentProject}, but it was not found.`
      }
      { !currentProject &&
        `Not currently tracking`
      }
    </div>
  )
}