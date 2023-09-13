import sendRequest from "./requests";
import {baseURL} from "store/reducers/location";
import {getFileType} from "../utils/files";

const clientId = '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com';
const developerKey = 'AIzaSyDDqSATTGIXHgBRwl_S4mPCcATYJsISOhM';


let accessToken = '';
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
    picker.setVisible(true);
}

async function setAll() {
    if (accessToken === '') {
        const response = await sendRequest(baseURL + '/get_gdrive_token/', {});
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

        // if (uploadField != null) curUploadField = uploadField.parentNode.querySelector(".modal__file-text");
    // for (const fileUploadBtn of document.querySelectorAll(".modal__file-button")) {
    //     fileUploadBtn.onmousedown = function(){showPicker(fileUploadBtn)};
    // }
}

async function pickerCallback(data) {
    const google = window.google;
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        let filesList = [];
        for (const d of data[google.picker.Response.DOCUMENTS]) {
            let url = d[google.picker.Document.URL];
            url = "https://drive.google.com/uc?id=" + url.split('/').slice(-2, -1);
            filesList.push({name : d.name, url : url, type : getFileType(d.name)});
            if (curUploadField == null && data[google.picker.Response.VIEW][0] !== 'upload') {
                let send_data = {
                    'entry_action_type' : 'add',
                    'from' : 'drive_select',
                    'file_media' : [{'type':'img', 'title':'','description':'','url':url, 'width':1, 'height':1}]
                }
                // await updatePage(send_data);
            }
        }
        // if (curUploadField != null) {
        //     if (filesList.length) curUploadField.innerHTML = setUploadedFiles(getUploadType(curUploadField), filesList);
        //     else curUploadField.innerHTML = "No media chosen";
        //     curUploadField.parentNode.querySelector("input").value = JSON.stringify(filesList);
        // }
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
