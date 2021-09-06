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
    setSelectedProject(null);
    setFormValue(null);
    const newProject = {...projects[id], title: formValue};
    setProjects(prev => ({
      ...prev,
      [id]: newProject
    }))
    axios.patch(`/api/projects/${id}`, { title: formValue })
         .then(res => console.log(res))
  }

  const handleDelete = (event, id) => {

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

  const projectItems = Object.values(projects).map(project => (
    <ProjectListItem 
      {...project}
      selected={ project.id === selectedProject}
      onEditClick={() => setSelectedProject(project.id)}
      onSubmit={(event) => handleSubmit(event, project.id)}
      handleChange={handleChange}
      formValue={formValue === null ? project.title : formValue}
    />
  ))

  return (
    <div>
      <h3>My Projects</h3>
      { !showNewProjectForm &&
        <button onClick={() => setShowNewProjectForm(true)}>Add a Project</button>
      }
      { showNewProjectForm &&
        <form onSubmit={handleNewProjectSubmit}>
          <label>New project name:</label>
          <input type="text" value={newProjectFormValue} onChange={handleNewProjectFormChange}></input>
          <button type="submit">Submit</button>
        </form>
      }
      <ul>
        {projectItems}
      </ul>
    </div>
  )
}