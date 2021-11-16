import '../styles/StatusBar.css';

export default function StatusBar(props) {
  const { currentProject, projects = []} = props;

  const loading = !projects;
  const tracking = projects[currentProject]

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
        `Currently tracking ${projects[currentProject].title}`
      }
      { currentProject && !projects[currentProject] &&
        `ERROR: Trying to track project ID ${currentProject}, but it was not found.`
      }
      { !currentProject &&
        `Not currently tracking`
      }
    </div>
  )
}