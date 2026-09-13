import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './admin/admin.css'
import Site from './Site'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
