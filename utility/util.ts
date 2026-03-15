export const getFirstName = (fullName?: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/);
    return parts[0] || "";
};


export const formatPrice = (value: number | string): string => {
    const num = Number(value);
    if (isNaN(num)) return "0.00";
    return num.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}