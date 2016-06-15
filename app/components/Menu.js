import React from 'react';

const Menu = (props) => {
  return (
    <div className="menu">
      <Form
       handleSubmit={props.submitData}
        updateLocation={props.updateLocation}
      />
      <a onClick={props.getCurrentLocation}>Use the current location</a>
    </div>
  )
}

const Form = (props) => {
  function changeLocation(e) {
    e.preventDefault()
    props.updateLocation(e.target.value)
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <i className="fa fa-search"></i>
      <input className="search" type="text" placeholder="Enter a city"
        onChange={changeLocation}/>
      <input className="submit" type="submit" value="Go"/>
    </form>
  )
}

export default Menu;
