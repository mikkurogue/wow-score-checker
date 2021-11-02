import { useRouter } from 'next/dist/client/router'
import React from 'react'
import ApiFetchDataMythicPlusProfile from '../../../../rest/api.fetch.data.mythic.plus.profile'
import { MythicPlusProfile } from '../../../../rest/models/mythic.plus.profile.endpoint.model'
import { isSSR } from '../../../../Helpers/utils'
import ApiGetCharAppreance from '../../../../rest/api.get.char.appearace'
import ApiGetCharGear from '../../../../rest/api.get.char.gear'
import ApiFetchCharacter from '../../../../rest/api.fetch.character'
import type { NextPage } from 'next'
import ApiFetchCharacterRaids from '../../../../rest/api.fetch.character.raids'
import { find } from 'lodash'

const Character = () => {
    const router = useRouter()
    const [character, setCharacter] = React.useState({} as any)
    const [profile, setProfile] = React.useState({} as any)
    const [gear, setGear] = React.useState({} as any)
    const [mainCharData, setMainCharData] = React.useState({} as any)
    const [raidProgress, setRaidProgress] = React.useState({} as any)

    React.useEffect(() => {

        const clearState = () => {
            console.log('clearing state')
            setCharacter({} as any)
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

        const mythicPlusApi = new ApiFetchDataMythicPlusProfile()
        const mythicPlusProfile = mythicPlusApi.getMythicPlusProfile(data)

        const characterAppeareanceApi = new ApiGetCharAppreance(data.region, data.character, data.realm)
        const characterAppereace = characterAppeareanceApi.getCharacterAppearace()

        const characterGearApi = new ApiGetCharGear(data.region, data.character, data.realm)
        const characterGear = characterGearApi.getCharacterAppearace()

        const fetchCharApi = new ApiFetchCharacter(data.region, data.character, data.realm)
        const fetchChar = fetchCharApi.getCharacterAppearace()

        const fetchRaidApi = new ApiFetchCharacterRaids(data.region, data.character, data.realm)
        const fetchRaid = fetchRaidApi.getCharacterRaids()

        fetchRaid.then((d) => {
            setRaidProgress({
                expansions: d.expansions
            })
        })

        console.log(raidProgress.expansions)

        fetchChar.then((d) => {
            setMainCharData({
                level: d.level,
                item_level: d.equipped_item_level,
                guild: d.guild.name
            })
        })

        characterGear.then((d) => {
            setGear({
                gear: d.equipped_items
            })
        })

        characterAppereace.then((d) => {
            setProfile({
                race: d.playable_race.name,
                class: d.playable_class.name,
                active_spec: d.playable_class.active_spec,
                faction: d.faction.name,
            })
        })

        mythicPlusProfile.then((d) => {

            if (d.current_mythic_rating) {
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
            }

            if (!d.current_mythic_rating) {
                setCharacter({
                    name: d.character.name,
                    id: d.character.id,
                    realm: d.character.realm.name,
                })
            }


        })

    }, [router.isReady])

    if (JSON.stringify(character) === '{}' || JSON.stringify(profile) === '{}' || JSON.stringify(gear) === '{}') {
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
                character.bestRuns.map((run: any, i: number) => {
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

    const renderRating = () => {

        if (!character.mythicPlusRating) {
            return (
                <span className="current-rating">
                    No rating
                </span>
            )
        }

        return (
            <span className="current-rating"
                style={{ color: `rgba(${character.mythicPlusRating.color.red}, ${character.mythicPlusRating.color.green}, ${character.mythicPlusRating.color.blue}, ${character.mythicPlusRating.color.alpha})` }}>
                Current rating: {character.mythicPlusRating.currentRating}
            </span>
        )
    }

    const RenderCharacterGear = () => {

        var item: any

        if (!gear.gear) {
            return <>No gear</>
        }
        var gearlist: any[] = []

        gear.gear.map((item: any) => {
            gearlist.push(item)
        })

        const handleShowItem = (_item: any) => {
            item = _item
        }

        const renderItem = (item: any) => {
            if (item && item !== 'undefined') {
                return (
                    <span>
                        {item.name}
                    </span>
                )
            } else {
                return (
                    <span>no item</span>
                )
            }

        }

        return (
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-dark-mode" data-bs-toggle="collapse" data-bs-target="#collapseGear" aria-expanded="false" aria-controls="collapseGear">Show gear</button>
                    <div className="collapse" id="collapseGear">
                        {
                            gear.gear.map((item: any) => {
                                return <span onClick={() => handleShowItem(item)} style={{ fontSize: '12px', display: 'block' }} className={item.quality.name} key={item.item.id}> {item.slot.name}: {item.name} {item.level.display_string}</span>
                            })
                        }
                        <span>Equipped ilvl: {mainCharData.item_level}</span>
                    </div>
                    {/* <div>
                        <span>
                            {renderItem(item)}
                        </span>
                    </div> */}
                </div>
            </div>
        )
    }

    const renderCharacterRaidProgress = () => {

        const currentRaidTierProgress = find(raidProgress.expansions, (predicate) => {
            return predicate.expansion.name === "Shadowlands"
        })

        if (currentRaidTierProgress === undefined || currentRaidTierProgress === 'undefined') return <>Loading raids</>

        console.log(currentRaidTierProgress)
        return currentRaidTierProgress.instances.map((raid: any, i: number) => {
            return (
                <div className="col" key={i}>
                    <div className="row">
                        <div className="col">
                            <span className="instance-title">{raid.instance.name}</span>
                            <ol className="list-group nav-dark">
                                {
                                    raid.modes.map((cleared: any) => {
                                        return (
                                            <div className="dropdown" key={cleared.difficulty.type}>
                                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{cleared.difficulty.name}</div>
                                                        <span className="progress">{cleared.progress.completed_count} / {cleared.progress.total_count}</span>
                                                        <span className="in-progress-or-clear">{cleared.status.name}</span>
                                                        <button id="dropdownMenuRaid" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-secondary dropdown-toggle">
                                                            Completed encounters
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuRaid">
                                                            {
                                                                cleared.progress.encounters.map((progress: any, index: number) => {
                                                                    return (
                                                                        <li key={index} className="dropdown-item">
                                                                            {progress.encounter.name}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            )
        })

        // return raidProgress.expansions.map((raid: any, i: number) => {
        //     return (
        //         <div className="col" key={i}>
        //             <div className="row">
        //                 <div className="col">
        //                     <span className="expansion-name">{raid.expansion.name}</span>
        //                 </div>
        //             </div>
        //             {/* <div className="row">
        //                 <div className="col">
        //                     <button type="button" className="btn btn-dark-mode" data-bs-toggle="collapse" data-bs-target={''.concat('#', raid.expansion.id)} aria-expanded="false" aria-controls={raid.expansion.name}>Raids</button>
        //                     <div className="collapse" id={raid.expansion.id.toString()}>
        //                         {
        //                             raid.instances.map((instance: any, index: number) => {
        //                                 return <span key={index}>{instance.name}</span>
        //                             })
        //                         }
        //                     </div>
        //                 </div>
        //             </div> */}
        //         </div>
        //     )
        // })
    }



    return (
        <>
            <title>{character.name}</title>

            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <div className="basic-char-details-wrapper">
                            <span className="char-name">{character.name}</span>
                            <span className={profile.faction}> {profile.faction} </span> <span> {profile.race}</span> <span className={profile.class}> Level {mainCharData.level} {profile.active_spec} {profile.class}</span>
                            <span> 	&#60;{mainCharData.guild}&#62; </span>
                            {renderRating()}
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        {RenderCharacterGear()}
                    </div>
                    <div className="col">
                        {renderBestRuns()}
                    </div>
                </div>

                <div className="row mt-5">
                    {renderCharacterRaidProgress()}
                </div>
            </div>
        </>
    )
}

export default Character

