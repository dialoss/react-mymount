import React from "react";
import 'styles/App.scss';
import {Messenger} from "./components/Messenger";
import {useSelector} from "react-redux";
import Sidebar from "./components/Sidebar/components/Sidebar/Sidebar";
import {TemplatePage} from "./pages/TemplatePage";
import CarouselContainer from "./components/Modals/Carousel/CarouselContainer";

function App() {
    const user = useSelector(state => state.user);
    return (
        <div className="App">
            {/*<p className={'chat'}>ЧАТ</p>*/}
            <Sidebar picker={false}
                     data={{sublist:[], depth:-1}}/>
            {!!user.email && <Messenger appName={'test'} user={user}></Messenger>}
            <CarouselContainer></CarouselContainer>
            {/*<TemplatePage/>*/}
        </div>
    );
}

export default App;
