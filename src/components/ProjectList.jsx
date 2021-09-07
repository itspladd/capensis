import axios from 'axios';
import { useState } from 'react'

import ProjectListItem from './ProjectListItem'

export default function ProjectList(props) {
  const { projects, setProjects } = props;

  const [selectedProject, setSelectedProject] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectFormValue, setNewProjectFormValue] = useState("");

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const title = formValue !== null ? formValue : projects[id].title;
    setSelectedProject(null);
    setFormValue(null);
    const newProject = {...projects[id], title};
    setProjects(prev => ({
      ...prev,
      [id]: newProject
    }))
    axios.patch(`/api/projects/${id}`, { title })
         .then(res => console.log(res))
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
    axios.post(`/api/projects`, { projectTitle: newProjectFormValue })
         .then(res => {
           const newProject = res.data;
           setProjects(prev => ({
             ...prev,
             [newProject.id]: newProject
           }))
         })
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

  const projectItems = Object.values(projects).map(project => (
    <ProjectListItem
      {...project}
      selected={ project.id === selectedProject}
      onEditClick={() => setSelectedProject(project.id)}
      onCancelClick={handleCancel}
      onSubmit={(event) => handleSubmit(event, project.id)}
      handleChange={handleChange}
      formValue={formValue === null ? project.title : formValue}
    />
  ))

  return (
    <div className="container">
      <h3>My Projects</h3>

      <ul className="list-group">
        {projectItems}
      </ul>
      <div className="newProject">
        { !showNewProjectForm &&
          <button
            className="btn btn-primary"
            onClick={() => setShowNewProjectForm(true)}
          >
              Add a Project
          </button>
        }
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