import Button from 'react-bootstrap/Button'
import '../styles/TabButton.css'

export default function TabButton(props) {
  return <Button className="tab" {...props}>{props.children}</Button>
}