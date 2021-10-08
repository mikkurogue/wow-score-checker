/**
 * A helper class for all things LocalStorage
 */
 export default class LocalStorageHelper {
    constructor() { }

    /**
     * Return an item from the localStorage based on key
     * @param key @type string 
     * @returns 
     */
    public getItemFromLocalStorage(key: string): any {
        return localStorage.getItem(key) || null
    }

    /**
     * Save an item to localstorage with a key value pair
     * @param key @type string
     * @param value @type any
     */
    public saveItemToLocalStorage(key: string, value: any): void {
        localStorage.setItem(key, value)
    }

    /**
     * Clear the key from localstorage
     * @param key @type string
     */
    public clearItemFromLocalStorage(key: string): void {
        localStorage.removeItem(key)
    }
    
    /**
     * Clear all items in localstorage
     */
    public clearAllItemsFromLocalStorage() {
        localStorage.clear()
    }

}