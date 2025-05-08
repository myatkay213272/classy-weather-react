// import React from "react";


// class Counter extends React.Component {

//   constructor(props){
//     super(props)

//     this.state = {count : 5}
//   }


//   render(){
//     return (
//       <div>
//         <button> - </button>
//         <span> {this.state.count} </span>
//         <button> + </button>
//       </div>
//     )
//   }
// }

// export default Counter

import React, { useState } from 'react'

const Counter = () => {

  const [count,setCount] = useState(0)
  const date = new Date()
  date.setDate(date.getDate() + count)


  const handleDecrement = ()=>{
    setCount(count - 1)
  }

  const handleIncrement = ()=>{
    setCount(count + 1)
  }

  return (

    <div className='date'>
      <button onClick={handleDecrement}> - </button>
        <span> {date.toDateString()} [{count} ]</span>
        <button onClick={handleIncrement}> + </button>
    </div>
   
  )
}

export default Counter
