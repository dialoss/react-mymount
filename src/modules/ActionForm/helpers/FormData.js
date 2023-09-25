import formData from './FormData.json';
import store from 'store';
import {getFileType} from "../../../components/GooglePicker/helpers/files";

function initData() {
    let propsRefactor = {};
    Object.values(formData.properties).forEach(field => {
        propsRefactor[field.name] = field;
    });
    formData.properties = propsRefactor;
}

initData();

function setFormField(form, field, value) {
    if (Object.keys(form).includes(field)) form[field].value = value;
}

function fillForm(form, element, media) {
    if (element.id === -1) return;
    for (const field of ['description', 'title']) {
        setFormField(form.data, field, element.data[field]);
    }
    setFormField(form.data, 'media', media.map(med => {return {type: med.type, url: med.url, name: med.filename}}));
}

function setSelect(form, select, toggle) {
    let text = form.data['settings'].attrs[select].value;
    if (!toggle) {
        text = text.split(' ').slice(-2).join(' ');
        text = text[0].toUpperCase() + text.slice(1);
    } else {
        text = "Не " + text;
    }
    form.data['settings'].attrs[select].value = text;
}

export function getFormData(type, element) {
    const location = store.getState().location;
    let properties = formData.properties;
    let formType = formData.fields[type];
    let formFields = {};
    if (element.item.id !== -1 && type === 'edit') {
        formFields = formType[element.item.type];
    }
    else {
        let fieldsPage = {};
        if (location.pageParent === location.pageSlug) {
            fieldsPage = formType['parent'];
        } else {
            fieldsPage = formType['child'];
        }
        formFields = fieldsPage[location.pageSlug];
        if (formFields === undefined) {
            formFields = fieldsPage['base'];
        }
    }

    let form = {
        title: formType.title,
        button: formType.button.split('_')[1],
        meta: {},
        data: {}
    };
    formFields.forEach((field) => {
        form.data[properties[field].name] = structuredClone(properties[field]);
    });
    if (type === 'edit') {
        fillForm(form, element.item, [element.item.data]);
        if (element.item.id === -1) {
            fillForm(form, element.entry, element.entry.data.items.filter(item => item.type === 'image'));
        }
        if (Object.keys(form.data).includes("settings")) {
            if (element.item.id !== -1) {
                setSelect(form, 'toggle_shadow', element.item.data.show_shadow);
                form.data['settings'].attrs['toggle_date'].hidden = 'hidden';
            } else {
                form.data['settings'].attrs['toggle_shadow'].hidden = 'hidden';
            }
            setSelect(form, 'toggle_date', element.entry.data.show_date);
        }
        form.meta.event_type = 'UPDATE';
    } else {
        form.meta.event_type = 'ADD';
    }
    form.meta.entry_action_type = type;
    form.meta.entry_id = element.entry.id;
    form.meta.item_id = element.item.id;
    form.meta.display_pos = element.position;
    return form;
}