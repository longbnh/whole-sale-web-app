export const urlToObject= async(url: string)=> {
    try {
        const response = await fetch(url, {
            "mode": "no-cors"
        });
        const blob = await response.blob();
        return new File([blob], 'image.jpg', {type: blob.type});
    } catch(error) {
        console.log(error)
    }
}