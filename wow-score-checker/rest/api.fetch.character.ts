import { BlizzAPI } from "blizzapi";
import ApiAuthTokens from "./api.auth.tokens";

export default class ApiFetchCharacter {

    private _apiAuthTokens: ApiAuthTokens = new ApiAuthTokens()
    private region: string
    private realm: string
    private name: string
    constructor(region: string, name: string, realm: string) {
        this.region = region
        this.name = name
        this.realm = realm
    }

    public async getCharacterAppearace() {
        const api = new BlizzAPI({
            region: this.region,
            clientId: this._apiAuthTokens.clientId,
            clientSecret: this._apiAuthTokens.clientSecret
        })

        const _accessToken = await this.getAccessToken(api)

        
        const data = await api.query(
            '/profile/wow/character/' + this.realm + '/' + this.name + '?namespace=profile-' + this.region + '&locale=en_US&access_token=' + _accessToken
        )

        return data
    }

    private async getAccessToken(api: BlizzAPI) {
        const accessToken = await api.getAccessToken()

        return accessToken
    }
}