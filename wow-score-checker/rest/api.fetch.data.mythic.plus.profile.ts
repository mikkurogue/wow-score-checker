import passport from "passport"
import ApiAuthTokens from "./api.auth.tokens"
import GetAccessToken from "./api.getAccessToken"
import Namespace from "./namespace"

export default class ApiFetchDataMythicPlusProfile {
    private _apiAuthTokens: ApiAuthTokens = new ApiAuthTokens()
    private authenticateRequests = new GetAccessToken()

    private _region: string | undefined | string[]
    private _realmSlug: string | undefined | string[]
    private _characterName: string | undefined | string[]
    private _seasonId: number
    private _namespace: string

    constructor(
        region: string | undefined | string[], realmSlug: string | undefined | string[], characterName: string | undefined | string[], seasonId: number, namespace: string
    ) {
        this._region = region
        this._realmSlug = realmSlug
        this._characterName = characterName
        this._seasonId = seasonId
        this._namespace = namespace
    }

    public auth() {
        this.authenticateRequests
        passport.authenticate('bnet')
    }

    public async getCharacterProfileIndex() {
        const response = await fetch(`https://${this._region}${this._apiAuthTokens.apiUrl}${this._realmSlug}/${this._characterName}
            /mythic-keystone-profile/season/${this._seasonId}?namespace=${this._namespace}
            &locale=en_US&access_token=USHMO9UCmxpzA8AXBmrv5r0Ns6JIvbdOlM`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
            })
        return response.json()
    }

    //getCharacterProfileIndex().then(data => console.log(data))

    
}