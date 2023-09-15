import formData from './FormData.json';
import store from 'store/store';

function initData() {
    let propsRefactor = {};
    Object.values(formData.properties).forEach((field, index) => {
        propsRefactor[field.name] = field;
    });
    formData.properties = propsRefactor;
}

initData();

function fillForm(form, element) {
    if (element.id === -1) return form;
    const infoBlock = element.data.querySelector(":scope > .info__block");
    for (const field of ['description', 'title']) {
        form.data[field].value = infoBlock.querySelector(`info__paragraph-${field}`).value;
    }
    return form;
}

export function getFormData(type, element) {
    const location = store.getState().location;
    const properties = formData.properties;
    const formType = formData.fields[type];
    let formFields = {};
    if (element.item.id !== -1 && type === 'edit') {
        let type = element.item.data.classList[2].split('-')[1];
        formFields = formType[type];
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
        data: {},
    };
    formFields.forEach((field) => {
        form.data[properties[field].name] = properties[field];
    });
    form = fillForm(form, element.item);
    form = fillForm(form, element.entry);
    return form;
}