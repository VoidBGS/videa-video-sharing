export const cropIfExceed = (text, allowedLength) => {
    if (typeof (text) === "string") {
        if (text.length > allowedLength) {
            text = text.substring(0, allowedLength).trim() + "...";
        }
    }
    return text;
}