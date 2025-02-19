import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import Lugares_de_ayuda from './pages/Lugares_de_ayuda.jsx';
import Embajadas from './pages/Embajadas.jsx';
import Mensajeria from './pages/Mensajeria.jsx';
import Blog from './pages/Blog.jsx';
import Gadgets from './pages/Gadgets.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Contact_list from './pages/Contact_list.jsx';
import Requisitos_migratorios from './pages/Requisitos_migratorios.jsx';
import Saldo_paypal from './pages/Saldo_paypal.jsx';
import Preguntas_frecuentes from './pages/Preguntas_frecuentes.jsx';
import Emergencia from './pages/Emergencia.jsx';
import Estadisticas_reportes from './pages/Estadisticas_reportes.jsx';
import Contactar_ayuda from './pages/Contactar_ayuda.jsx';
import Vista_ubicacion from './pages/Vista_ubicacion.jsx';
import Consola_manejo_de_datos from './pages/Consola_manejo_de_datos.jsx';
import Panel_edicion_dashboard from './pages/Panel_edicion_dashboard.jsx';
import injectContext from "./store/appContext";
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/lugares-de-ayuda" element={<Lugares_de_ayuda />} />
                        <Route path="/embajadas" element={<Embajadas />} />
                        <Route path="/mensajeria" element={<Mensajeria />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/gadgets" element={<Gadgets />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/contact-list" element={<Contact_list />} />
                        <Route path="/requisitos-migratorios" element={<Requisitos_migratorios />} />
                        <Route path="/saldo-paypal" element={<Saldo_paypal />} />
                        <Route path="/preguntas-frecuentes" element={<Preguntas_frecuentes />} />
                        <Route path="/emergencia" element={<Emergencia />} />
                        <Route path="/estadisticas-reportes" element={<Estadisticas_reportes />} />
                        <Route path="/contactar-ayuda" element={<Contactar_ayuda />} />
                        <Route path="/vista-ubicacion" element={<Vista_ubicacion />} />
                        <Route path="/consola-manejo-datos" element={<Consola_manejo_de_datos />} />
                        <Route path="/panel-edicion-dashboard" element={<Panel_edicion_dashboard />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
