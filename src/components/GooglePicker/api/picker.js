import {getFileType} from "../helpers/files";
import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

const developerKey = 'AIzaSyDDqSATTGIXHgBRwl_S4mPCcATYJsISOhM';
const clientId = '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

let tokenClient = '';
let accessToken = '';
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
        apiKey: developerKey,
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
        client_id: clientId,
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
        .setDeveloperKey(developerKey)
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
            url = "https://drive.google.com/uc?id=" + url.split('/').slice(-2, -1);
            filesList.push({name : d.name, url : url, type : getFileType(d.name)});
        }
        if (curUploadField == null && data[google.picker.Response.VIEW][0] !== 'upload') {
            let send_data = {
                'event_type': 'ADD',
                'entry_action_type' : 'add',
                'from' : 'drive_select',
                'file_media' : filesList.map(file => {
                    return {
                        type:'img',
                        title:"",
                        description:"",
                        url:file.url,
                        width:1,
                        height:1
                    }
                })
            }
            triggerEvent("action-callback", send_data);
        }
        if (curUploadField != null) {
            if (filesList.length) curUploadField(filesList);
        }
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

export async function listFiles() {
    setTimeout(async () => {
        if (!(gisInited && gapiInited)) return;
        if (window.gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            tokenClient.requestAccessToken({prompt: ''});
        }
        setTimeout(async () => {
            let response = null;
            await window.gapi.client.drive.files.get({
                fileId: "1s5c_vwxbA6eiV7YQ30ePgjHqlAukyZkb",
                alt: 'media',
            }).then(res => {
                console.log(res)
                response = res.body.arrayBuffer();
            });
            return response;
        }, 1000)

    }, 2000)

}