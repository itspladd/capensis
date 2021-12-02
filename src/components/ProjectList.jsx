import axios from 'axios';
import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import ProjectListItem from './ProjectListItem'

import '../styles/ProjectList.css'

export default function ProjectList(props) {
  const { projects, setProjects } = props;

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
    setSelectedProject(null);
    setFormValue(null);
    const newProject = {...projects[id], title};
    setProjects(prev => ({
      ...prev,
      [id]: newProject
    }))
    axios.patch(`/api/projects/${id}`, { title })
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

  const projectItems = projects && Object.values(projects).map(project => (
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