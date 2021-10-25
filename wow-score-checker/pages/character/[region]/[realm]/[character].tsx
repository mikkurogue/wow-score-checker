import { useRouter } from 'next/dist/client/router'
import React from 'react'
import ApiFetchDataMythicPlusProfile from '../../../../rest/api.fetch.data.mythic.plus.profile'
import { MythicPlusProfile } from '../../../../rest/models/mythic.plus.profile.endpoint.model'
import { isSSR } from '../../../../Helpers/utils'
import CharacterModel, { BestRuns } from './character'

function Character(props: any) {

    const router = useRouter()
    const [character, setCharacter] = React.useState({} as CharacterModel)

    React.useEffect(() => {
        const clearState = () => {
            console.log('clearing state')
            setCharacter({} as CharacterModel)
        }

        clearState()

        if (!router.isReady) return;

        if (isSSR()) return;

        const data: MythicPlusProfile = {
            character: router.query['character'] as string,
            namespace: 'eu',
            realm: router.query.realm as string,
            region: router.query.region as string,
            seasonId: 6
        }

        console.log(data)

        const api = new ApiFetchDataMythicPlusProfile()
        const x = api.getMythicPlusProfile(data)

        x.then((d) => {
            setCharacter({
                name: d.character.name,
                id: d.character.id,
                realm: d.character.realm.name,
                mythicPlusRating: {
                    currentRating: d.current_mythic_rating.rating,
                    color: {
                        alpha: d.current_mythic_rating.color.a,
                        red: d.current_mythic_rating.color.r,
                        green: d.current_mythic_rating.color.g,
                        blue: d.current_mythic_rating.color.b
                    }
                },
                bestRuns: d.current_period.best_runs

            })
        })

    }, [router.isReady])

    if (JSON.stringify(character) === '{}') {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const renderBestRuns = () => {
        if (!character.bestRuns) {
            return (
                <>
                    No weekly runs found
                </>
            )
        }
        return (<div className="row mt-3">
            <h3>
                Best runs this week
            </h3>
            {
                character.bestRuns.map((run: any, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className="col">
                                <span>Keystone level: {run.keystone_level} </span>
                                <div className="affixes-wrapper">
                                    <span className="affixes-title">Affixes</span>
                                    {
                                        run.keystone_affixes.map((affix: any, ai: number) => {
                                            return (
                                                <span className="char-span" key={ai}> {affix.name}  &nbsp;</span>
                                            )
                                        })
                                    }
                                </div>
                                <div className="members-wrapper mt-3">
                                    <span className="members-title">Members</span>
                                    {
                                        run.members.map((member: any, ci: number) => {
                                            return (
                                                <span className="char-span" key={ci}>
                                                    {member.character.name} &nbsp;
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div>)
    }


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <div className="basic-char-details-wrapper">
                        <span className="char-name">{character.name}</span>
                        <span className="current-rating"
                            style={{ color: `rgba(${character.mythicPlusRating.color.red}, ${character.mythicPlusRating.color.green}, ${character.mythicPlusRating.color.blue}, ${character.mythicPlusRating.color.alpha})` }}>
                            Current rating: {character.mythicPlusRating.currentRating}
                        </span>
                    </div>
                </div>
            </div>

            {renderBestRuns()}
        </div>
    )
}


export default Character

