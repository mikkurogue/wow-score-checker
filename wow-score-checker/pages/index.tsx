import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
    const router = useRouter()

    const handleNavigation = (_character: any, _region: any, _realm: any) => {
        if (_character === '') {
            console.log('Character not filled in...')
            return
        }

        if (_region === '') {
            console.log('Region not filled in...')
            return
        }

        if (_realm === '') {
            console.log('realm not filled in...')
            return
        }

        console.log(_character)

        //router.push(`/character/${_region}/${_realm}/${_character}`)
    }

    const handleSetFavourite = () => {

    }

    return (
        <div className="container">
            <div className="row mb-5 mt-5">
                <div className="col">
                    <Link href="/character/eu/twisting-nether/skenk">
                        <a>TEST DATA HERE GO TO THIS LINK SEARCH DOES NOT WORK</a>
                    </Link>
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col center-items">
                    <div className="search-wrapper">
                        <div className="row g-3">
                            <div className="col-auto">
                                <input type="text" className="form-control form-control-lg" placeholder="Search character" />
                            </div>
                            <div className="col-auto">
                                <select name="select-region" id="region" className="form-select form-select-lg">
                                    <option selected defaultValue={''}>Choose Region</option>
                                    <option value="eu">EU</option>
                                    <option value="us">US</option>
                                    <option value="kr">KR</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                {/* TODO: pull list of all realms, populate the list *depending* on the region chosen */}
                                <select name="select-realm" id="realm" className="form-select form-select-lg">
                                    <option selected>Choose Realm</option>
                                    <option value="ravencrest">Ravencrest</option>
                                    <option value="twisting-nether">Twisting Neter</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-dark-mode btn-lg">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col center-items">
                    Recent Searches
                </div>
                <div className="col center-items">
                    Favourites
                </div>
            </div>
        </div>
    )
}

export default Home
