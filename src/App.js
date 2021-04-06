import React from 'react'
import Pages from './pages/pages'
import {BrowserRouter, Link} from 'react-router-dom'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    )
  }
}
export default App;