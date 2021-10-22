export function isSSR(): boolean {
    if (typeof window === 'undefined') {
        return true
    }

    return false
}