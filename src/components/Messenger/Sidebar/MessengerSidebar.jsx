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
import {useSwipeable} from "react-swipeable";
import {config} from "../../../ui/Swipes/config";

const MessengerSidebar = () => {
    const {rooms, room, users, user} = useContext(MessengerContext);

    function setRoom(id) {
        if (room.id === id) id = '';
        triggerEvent("messenger:update-room", id);
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

    const swipes = useSwipeable({
        onSwiped: (eventData) => {
            console.log(eventData)
            if (eventData.dir === 'Left' && isOpened) setOpened(false);
            if (eventData.dir === 'Right' && !isOpened) setOpened(true);
        },
        ...config,
    });

    async function getOrCreateRoom(item) {
        let room = null;
        let check = [users[item].email, user.email].sort();
        const equal = (a, b) => a.every((el, i) => el === b[i]);
        for (const r of Object.values(rooms)) {
            if (equal(r.users.sort(),check)) {
                room = rooms[r.id];
                break;
            }
        }
        if (!room) {
            room = await createRoom([users[item], user]);
        }
        setRoom(room.id);
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
            if (user.name.toLowerCase().includes(value.toLowerCase())) {
                newUsers[user.id] = user;
            }
        })
        setUserList(newUsers);
    }
    return (
        <div className={"messenger__sidebar " + (isOpened ? 'opened' : 'closed')} {...swipes}>
            <Slider togglers={togglers} callback={(v) => setOpened(v)} defaultOpened={isOpened}>
                <div className={"sidebar-container"}>
                    <div className={"sidebar__search"}>
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
                                 selectCallback={getOrCreateRoom} user={user}>
                    </SidebarList>
                    <SidebarList className={'sidebar__rooms'}
                                 list={rooms}
                                 currentItem={(id) => id === room.id}
                                 text={'title'}
                                 subtext={true}
                                 selectCallback={setRoom} user={user}>
                    </SidebarList>
                </div>
            </Slider>
        </div>

    );
};

export default MessengerSidebar;