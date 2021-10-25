import { BlizzAPI } from "blizzapi";
import ApiAuthTokens from "./api.auth.tokens";

export default class ApiFetchListOfRealms {

    private _apiAuthTokens: ApiAuthTokens = new ApiAuthTokens()

    constructor() {}

    public async getRealms(region: string) {
        const api = new BlizzAPI({
            region: region,
            clientId: this._apiAuthTokens.clientId,
            clientSecret: this._apiAuthTokens.clientSecret
        })

        const _accesstoken = await this.getAccessToken(api)

        const data = api.query(
            '/data/wow/realm/index?namespace=dynamic-' + region + '&locale=en_US&access_token=' + _accesstoken
        )

        return data
        
    }


    private async getAccessToken(api: BlizzAPI) {
        const accessToken = await api.getAccessToken()

        return accessToken
    }

}