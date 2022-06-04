import { LoginPage } from './Pages/Login/login'
import { RegisterPage } from './Pages/Register/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/Home-Page/home-page'
import { EditPages } from './Pages/Edit-page/edit'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {getUser} from './redux/user-slice'

function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/edit' element={<EditPages />} />
      </Routes>
    </Router>
  )
}

export default App
