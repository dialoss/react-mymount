import {getFileType} from "../helpers/files";
import {triggerEvent} from "helpers/events";
import Credentials from "modules/Authorization/api/googleapi";
import styles from "../GooglePicker.module.scss";

let pickerCreated = false;
let pickerInited = false;
let gisInited = false;
let uploadView = null;
let curUploadField = null;
let picker = null;

function onApiLoad() {
    window.gapi.load('auth');
    window.gapi.load('picker', { callback: onPickerApiLoad });
}

function onPickerApiLoad() {
    pickerInited = true;
    setAll();
}

function gisLoaded() {
    gisInited = true;
}

export function showPicker(uploadField) {
    curUploadField = uploadField;
    picker.setVisible(true);
    // picker.W.classList.add(styles['picker-dialog']);
    // picker.Xa.classList.add(styles['picker-dialog-bg']);
    let pickerStyle = {
        position: 'fixed',
        top: '0',
        right: '0',
        left: 'auto',
        // transform: 'translate(-50%, -50%)',
        border: 'none',
    };
    let bgStyle = {
        opacity: '0',
        position: 'fixed',
    };
    setTimeout(() => {
        try {
            picker.Ue.style.maxWidth = "400px";
        } catch (e){}
    }, 1000);
    picker.Xa.addEventListener("click", () => picker.setVisible(false));
    for (const s of Object.keys(pickerStyle)) {
        picker.W.style[s] = pickerStyle[s];
    }
    for (const s of Object.keys(bgStyle)) {
        picker.Xa.style[s] = bgStyle[s];
    }
}

async function setAll() {
    const google = window.google;
    uploadView = new google.picker.DocsUploadView()
        .setIncludeFolders(true);
    const allView = new google.picker.DocsView()
    const folderView = new google.picker.DocsView()
        .setIncludeFolders(true)
        .setParent('1KlLCb36NwgGql3grcNAf4pXkH9SKBKEj')
        .setSelectFolderEnabled(true);

    picker = new google.picker.PickerBuilder()
        .addView(folderView)
        .addView(allView)
        .addView(uploadView)
        .setOAuthToken(Credentials.get().ACCESS_TOKEN)
        .setDeveloperKey(Credentials.get().API_KEY)
        .setCallback(pickerCallback)
        .setLocale("ru")
        .setSize((2000, 2000))
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .build();
}

async function pickerCallback(data) {
    const google = window.google;
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        let files = [];
        for (const d of data[google.picker.Response.DOCUMENTS]) {
            let type = getFileType(d.name);
            files.push({
                id: -1,
                filename : d.name,
                url: "https://drive.google.com/uc?id=" + d.id,
                type,
            });
        }
        if (curUploadField == null && data[google.picker.Response.VIEW][0] !== 'upload') {
            files.forEach(file => {
                triggerEvent("action:callback", () => [{
                    method: 'POST',
                    element: {type: 'entry'},
                    items: [file],
                }]);
            });
        }
        if (curUploadField != null) {
            if (files.length) curUploadField(files);
        }
    }
}

export function initPicker() {
    if (pickerInited || pickerCreated) return;
    pickerCreated = true;
    let pickerApi = document.createElement("script");
    let pickerClient = document.createElement("script");
    pickerApi.onload = onApiLoad;
    pickerClient.onload = gisLoaded;
    pickerApi.src = "https://apis.google.com/js/api.js";
    pickerClient.src = "https://accounts.google.com/gsi/client";
    pickerApi.setAttribute("defer", "defer");
    pickerClient.setAttribute("defer", "defer");
    document.head.append(pickerApi);
    document.head.append(pickerClient);
}