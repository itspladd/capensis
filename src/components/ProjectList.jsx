export default function ProjectList(props) {
  const { projects } = props;

  const projectItems = projects.map(project => (
    <li key={project.id}>ID: {project.id} <strong>{project.title}</strong></li>
  ))

  return (
    <div>
      <h3>My Projects</h3>
      <ul>
        {projectItems}
      </ul>
    </div>
  )
}