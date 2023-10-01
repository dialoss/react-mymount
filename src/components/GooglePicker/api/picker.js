import {getFileType} from "../helpers/files";
import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

const DEVELOPER_KEY = 'AIzaSyDDqSATTGIXHgBRwl_S4mPCcATYJsISOhM';

export let accessToken = '';
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
    picker.W.style.position = "fixed";
    picker['Xa'].style.position = "fixed";
}

async function setAll() {
    if (accessToken === '') {
        const response = await sendLocalRequest('/get_gdrive_token/');
        accessToken = response.token;
    }
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
        .setOAuthToken(accessToken)
        .setDeveloperKey(DEVELOPER_KEY)
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
                filename : d.name,
                url: "https://drive.google.com/uc?id=" + d.id,
                type,
            });
        }
        if (curUploadField == null && data[google.picker.Response.VIEW][0] !== 'upload') {
            files.forEach(file => {
                let send_data = {
                    'event_type': 'ADD',
                    'entry_action_type' : 'add',
                    'from' : 'drive_select',
                    'media' : [file],
                }
                triggerEvent("action:callback", send_data);
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