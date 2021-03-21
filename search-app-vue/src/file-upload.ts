import store from "./store";

 export const fileUpload = async (file: string, filename: string, fieldName: string, url: string, method = 'post') => {
    const blob = await fetch(file).then(res => res.blob());
    const formData = new FormData();
    formData.append(fieldName, blob, filename);
    return await fetch(url, {
        method: method,
        body: formData,
        headers: {
            Authorization: 'Bearer ' + store.state.token,
        },
    });
};


export const fileData = async (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
            if (e.target && e.target.result) {
                const fr: FileReader = e.target;
                resolve(fr.result!);
            }
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};