export function resizeImage(imagePath, size) {
    if (!imagePath) {
        return undefined;
    }
    const resizedImage = imagePath.match(/media\/screenshots/)
        ? imagePath.replace("media/screenshots", `media/resize/${size}/-/screenshots`)
        : imagePath.replace("media/games/", `media/resize/${size}/-/games/`)
    return resizedImage;
}