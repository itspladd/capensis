import { useState, useContext } from 'react'

import PageHeader from '../components/PageHeader'
import ProjectListItem from './ProjectListItem'

import '../styles/ProjectList.css'

// Context
import { ReducerState, ReducerActions } from '../reducer/context'

export default function ProjectList() {
  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const { projects } = state;

  const [selectedProject, setSelectedProject] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectFormValue, setNewProjectFormValue] = useState("");

  const newProject = () => {
    setShowNewProjectForm(true);
  }

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const title = formValue !== null ? formValue : projects[id].title;
    actions.data.updateProject({ id, title })
      .then(() => {
        setSelectedProject(null);
        setFormValue(null);
      })
  }

  const handleCancel = event => {
    event.preventDefault();
    setSelectedProject(null);
  }

  const handleChange = event => {
    setFormValue(event.target.value);
  }

  const handleNewProjectFormChange = event => {
    setNewProjectFormValue(event.target.value);
  }

  const handleNewProjectSubmit = event => {
    event.preventDefault();
    actions.data.addProject({ title: newProjectFormValue })
      .then(() => {
        setNewProjectFormValue("");
        setShowNewProjectForm(false)
      })
  }

  const handleNewProjectCancel = event => {
    event.preventDefault();
    setNewProjectFormValue("");
    setShowNewProjectForm(false)
  }

  const projectItems = projects && Object.values(projects).map(project => (
    <ProjectListItem
      {...project}
      key={project.id}
      selected={ project.id === selectedProject}
      onEditClick={() => setSelectedProject(project.id)}
      onCancelClick={handleCancel}
      onSubmit={(event) => handleSubmit(event, project.id)}
      handleChange={handleChange}
      formValue={formValue === null ? project.title : formValue}
    />
  ))

  const headerActions = {
    "New Project": newProject
  }

  return (
    <div className="projects">
      <PageHeader
        title="Projects"
        actions={headerActions}
      />

      <ul className="list-group">
        {projectItems}
      </ul>
      <div className="newProject">
        { showNewProjectForm &&
          <form className="row row-cols-lg-auto g-3" onSubmit={handleNewProjectSubmit}>
            <div className="col-12">
              <label className="visually-hidden" htmlFor="newProject">New project name:</label>
              <input
                className="form-control"
                type="text"
                id="newProject"
                value={newProjectFormValue}
                onChange={handleNewProjectFormChange}
              ></input>
            </div>
            <div className="col-12">
              <button className="btn btn-success" type="submit">Submit</button>
            </div>
            <div className="col-12">
              <button className="btn btn-danger" type="button" onClick={handleNewProjectCancel}>Cancel</button>
            </div>
          </form>
        }
      </div>
    </div>

  )
}