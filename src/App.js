import React from "react";
import 'styles/App.scss';
import Navbar from "components/Navigation/Navbar";
import {BrowserRouter} from "react-router-dom";
import ModalManager, {openModal} from "components/Modal/ModalManager";
import AppRouter from "components/Navigation/AppRouter";
import MyForm from "components/MyForm/MyForm";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Navigation/Sidebar/Sidebar";
import {actions} from "store/reducers/location";
import {useDispatch} from "react-redux";
import ContextMenu from "components/Modal/Context/Context";

function App() {
    const formModal = (function() {
        return <ModalManager content={{data:<MyForm/>}}/>
    })();
    const contextModal = (function() {
        return <ModalManager content={{data:<ContextMenu/>}}/>
    })();

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
                    <button onClick={openModal}>open</button>
                </div>
            </div>
            {formModal}
            {contextModal}
            {/*<Sidebar/>*/}
            <Footer/>
        </div>
    );
}

export default App;
