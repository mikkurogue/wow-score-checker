import ApiAuthTokens from "./api.auth.tokens";
const bnetStrategy = require('passport-bnet').Strategy
import passport from "passport";

export default class GetAccessToken {

    private apiAuthTokens = new ApiAuthTokens()

    constructor() {
        passport.use(new bnetStrategy({
            clientID: this.apiAuthTokens.clientId,
            clientSecret: this.apiAuthTokens.clientSecret,
            callbackURL: 'https://localhost:3006/oauth/battlenet/callback',
            region: 'eu' //for now its eu, make this dynamic
        }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
            console.log(accessToken)
            return done(null, profile)
        }))
    }
}