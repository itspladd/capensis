import PropTypes from 'prop-types'
import '../styles/PageHeader.css'

function PageHeader({ nav, back, forward, title, subtitle, actions }) {

  // Make any action buttons passed in through props
  const actionButtons = Object.keys(actions).map(label => (
    <button key={label} onClick={actions[label]}>{label}</button>
  ))

  return(
    <div className="page_header">
      {nav &&
      <>
        <button
        variant="info"
        onClick={back}>
        {`<`}
        </button>
        <button
          variant="info"
          onClick={forward}>
          {`>`}
        </button>
      </>
      }
      <div className="page_header_title">
        <h3>{title}</h3>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </div>
      { actionButtons.length && actionButtons }
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  nav: PropTypes.bool,
  back: PropTypes.func,
  forward: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.func),
}

PageHeader.defaultProps = {
  title: "Untitled Page",
  actions: {}
}

export default PageHeader;