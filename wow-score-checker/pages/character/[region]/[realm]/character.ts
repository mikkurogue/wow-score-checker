export default class CharacterModel {

    public name: string
    public id: number
    public realm: string
    public mythicPlusRating?: MythicPlusRating

    public bestRuns?: []

}

export class MythicPlusRating {
    public currentRating: number
    public color: RatingColor
}

class RatingColor {
    public red: number
    public green: number
    public blue: number
    public alpha: number
}

export class BestRuns {

    public keystoneLevel: number
    public keystoneAffixes: Affixes
    public keystoneMembers: KeystoneMembers[]
}

export class Affixes {
    public name: string
    public id: number
}

export class KeystoneMembers {
    public character: KeystoneCharacter
}

class KeystoneCharacter {
    public name: string
    public id: number
    public spec: string
    public equippedItemLevel: number
}