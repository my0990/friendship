export default function ClassInfo (props){

    return <button {...props} className="class">{props.children}</button>;
  };