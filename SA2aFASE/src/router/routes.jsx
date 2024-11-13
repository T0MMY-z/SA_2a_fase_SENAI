import { createBrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Calendario from "../pages/Calendario";
import Perfil from "../pages/Perfil";
import Login from "../pages/Login";
import Relatorio from "../pages/Relatorio";

const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/registro", element: <Registro />},
    {path: "/calendario", element: <Calendario />},
    {path: "/perfil", element: <Perfil />},
    { path: "/login", element: <Login /> },
    { path: "/relatorio", element: <Relatorio /> },
])

export default router;
