import React from "react";
import 'styles/App.scss';
import Navbar from "components/Navigation/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "components/Navigation/AppRouter";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Navigation/Sidebar/Sidebar";
import {actions} from "store/reducers/location";
import {useDispatch} from "react-redux";
import ModalManager from "components/Modal/ModalManager";
import {changeModal} from "./components/Modal/changeModal";

function App() {
    const dispatch = useDispatch();
    dispatch(actions.setLocation());

    return (
        <div className="App">
            <div className="wrapper">
                <div className="content">
                    <BrowserRouter>
                        <Navbar></Navbar>
                        <AppRouter></AppRouter>
                    </BrowserRouter>
                    <button onClick={() => changeModal('form', {isOpened:true})}>open</button>
                </div>
            </div>
            <Sidebar/>
            <Footer/>
            <ModalManager/>
        </div>
    );
}

export default App;
