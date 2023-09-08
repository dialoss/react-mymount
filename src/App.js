import React, {useEffect, useState} from "react";
import './styles/App.css'
import Navbar from "./components/Navigation/Navbar";
import Modal from "./components/Modal/Modal";
import EntryList from "./components/Entry/EntryList";

function App() {
    const [modalOpened, toggleModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [entrys, setEntrys] = useState([]);
    function openModal() {
        toggleModal(true);
    }

    async function fetchEntrys() {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/ajax/', {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json;charset=utf-8',
            },
            body: JSON.stringify({}),
        }).then(res => res.json()).then(data => {
            setLoading(false);
            setEntrys(data.entrys_data);
        });
    }

    useEffect(() => {
        fetchEntrys();
    }, [])

    return (
        <div className="App">
            <Navbar navDatas={[
                {'url':'/main/', 'navText':'главная'},
                {'url':'/models/', 'navText':'модели'},
                {'url':'/parts/', 'navText':'детали'}
            ]}></Navbar>
            <button onClick={openModal}>open</button>
            <Modal toggleModal={toggleModal} opened={modalOpened}></Modal>
            <EntryList entrys={entrys}></EntryList>
        </div>
    );
}

export default App;
