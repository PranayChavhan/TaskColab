import AboutPage from './pages/AboutPage';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import "./App.css"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Homepage/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/about' element = {<AboutPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App