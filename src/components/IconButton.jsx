import { getSvgSizeObj } from '../helpers/imageHelpers'

import '../styles/IconButton.css'

export default function IconButton(props) {
  const {fill, dimensions, offset, scale = 1, onClick} = props;

  const path = props.children;

  const sizeAttributes = getSvgSizeObj(scale, dimensions, offset)

  return (
    <button className={"icon-button"} onClick={onClick}>
      <svg fill={fill} {...sizeAttributes}>
        {path}
      </svg>
    </button>
  )
}