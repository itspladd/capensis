export default function ProjectListItem(props) {
  const { id, title, selected, onEditClick, onSubmit, formValue, handleChange } = props;

  return (
    <li key={id}>
      <span>ID: {id}</span>
      <span><strong>{title}</strong></span>
      { selected && 
        <form onSubmit={onSubmit}>
          <label>New name: </label>
          <input type="text" value={formValue} onChange={handleChange}></input>
          <button>Submit</button>
        </form>
      }
      { !selected &&
        <button onClick={onEditClick}>Edit</button>
      }
    </li>
  )
}