import React, {useState} from "react";
import './styles/App.css'
import Navbar from "./components/Navigation/Navbar";
import Modal from "./components/Modal/Modal";

function App() {
    const [modalOpened, toggleModal] = useState(false);
    function openModal() {
        toggleModal(true);
    }
  return (
    <div className="App">
        <Navbar navDatas={[
            {'url':'/main/', 'navText':'главная'},
            {'url':'/models/', 'navText':'модели'},
            {'url':'/parts/', 'navText':'детали'}
        ]}></Navbar>
        <button onClick={openModal}>open</button>
        <Modal props={{modalOpened, toggleModal}}></Modal>
    </div>
  );
}

export default App;
