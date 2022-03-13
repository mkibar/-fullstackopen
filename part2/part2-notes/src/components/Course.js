import Part from './Part'
import Header from './Header'

const Course = (props) => {
    const total = props.parts.reduce((a, e) => a + e.exercises, 0)
  return(
        <>
        <Header name={props.name}/>
        <ul>
        {props.parts.map((e) => <Part key={e.id} name={e.name} exercises={e.exercises}></Part>)}
        </ul>
        <p><b>Total of {total} exercises</b></p>
        </>
    )
}
export default Course;