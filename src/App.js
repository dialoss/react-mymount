import React from "react";
import './styles/App.scss';
import Navbar from "./components/Navigation/Navbar";
import {BrowserRouter} from "react-router-dom";
import ModalManager, {openModal} from "./components/Modal/ModalManager";
import AppRouter from "./components/Navigation/AppRouter";
import MyForm from "./components/MyForm/MyForm";
import Footer from "./components/Footer/Footer";
import {actions} from "./store/reducers/entrys";
import {useDispatch} from "react-redux";
import {useFetching} from "./hooks/useFetching";
import sendRequest from "./scripts/network/requests";
import {useMyLocation} from "./hooks/useMyLocation";

function InitPage() {
    const dispatch = useDispatch();
    const sendData = {
        url: 'http://127.0.0.1:8000' + useMyLocation().relativeURL,
        data: {
            'ajax': true,
        }
    };
    useFetching(async () => {
        await sendRequest(sendData.url, sendData.data).then(res => res.json()).then(data => {
            dispatch(actions.setAmount(data.entrys_amount));
        });
    })
}

function App() {
    const modalManager = (function() {
        return <ModalManager content={<MyForm/>}/>
    })();
    InitPage();
    return (
        <div className="App">
            <div className="wrapper">
                <div className="content">
                    <BrowserRouter>
                        <Navbar></Navbar>
                        <AppRouter></AppRouter>
                    </BrowserRouter>
                    <button onClick={openModal}>open</button>
                    {modalManager}
                </div>
            </div>
            <Footer totalViews={0} curViews={0}/>
        </div>
    );
}

export default App;
