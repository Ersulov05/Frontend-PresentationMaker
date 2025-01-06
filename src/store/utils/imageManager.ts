async function getBase64ByURL(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const blob = await response.blob()
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string)
        };
        reader.onerror = () => {
            reject(new Error('Failed to convert to Base64'))
        };
        reader.readAsDataURL(blob)
    });
}

const getBase64ByFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    });
};


function isValidBase64Data(data: string, formats: Base64FormatType[]): boolean {
    return formats.some(format => data.startsWith(format))
}

export enum Base64FormatType {
    TEXT_HTML = "data:text/html;base64",
    IMAGE_PNG = "data:image/png;base64",
    IMAGE_JPEG = "data:image/jpeg;base64",
    IMAGE_GIF = "data:image/gif;base64",
    IMAGE_SVG = "data:image/svg+xml;base64",
    APPLICATION_JSON = "data:application/json;base64",
    APPLICATION_XML = "data:application/xml;base64",
    TEXT_PLAIN = "data:text/plain;base64",
    TEXT_CSS = "data:text/css;base64",
    TEXT_CSV = "data:text/csv;base64",
    AUDIO_MPEG = "data:audio/mpeg;base64",
    AUDIO_WAV = "data:audio/wav;base64",
    VIDEO_MP4 = "data:video/mp4;base64",
    VIDEO_WEBM = "data:video/webm;base64",
    APPLICATION_OCTET_STREAM = "data:application/octet-stream;base64", // Для бинарных данных
}

export {
    getBase64ByURL,
    getBase64ByFile,
    isValidBase64Data,
}