import passport from "passport"
import ApiAuthTokens from "./api.auth.tokens"
import GetAccessToken from "./api.getAccessToken"
import Namespace from "./namespace"
import { BlizzAPI } from "blizzapi"
import { MythicPlusProfile } from "./models/mythic.plus.profile.endpoint.model"

export default class ApiFetchDataMythicPlusProfile {
    private _apiAuthTokens: ApiAuthTokens = new ApiAuthTokens()
    constructor() {}
    //https://eu.api.blizzard.com/profile/wow/character/twistingnether/lacifyra/mythic-keystone-profile?namespace=profile-eu&locale=en_US&access_token=UShxNGqn1kdJP6aXGYE3qnV0TbIgnvjH2a

    public async getMythicPlusProfile(requestBody: MythicPlusProfile) {
        //console.log(requestBody)
        const api = new BlizzAPI({
            region: requestBody.region,
            clientId: this._apiAuthTokens.clientId,
            clientSecret: this._apiAuthTokens.clientSecret
        })

        
        const data = await api.query(
            //`https://${this.region}${this._apiAuthTokens.apiUrl}${this._realmSlug}/${this._characterName}/mythic-keystone-profile/season/${this._seasonId}?namespace=${this._namespace}&locale=en_US&access_token=USHMO9UCmxpzA8AXBmrv5r0Ns6JIvbdOlM`
            'https://' + requestBody.realm + this._apiAuthTokens.apiUrl + requestBody.realm + '/' + requestBody.character + '/mythic-keystone-profile/season/' + requestBody.seasonId + '?namespace=profile-' + requestBody.region
        )

        console.log(data)
    }
}