export function areSameStrings(...strings: string[]): boolean {
    const [sample] = strings;
    return strings.every(
        (string) => string.toLowerCase() === sample.toLowerCase(),
    );
}

export function isArrayEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}
