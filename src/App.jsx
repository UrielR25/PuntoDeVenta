import { NavLink, Route, Routes } from 'react-router-dom'
import CreateItem from './pages/CreateItem/CreateItem'
import Sale from './pages/Sale/Sale'

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Punto de Venta</h1>
        <nav className="tabs">
          <NavLink to="/crear" className={({ isActive }) => isActive ? 'active' : ''}>Crear Artículo</NavLink>
          <NavLink to="/venta" className={({ isActive }) => isActive ? 'active' : ''}>Venta</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CreateItem />} />
          <Route path="/crear" element={<CreateItem />} />
          <Route path="/venta" element={<Sale />} />
        </Routes>
      </main>
    </div>
  )
}
