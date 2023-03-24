const Button = (props) => (
  <button type={props.type} className={props.className} onClick={props.onClick}>{props.content}</button>
)

export default Button;