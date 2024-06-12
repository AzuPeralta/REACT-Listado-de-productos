
import { NavBar } from "./routes/components/NavBar"
import { HomeScreen } from "./routes/HomeScreen"
import { ListadoComercios } from "./routes/ListadoComercios"
import { ListadoProductos } from "./routes/ListadoProductos"
import { Navigate, Route, Routes } from "react-router-dom"

export const App = () => {
  

  return (
    <>
      <NavBar></NavBar>
      <br/>
      <Routes>
        <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
        <Route path="/productos" element={<ListadoProductos></ListadoProductos>}></Route>
        <Route path="/comercios" element={<ListadoComercios></ListadoComercios>}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>

      </Routes>
     
    </>
  )
}
