export function getFileType(fileName) {
    let ext = fileName.split('.').slice(-1)[0];
    let type = '';
    if (['png', 'jpg', 'webp'].includes(ext)){
        type = 'img';
    }
    else if (['mp4', 'webm', 'avi'].includes(ext)) {
        type = 'video';
    }
    else {
        type = 'file';
    }
    return type;
}