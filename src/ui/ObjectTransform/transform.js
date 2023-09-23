
function getMaxBottom(container) {
    let m = 0;
    for (const block of container.children) {
        let rect = block.getBoundingClientRect();
        m = Math.max(m, block.offsetTop + rect.height);
    }
    return m;
}

export function initContainerHeight(container) {
    let contHeight = getMaxBottom(container);
    container.style.height = contHeight + "px";
}

function checkNears(item, container, px, py) {
    let curBlock = item.getBoundingClientRect();
    let items = container.children;
    let ch = curBlock.height;
    let ox = false;
    let oy = false;
    for (let j = 0; j < items.length; j++) {
        if (items[j] === item) continue;
        let cx1 = px;
        let cy1 = py;
        let cx2 = px + curBlock.width;
        let cy2 = py + curBlock.height;

        let nearBlock = items[j].getBoundingClientRect();
        let nx1 = items[j].offsetLeft;
        let ny1 = items[j].offsetTop;
        let nx2 = nx1 + nearBlock.width;
        let ny2 = ny1 + nearBlock.height;
        let nh = nearBlock.height;
        if (cx1 > nx1) {
            cx1 = [nx1, nx1 = cx1][0];
            cx2 = [nx2, nx2 = cx2][0];
            cy1 = [ny1, ny1 = cy1][0];
            cy2 = [ny2, ny2 = cy2][0];
        }
        if (cx2 - nx1 >= 0 && cy2 - ny1 >= 0 && cy2 - ny1 <= ch + nh) {
            if (cx2 - nx1 > 0) ox = true;
            if (cy2 - ny1 > 0 && cy2 - ny1 < ch + nh) oy = true;
        }
        if (cx2 - nx1 >= 0 && ny2 - cy1 >= 0 && ny2 - cy1 <= ch + nh) {
            if (cx2 - nx1 > 0) ox = true;
            if (ny2 - cy1 > 0 && ny2 - cy1 < ch + nh) oy = true;
        }
    }
    return [ox, oy];
}

let mouseMoved = false;

export function setItemProps(itemObj, offset, width) {
    let item = itemObj.item;
    let win = itemObj.container.getBoundingClientRect();
    if (width != null) item.style.maxWidth = width / win.width * 100 + "%";
    if (offset != null) item.style.left = offset / win.width * 100 + "%";
}

function moveAt(item, container, event, shiftX, shiftY, btn) {
    let rect = btn.getBoundingClientRect();
    let block = item.getBoundingClientRect();
    let win = container.getBoundingClientRect();

    let btnX = rect.left + rect.width / 2 + shiftX;
    let btnY = rect.top + rect.height / 2 + shiftY;

    let deltaX = event.clientX - btnX;
    let deltaY = event.clientY - btnY;

    // if (curTransformType === "resize") {
    //     if (dir === 'resize--left') deltaX *= -1;
    //     let offsetL = item.offsetLeft;
    //     let imgWidth = block.width + deltaX;
    //
    //     if (dir === 'resize--right' && imgWidth + offsetL > win.width) imgWidth = block.width;
    //     imgWidth = Math.max(100, imgWidth);
    //
    //     if (dir === 'resize--left') {
    //         offsetL = offsetL + (block.width - imgWidth);
    //         if (offsetL <= 0) imgWidth = block.width;
    //         offsetL = Math.max(0, offsetL);
    //     }
    //     setItemProps(itemObj, offsetL, imgWidth);
    // } else {
    //     let px = item.offsetLeft + deltaX;
    //     let py = item.offsetTop + deltaY;
    //
    //     if (px < 0) px = 0;
    //     if (py < 0) py = 0;
    //     if (px + block.width > win.width) px = win.width - block.width;
    //     item.style.top = py + "px";
    //     item.style.left = px / win.width * 100 + "%";
    // }
    if (event.ctrlKey) {
        if (checkNears(itemObj, px, py - deltaY)[0]) px = item.offsetLeft;
        if (checkNears(itemObj, px - deltaX, py)[1]) py = item.offsetTop;
    }
    initContainerHeight(container);
    mouseMoved = true;
}

export function setItemTransform(event, type, itemObj, btn) {
    let item = itemObj.item;

    initContainerHeight(itemObj);
    document.body.style.userSelect = 'none';

    let shiftX = event.clientX - (btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2);
    let shiftY = event.clientY - (btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2);

    function onMouseMove(event) {
        if (!item.classList.contains("moved")) item.classList.add("moved");

        moveAt(itemObj, event, shiftX, shiftY, {btn, type});
    }

    function onMouseUp() {
        document.body.style.userSelect = 'auto';
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        if (!mouseMoved) return;

        let data = {
            'entry_action_type' : 'transform',
            'position' : item.style.position || '',
            'max_width' : item.style.maxWidth.replace("%", "") || "0",
            'top' : item.style.top.replace("px", "") || "0",
            'left' : item.style.left.replace("%", "") || "0",
            // 'entry_id' : getEntryId(item.closest(".entry")),
            // 'item_id' : getItemId(item.querySelector(".entry__item"))
        };
        // sendData('/entry_action/', data);

        setTimeout(() => {
            item.classList.remove("moved");
        }, 100)

        mouseMoved = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}