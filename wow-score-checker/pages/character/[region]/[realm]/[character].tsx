import { useRouter } from 'next/dist/client/router'
import React from 'react'
import ApiFetchDataMythicPlusProfile from '../../../../rest/api.fetch.data.mythic.plus.profile'
import { MythicPlusProfile } from '../../../../rest/models/mythic.plus.profile.endpoint.model'
import Namespace from '../../../../rest/namespace'
import {isSSR} from '../../../../Helpers/utils'

function Character(props: any) {

    const router = useRouter()
    const [character, setCharacter] = React.useState({} as any)

    React.useEffect(() => {
        if (!router.isReady) return;

        if (isSSR()) return;

        const data: MythicPlusProfile = {
            character: router.query['character'] as string,
            namespace: 'eu',
            realm: router.query.realm as string,
            region: router.query.region as string,
            seasonId: 6
        }

        const api = new ApiFetchDataMythicPlusProfile()
        const x = api.getMythicPlusProfile(data)

        x.then((d) => {
            setCharacter({
                name: d.character.name,
                id: d.character.id,
                realm: d.character.realm.name,
                mythic_plus_rating: {
                    current: d.current_mythic_rating.rating,
                    color: d.current_mythic_rating.color
                }
            })
        })

    }, [router.isReady])


    console.log(character)

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="basic-char-details-wrapper">
                        <span className="char-name">{character.name}</span>
                        <span className="current-rating" style={{ color: `rgba(255,255,255,1)` }}>
                            {character.mythic_plus_rating.current}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Character

