// Router components
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
  const { username, handleLogout, currentSession } = props;

  return(
    <div className="navbar navbar-expand-sm navbar-light bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Timekeeper</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/day">Schedule</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/week">Week</NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink to="/projects" className="nav-link">Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reports">Reports</NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <span className="navbar-text me-2">Logged in as {username}</span>
          <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}