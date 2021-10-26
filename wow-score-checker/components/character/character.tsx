import React from 'react'

export const renderBestRuns = (character: any) => {
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

export const renderCharacterGear = (gear: any, mainCharData: any) => {

    if (!gear.gear) {
        return <>No gear</>
    }
    var gearlist: any[] = []

    gear.gear.map((item: any) => {
        gearlist.push(item)
    })

    console.log(gearlist);
    

    return (
        <div className="row">
            <div className="col">
                <button type="button" className="btn btn-dark-mode" data-bs-toggle="collapse" data-bs-target="#collapseGear" aria-expanded="false" aria-controls="collapseGear">Show gear</button>
                <div className="collapse" id="collapseGear">
                    {
                        gear.gear.map((item: any) => {
                            return <span style={{ fontSize: '12px', display: 'block' }} className={item.quality.name} key={item.item.id}> {item.slot.name}: {item.name} {item.level.display_string}</span>
                        })
                    }
                    <span>Equipped ilvl: {mainCharData.item_level}</span>
                </div>
            </div>
        </div>
    )
}

export const renderRating = (character: any) => {

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