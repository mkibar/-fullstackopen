const Header = (props) => {

  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {

  return(
    <>
      <h3>Course Contents</h3>
      
      {props.vals.map((element,i) => {
         return( <Part key={i} part={element.part} exercise={element.exercise}/> )
      })}
    </>
  )
}


const Part = (props) => {

  return(
    <>
      <p key={props.i}> {props.part} {props.exercise} </p>
    </>
  )
}

const Total = (props) => {

  return(
    <>
      <b> <p>Number of exercises {props.total}</p></b>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  
  const contentValues = [
    {part:"Fundamentals of React", exercise: 10 },
    {part:"Using props to pass data", exercise:7 },
    {part:"State of a component ", exercise: 14} ]
    
  return (
    <div>
      <Header course={course} />
      <Content vals={contentValues}/>
      <Total total={contentValues.reduce((sum, val) => sum + val.exercise,0)} />
    </div>
  )
}

export default App
