import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'
import '../styles/PageHeader.css'

function PageHeader({ nav, back, forward, title, subtitle, actions }) {

  // Make any action buttons passed in through props
  const actionButtons = Object.keys(actions).map(label => (
    <Button key={label} onClick={actions[label]}>
      {label}
    </Button>
  ))

  return(
    <div className="page_header p-1">
      {nav &&
      <>
        <Button
        variant="info"
        onClick={back}>
        {`<`}
        </Button>
        <Button
          variant="info"
          onClick={forward}>
          {`>`}
        </Button>
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