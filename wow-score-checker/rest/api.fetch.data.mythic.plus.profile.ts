import passport from "passport"
import ApiAuthTokens from "./api.auth.tokens"
import GetAccessToken from "./api.getAccessToken"
import Namespace from "./namespace"
import { BlizzAPI } from "blizzapi"
import { MythicPlusProfile } from "./models/mythic.plus.profile.endpoint.model"

export default class ApiFetchDataMythicPlusProfile {
    private _apiAuthTokens: ApiAuthTokens = new ApiAuthTokens()
    constructor() {}
    //https://eu.api.blizzard.com/profile/wow/character/twisting-nether/lacifyra/mythic-keystone-profile?namespace=profile-eu&locale=en_US&access_token=UShxNGqn1kdJP6aXGYE3qnV0TbIgnvjH2a

    public async getMythicPlusProfile(requestBody: MythicPlusProfile) {
        //console.log(requestBody)
        const api = new BlizzAPI({
            region: requestBody.region,
            clientId: this._apiAuthTokens.clientId,
            clientSecret: this._apiAuthTokens.clientSecret
        })

        const _accessToken = await this.getAccessToken(api)

        
        const data = await api.query(
            '/profile/wow/character/twisting-nether/lacifyra/mythic-keystone-profile?namespace=profile-eu&locale=en_US&access_token=' + _accessToken
            // 'https://' + requestBody.region + this._apiAuthTokens.apiUrl + requestBody.realm + '/' + requestBody.character + '/mythic-keystone-profile/?namespace=profile-' + requestBody.region + '&access_token=' + _accessToken
        )

        // console.log(data)

        return data
    }

    private async getAccessToken(api: BlizzAPI) {
        const accessToken = await api.getAccessToken()

        return accessToken
    }

    private async validateAccessToken(api: BlizzAPI,region: string, token: string) {
        // todo
        return false
    }
}