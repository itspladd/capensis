export default function ProjectListItem(props) {
  const { id, title, selected, onEditClick, onCancelClick, onSubmit, formValue, handleChange } = props;

  return (
    <li key={id} className="list-group-item d-flex justify-content-between bg-light">
      <span><strong>{title}</strong></span>
      { selected &&
        <form className="row row-cols-sm-auto g-3 align-items-center" onSubmit={onSubmit}>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="newName">New name: </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="newName"
              value={formValue}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-12">
          <button className="btn btn-sm btn-secondary">Submit</button>
          </div>
          <div className="col-12">
              <button className="btn btn-sm btn-danger" onClick={onCancelClick}>Cancel</button>
            </div>
        </form>
      }
      { !selected &&
        <button
          className="btn btn-sm btn-info" onClick={onEditClick}>Rename</button>
      }
    </li>
  )
}