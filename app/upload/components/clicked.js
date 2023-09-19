export default function Clicked (props){

    return <button onClick={props.onClick} className="class" style={{backgroundColor: "#ffa9a9",color: "white"}}>{props.children}</button>;
  };