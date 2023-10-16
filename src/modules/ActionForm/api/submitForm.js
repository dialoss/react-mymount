import Actions from "../../../components/Modals/ContextMenu/components/EntryActions/actions";

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
    // for (const setting of (sendForm.settings || [])) {
    //     sendForm[setting] = !form.element.data[setting];
    // }
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
        Actions.action(() => [sendForm]);
    }
}