

let item = null;
let container = null;
let btn = null;
let transform = null;

function getMaxBottom(container) {
    let m = 0;
    for (const block of container.children[0].children) {
        let rect = block.getBoundingClientRect();
        m = Math.max(m, block.offsetTop + rect.height);
    }
    return m;
}

export function initContainerHeight(container) {
    let contHeight = getMaxBottom(container);
    container.style.height = contHeight + "px";
}

function checkNears(px, py) {
    let curBlock = item.getBoundingClientRect();
    let items = container.children[0].children;
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

export function setItemProps(offset, width) {
    let win = container.getBoundingClientRect();
    if (width != null) item.style.maxWidth = width / win.width * 100 + "%";
    if (offset != null) item.style.left = offset / win.width * 100 + "%";
}

function moveAt(event, shiftX, shiftY) {
    let rect = btn.getBoundingClientRect();
    let block = item.getBoundingClientRect();
    let win = item.closest(".transform-container").getBoundingClientRect();

    let btnX = rect.left + rect.width / 2 + shiftX;
    let btnY = rect.top + rect.height / 2 + shiftY;

    let deltaX = event.clientX - btnX;
    let deltaY = event.clientY - btnY;
    
    if (transform.type === "resize") {
        if (transform.dir === 'resize-left') deltaX *= -1;
        let offsetL = item.offsetLeft;
        let imgWidth = block.width + deltaX;

        if (transform.dir === 'resize-right' && imgWidth + offsetL > win.width) imgWidth = block.width;
        imgWidth = Math.max(100, imgWidth);

        if (transform.dir === 'resize-left') {
            offsetL = offsetL + (block.width - imgWidth);
            if (offsetL <= 0) imgWidth = block.width;
            offsetL = Math.max(0, offsetL);
        }
        setItemProps(offsetL, imgWidth);
    } else {
        let px = item.offsetLeft + deltaX;
        let py = item.offsetTop + deltaY;
        if (event.ctrlKey) {
            if (checkNears(px, py - deltaY)[0]) px = item.offsetLeft;
            if (checkNears(px - deltaX, py)[1]) py = item.offsetTop;
        }
        if (px < 0) px = 0;
        if (py < 0) py = 0;
        if (px + block.width > win.width) px = win.width - block.width;
        item.style.top = py + "px";
        item.style.left = px / win.width * 100 + "%";
    }
    initContainerHeight(container);
    mouseMoved = true;
}

export function setItemTransform(event, type, _item, _btn, callback) {
    transform = {type, dir:""};
    if (type !== "move") transform = {type:"resize", dir:type};
    container = _item.closest(".transform-container");
    item = _item;
    btn = _btn;

    initContainerHeight(container);
    document.body.style.userSelect = 'none';

    let shiftX = event.clientX - (btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2);
    let shiftY = event.clientY - (btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2);

    function onMouseMove(event) {
        if (!item.classList.contains("transformed")) item.classList.add("transformed");
        if (transform.type === "move") {
            item.style.position = 'absolute';
        }

        moveAt(event, shiftX, shiftY);
    }

    function onMouseUp() {
        document.body.style.userSelect = 'auto';
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        if (!mouseMoved) return;

        let data = {
            'event_type': 'UPDATE',
            'entry_action_type' : 'transform',
            'position' : item.style.position || '',
            'max_width' : item.style.maxWidth.replace("%", "") || "0",
            'top' : item.style.top.replace("px", "") || "0",
            'left' : item.style.left.replace("%", "") || "0",
        };

        callback(data);

        setTimeout(() => {
            item.classList.remove("transformed");
        }, 100)

        mouseMoved = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}