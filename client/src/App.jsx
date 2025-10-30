import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Admission from "./studentComponents/admission"
import SignUp from "./authCompnents/signUp"
function App() {

  return (
    <Routes>
      <Route path='/admission' element={<Admission />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
