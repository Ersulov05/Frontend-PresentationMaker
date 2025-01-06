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

export {
    getBase64ByURL,
    getBase64ByFile,
}