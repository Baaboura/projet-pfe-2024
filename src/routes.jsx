import { redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth";
import Signin from "./pages/auth/Signin";
import Home from "./pages/home/home";
import RechercherPage from "./pages/recherche";
import Marche from "./pages/marche/marche";
import EspaceBanque from "./pages/banque/espacebanque";
import EspaceEntreprise from "./pages/entreprise/espaceentreprise";
import DonneesSyncronise from "./pages/syncronise/DonneSyncronise";
import Alert  from "./pages/alert/alert";
import Notification  from "./pages/notification/notification";
import Parametre from "./pages/parametre/parametre";


export default function CustomRoutes() {
    const { isAuthed } = useAuth()

    const withAuth = () => (isAuthed) ? null : redirect("/signin")
    const withoutAuth = () => (!isAuthed) ? null : redirect("/")
    return [
        { path: "/", element: <Home />, loader: withAuth },
        { path: "/recherche", element: <RechercherPage />, loader: withAuth },
        { path: "/marche", element: <Marche />, loader: withAuth },
        { path: "/fichierBancaire", element: <EspaceBanque/>, loader: withAuth },
        { path: "/donneeSyncronise", element: <DonneesSyncronise/>, loader: withAuth },
        { path: "/fichierEntreprise", element: <EspaceEntreprise/>, loader: withAuth },
        { path: "/alert", element: <Alert/>, loader: withAuth },
        { path: "/notifications", element: <Notification/>, loader: withAuth },
        { path: "/parametre", element: <Parametre/>, loader: withAuth },



        { path: "/signin", element: <Signin />, loader: withoutAuth },
    ]
}