
export const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short", // Adds timezone info
    });
};

