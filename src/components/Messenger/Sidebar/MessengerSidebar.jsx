import React, {useState} from 'react';
import Avatar from "ui/Avatar/Avatar";
import "./MessengerSidebar.scss";
import {triggerEvent} from "helpers/events";
import ToggleButton from "ui/Buttons/ToggleButton/ToggleButton";
import {ReactComponent as IconChevronRight} from "ui/Iconpack/icons/chevron-right.svg";
import Slider from "ui/Slider/Slider";

const MessengerSidebar = ({rooms, currentRoom}) => {
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

    return (
        <div className={"messenger__sidebar"}>
            <Slider togglers={togglers}><div className={"sidebar-container"}>
                {
                    Object.values(rooms).map((room, index) =>
                        <div className={"sidebar-item " + (room.id === currentRoom.id ? "current" : '')}
                             onClick={() => setRoom(room.id)} key={index}>
                            <Avatar src={room.picture}
                                    style={{width:50, height:50, }}
                                    key={index}></Avatar>
                            <h3 className={"title"}>{room.title}</h3>
                        </div>)
                }
            </div>
            </Slider>
        </div>

    );
};

export default MessengerSidebar;