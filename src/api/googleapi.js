// const {google} = require('googleapis');
//
// const clientId = '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com';
//
// export function initClient() {
//     gapi.client.init({
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
//         clientId: clientId,
//         scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
//     }).then(function () {
//         console.log('it worked');
//         gapi.client.drive.files.get({
//             fileId: '1s5c_vwxbA6eiV7YQ30ePgjHqlAukyZkb',
//             alt: "3d",
//         }).then(res => {
//             console.log(res);
//         })
//     });
// }