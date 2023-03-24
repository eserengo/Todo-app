const Heading = (props) => {
  if (props.query == 'h1') return <h1 className={props.className}>{props.content}</h1>;
  if (props.query == 'h2') return <h2 className={props.className}>{props.content}</h2>;
  return <h3 className={props.className}>{props.content}</h3>;
}

export default Heading;