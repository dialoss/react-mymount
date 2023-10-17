import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import Avatar from "ui/Avatar/Avatar";
import "./MessengerSidebar.scss";
import {triggerEvent} from "helpers/events";
import ToggleButton from "ui/Buttons/ToggleButton/ToggleButton";
import {ReactComponent as IconChevronRight} from "ui/Iconpack/icons/chevron-right.svg";
import Slider from "ui/Slider/Slider";
import {MessengerContext} from "components/Messenger/MessengerContainer";
import SidebarList from "./SidebarList";
import FormInput from "../../Modals/MyForm/Input/FormInput";

const MessengerSidebar = () => {
    const {rooms, room, users} = useContext(MessengerContext);

    function setRoom(id) {
        triggerEvent("messenger:set-room", id);
    }

    const [isOpened, setOpened] = useState(true);

    const togglers = [
        {
            element: <ToggleButton isOpened={isOpened}>
                        <IconChevronRight/>
                    </ToggleButton>,
            action: 'toggle',
            callback: () => setOpened(!isOpened),
        }
    ];

    function createRoom(item) {
        console.log(item)
        console.log(users[item])
    }

    const [userList, setUserList] = useState([]);
    useLayoutEffect(() => {
        setUserList(users);
    }, [users]);
    const [search, setSearch] = useState('');
    function handleSearch(event) {
        const value = event.target.value
        setSearch(value);
        let newUsers = {};
        Object.values(users).forEach(user => {
            if (user.name.toLowerCase().includes(value)) {
                newUsers[user.id] = user;
            }
        })
        setUserList(newUsers);
    }

    return (
        <div className={"messenger__sidebar"}>
            <Slider togglers={togglers} opened={300} closed={70}>
                <div className={"sidebar-container"}>
                    <div className="sidebar__search">
                        Поиск пользователей
                        <FormInput data={{name:'search', value:search, callback:handleSearch}}></FormInput>
                    </div>
                    <SidebarList className={'sidebar__users'}
                                 list={userList}
                                 currentItem={() => false}
                                 textSelector={'name'}
                                 clickCallback={createRoom}>
                    </SidebarList>
                    <SidebarList className={'sidebar__rooms'}
                                 list={rooms}
                                 currentItem={(id) => id === room.id}
                                 textSelector={'title'}
                                 clickCallback={setRoom}>
                    </SidebarList>
                </div>
            </Slider>
        </div>

    );
};

export default MessengerSidebar;