// get dynamic placeholder image based resized width and height
export function updateImageUrl(url, newWidth, newHeight) {
    return url.replace(/w=\d+/, `w=${newWidth}`).replace(/h=\d+/, `h=${newHeight}`);
}