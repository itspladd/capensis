export default function Header(props) {
  const { username, handleLogout } = props;

  return(
    <div className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Timekeeper</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/day">Day</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/week">Week</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">Reports</a>
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