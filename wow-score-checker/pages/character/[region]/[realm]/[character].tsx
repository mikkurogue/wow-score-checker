import { useRouter } from 'next/dist/client/router'
import React from 'react'
import ApiFetchDataMythicPlusProfile from '../../../../rest/api.fetch.data.mythic.plus.profile'
import Namespace from '../../../../rest/namespace'

function Character(props: any) {

    const router = useRouter()

    const slug = {
        region: router.query.region,
        realm: router.query.realm,
        character: router.query.character
    }

    const namespace = slug.region === 'eu' ? 'profile-eu' : 'profile-us'

    const apiActions = new ApiFetchDataMythicPlusProfile(slug.region, slug.realm, slug.character, 6, namespace)

    apiActions.auth()

    return (
        <div>
            <h1>Helloooo</h1>
        </div>
    )
}


export default Character
