import React from "react";
import './styles/App.scss';
import Navbar from "./components/Navigation/Navbar";
import {BrowserRouter} from "react-router-dom";
import ModalManager, {openModal} from "./components/Modal/ModalManager";
import AppRouter from "./components/Navigation/AppRouter";
import MyForm from "./components/MyForm/MyForm";
import Footer from "./components/Footer/Footer";

function App() {
    const modalManager = (function() {
        return <ModalManager content={<MyForm/>}/>
    })();

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar></Navbar>
                <AppRouter></AppRouter>
            </BrowserRouter>
            <button onClick={openModal}>open</button>
            <Footer totalViews={0} curViews={0}/>
            {modalManager}
        </div>
    );
}

export default App;
