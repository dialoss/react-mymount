function FormField(name, text, attrs, type, value) {
    this.name = name;
    this.text = text;
    this.attrs = attrs;
    this.type = type;
    this.value = value;
}

export const emptyForm = [
    {...new FormField('display_pos',    '',           ['hidden'],   'input', '-1')},
    {...new FormField("tab_id",         '',           ['hidden'],   'input',  '0')},
    {...new FormField("customer_email", 'Ваш email',  [],           'input', '')},
    {...new FormField("customer_name",  'Ваше имя',   [],           'input', '')},
    {...new FormField("media",          'Медиа',      [],           'upload',[])},
    {...new FormField("files",          'Файлы',      [],           'upload',[])},
    {...new FormField("new_page_slug",  'Название страницы', ['required'], 'input', '')},
    {...new FormField("description",    'Описание',   [],           'textarea', '')},
    {...new FormField("title",          'Заголовок',  [],           'textarea', '')},
    {...new FormField("textfields",   'Количество текстовых полей', {},'input','0')},
    {...new FormField("price",        'Цена',       [],             'input', '')}
];