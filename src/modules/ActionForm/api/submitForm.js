import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

export function submitForm(form) {
    let sendForm = {};
    Object.keys(form.data).forEach((field) => sendForm[field] = form.data[field].value);
    Object.keys(form.meta).forEach((field) => sendForm[field] = form.meta[field]);
    if (form.type === 'buy') {
        const request = `https://mail.google.com/mail/?view=cm&fs=1&to=fomenko75@mail.ru
        &subject=${sendForm.customer_name} хочу купить
        &body=${sendForm.customer_email} привет`;
        console.log(sendForm)
        window.open(request)
        // window.location.href = ;
    } else {
        triggerEvent("action:callback", sendForm);
    }
}