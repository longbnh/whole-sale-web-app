export function cleanParams(obj: Object) {
    return Object.fromEntries(Object.entries(obj)
        .filter(([name, value]) => (value !== null) && (value != "")));
}