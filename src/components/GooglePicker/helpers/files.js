export function getFileType(fileName) {
    let ext = fileName.split('.').slice(-1)[0];
    let type = '';
    if (['png', 'jpg', 'webp'].includes(ext)){
        type = 'image';
    }
    else if (['mp4', 'webm', 'avi'].includes(ext)) {
        type = 'video';
    }
    else if (['stl', 'obj', 'model', 'glb'].includes(ext)) {
        type = 'model';
    }
    else {
        type = 'file';
    }
    return type;
}