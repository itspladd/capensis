import { useContext } from 'react'

// Context
import { ReducerState } from '../reducer/context'

import '../styles/StatusBar.css';

export default function StatusBar() {
  console.log('Rendering StatusBar')
  const state = useContext(ReducerState)

  const { trackedSession, projects, loaded } = state;
  const { tracking } = loaded.data

  const projectExists = trackedSession && projects[trackedSession.project_id];
  const projectName = projectExists && projects[trackedSession.project_id].title

  const bgColor = () => {
    if (trackedSession) return 'bg-success text-light';
    if (!trackedSession) return 'bg-secondary text-light';
  }

  return (
    <div className={`statusBar ${bgColor()}`}>
      { !tracking &&
        `Loading...`
      }
      { trackedSession && projectExists &&
        `Currently tracking ${projectName}`
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