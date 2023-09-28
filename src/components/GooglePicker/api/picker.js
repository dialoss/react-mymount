import {getFileType} from "../helpers/files";
import {fetchRequest, sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

const DEVELOPER_KEY = 'AIzaSyDDqSATTGIXHgBRwl_S4mPCcATYJsISOhM';
const CLIENT_ID = '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com';
const CLIENT_SECRET = "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";

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

let tokenClient = '';
export let accessToken = '';
let pickerInited = false;
let gisInited = false;
let uploadView = null;
let curUploadField = null;
let picker = null;
let gapiInited = false;

function onApiLoad() {
    window.gapi.load('client', initializeGapiClient);
    window.gapi.load('auth');
    window.gapi.load('picker', { callback: onPickerApiLoad });
}

async function initializeGapiClient() {
    await window.gapi.client.init({
        apiKey: DEVELOPER_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}

function onPickerApiLoad() {
    pickerInited = true;
    setAll();
}

function gisLoaded() {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: ['https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.metadata',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.readonly',
            'openid'].join(' ')
    });
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
        let filesList = [];
        for (const d of data[google.picker.Response.DOCUMENTS]) {
            let url = d[google.picker.Document.URL];
            url = "https://drive.google.com/uc?id=" + d.id;
            // await fetchRequest(d.id).then(res => res.arrayBuffer()).then(data => {
                // console.log(data)
                // let sizeOf = require('buffer-image-size');
                // let dimensions = sizeOf(data);
                // console.log(dimensions.width, dimensions.height);
            // })
            let type = getFileType(d.name);
            filesList.push(new Promise((resolve, reject) => {
                if (type === 'image' || type === 'video') {
                    let media = document.createElement("img");
                    media.src = url;
                    media.onload = () => {
                        resolve({
                            filename : d.name,
                            url,
                            type,
                            media_width: media.width,
                            media_height: media.height
                        })
                    }
                    media.remove();
                } else {
                    resolve({
                        filename : d.name,
                        url,
                        type,
                    })
                }
            }));
        }
        Promise.all(filesList).then(files => {
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
        })
    }
}

export function initPicker() {
    if (pickerInited) return;
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