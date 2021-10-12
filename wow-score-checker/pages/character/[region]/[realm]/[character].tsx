import { useRouter } from 'next/dist/client/router'
import React from 'react'
import ApiFetchDataMythicPlusProfile from '../../../../rest/api.fetch.data.mythic.plus.profile'
import { MythicPlusProfile } from '../../../../rest/models/mythic.plus.profile.endpoint.model'
import Namespace from '../../../../rest/namespace'

function Character(props: any) {

    const router = useRouter()

  
    
    React.useEffect(() => {
        if (!router.isReady) return;

        const data: MythicPlusProfile = {
            character: router.query['character'] as string,
            namespace: 'eu',
            realm: router.query.realm as string,
            region: router.query.region as string,
            seasonId: 6
        }
    
        // const apiActions = new ApiFetchDataMythicPlusProfile(slug.region, slug.realm, slug.character, 6, namespace)
    
        // apiActions.auth()
        // apiActions.getCharacterProfileIndex()

        const api = new ApiFetchDataMythicPlusProfile()

        

        api.getMythicPlusProfile(data)

    }, [router.isReady])

    return (
        <div>
            <h1>Helloooo</h1>
        </div>
    )
}


export default Character
