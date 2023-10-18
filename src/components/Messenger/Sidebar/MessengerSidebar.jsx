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
import {createRoom} from "../api/firebase";

const MessengerSidebar = () => {
    const {rooms, room, users, user} = useContext(MessengerContext);

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

    async function getOrCreateRoom(item) {
        let room = null;
        Object.values(rooms).forEach(r => {
           if (r.users.includes(users[item].email) &&
               r.users.includes(user.email)) room = rooms[r.id];
        });
        if (!room) {
            await createRoom([users[item], user]);
        }
    }

    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    function handleSearch(event) {
        const value = event.target.value;
        setSearch(value);
        if (!value) {
            setUserList([]);
            return;
        }
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
                        <FormInput data={{
                            name: 'search',
                            value: search,
                            callback: handleSearch,
                            placeholder: 'Поиск пользователей',
                        }}></FormInput>
                        {!Object.keys(userList).length && !!search && <p>Пользователи не найдены</p>}
                    </div>
                    <SidebarList className={'sidebar__users'}
                                 list={userList}
                                 currentItem={() => false}
                                 text={'name'}
                                 selectCallback={getOrCreateRoom}>
                    </SidebarList>
                    <SidebarList className={'sidebar__rooms'}
                                 list={rooms}
                                 currentItem={(id) => id === room.id}
                                 text={'title'}
                                 subtext={'lastMessage'}
                                 selectCallback={setRoom}>
                    </SidebarList>
                </div>
            </Slider>
        </div>

    );
};

export default MessengerSidebar;