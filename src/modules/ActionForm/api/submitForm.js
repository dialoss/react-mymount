import {getLocation} from "hooks/getLocation";
import {triggerEvent} from "helpers/events";

export function submitForm(form) {
    let sendForm = {};
    Object.keys(form.data).forEach((field) => sendForm[field] = form.data[field].value);
    sendForm.items = [...(sendForm.media || []), ...(sendForm.files || [])];
    sendForm.items = sendForm.items.filter(item => (!item.id || item.id === -1));
    for (let i = 0; i < +sendForm.textfields; i++) {
        sendForm.items.push({
            type: 'textfield',
            text: 'Text Field',
        })
    }
    if (sendForm.price) {
        sendForm.items.push({
            type: 'price',
            price: sendForm.price,
        })
    }
    sendForm.method = form.method;
    sendForm.element = form.element;

    sendForm.display_pos = sendForm.element.display_pos;
    if (sendForm.element.type === 'screen') sendForm.element = {type: 'entry'};
    if (sendForm.new_page_slug) {
        sendForm.page_from = {
            slug: sendForm.new_page_slug,
            path: getLocation().relativeURL.slice(1) + sendForm.new_page_slug,
        }
    }

    switch (sendForm.settings) {
        case 'show_date': case 'show_shadow':
            sendForm[sendForm.settings] = !form.element.data[sendForm.settings];
            break;
        case 'clear_position':
            sendForm['position'] = 'initial';
            sendForm['top'] = '0';
            sendForm['left'] = '0';
            break;
        case 'clear_size':
            sendForm['max_width'] = 'auto';
            break;
    }

    for (const field of ['media', 'files', 'textfields']) {
        delete sendForm[field];
    }
    if (form.type !== 'buy') {
        triggerEvent("action:callback", () => [sendForm]);
    }
}