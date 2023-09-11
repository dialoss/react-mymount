import React, {useEffect, useState} from "react";
import './styles/App.scss';
import Navbar from "./components/Navigation/Navbar";
import {BrowserRouter} from "react-router-dom";
import ModalManager, {openModal} from "./components/Modal/ModalManager";
import AppRouter from "./components/Navigation/AppRouter";
import MyForm from "./components/MyForm/MyForm";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import {useFetching} from "./hooks/useFetching";
import sendRequest from "./scripts/network/requests";
import {actions, baseURL} from "./store/reducers/location";
import {useDispatch} from "react-redux";

function App() {
    const modalManager = (function() {
        return <ModalManager content={<MyForm/>}/>
    })();
    const [pages, setPages] = useState([]);
    const [appData, s1, s2] = useFetching(async () => {
        const response = await sendRequest(baseURL + '/get_static_data/', {});
        setPages(response.pages);
    });
    useEffect(() => {
        appData();
    }, []);

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
                    {modalManager}
                </div>
            </div>
            <Sidebar pagesTree={pages}/>
            <Footer totalViews={0} curViews={0}/>
        </div>
    );
}

export default App;
