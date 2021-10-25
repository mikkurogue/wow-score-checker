import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import LocalStorageHelper from '../Helpers/localstorage'
import ApiFetchListOfRealms from '../rest/api.fetch.list.of.realms'

const Home: NextPage = () => {
    const router = useRouter()

    const nameRef: any = React.createRef()
    const regionRef: any = React.createRef()
    const realmRef: any = React.createRef()

    var mainRealms: any

    const [recent, setRecent] = React.useState({} as any)

    var recentsObj: any = {
        items: []
    }

    const [realms, setRealms] = React.useState()

    React.useEffect(() => {
        const localStorageHelper = new LocalStorageHelper()

        if (localStorageHelper.getItemFromLocalStorage('recents')) {
            const recentsFromStorage = JSON.parse(localStorageHelper.getItemFromLocalStorage('recents'))
            recentsObj.items.push(recentsFromStorage.items)
        } else {
            console.log('no recents')
        }

        console.log(realms)

    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const name = nameRef.current.value
        const region = regionRef.current.value
        const realm = realmRef.current.value

        const charUri = '/character/' + region + '/' + realm + '/' + name

        const ls = new LocalStorageHelper()

        recentsObj.items.push(charUri)

        ls.saveItemToLocalStorage('recents', JSON.stringify(recentsObj))
        setRecent(recentsObj)
        router.push(charUri)
    }

    const handleSetFavourite = () => {

    }

    const renderRecents = () => {

        if (!recent) {
            return (
                <>No recent searches</>
            )
        }
        return (
            <>
                {
                    recentsObj.items.map((item: any) => {
                        <span>{item}</span>
                    })
                }
            </>
        )
    }

    const handleChangeRegion = (e: any) => {

        //https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-uslocale=en_US&access_token=USdP0Yt3giAIkcPM8nyOmWAoGEdxdmZGXj
        e.preventDefault()
        console.log('changing realms...')

        const api = new ApiFetchListOfRealms()
        const x = api.getRealms(e.target.value)

        x.then((realms) => {
            setRealms(realms)
        })

        console.log(realms)
    }

    const renderRealms = (realms: any) => {

        if (realms === 'undefined' || realms === undefined) {
            return
        }

        return (
            <>
                <select ref={realmRef} name="select-realm" id="realm" className="form-select form-select-lg">
                    <option>Choose Realm</option>
                    {
                        realms.realms.map((realm: any, index: number) => {
                            return (
                                <option key={index} value={realm.slug}>{realm.name}</option>
                            )
                        })
                    }
                </select>
            </>
        )
    }

    return (
        <div className="container">
            <form className="row mt-5 mb-5" onSubmit={() => handleSubmit(event)}>
                <div className="col center-items">
                    <div className="search-wrapper">
                        <div className="row g-3">
                            <div className="col-auto">
                                <input ref={nameRef} type="text" className="form-control form-control-lg" placeholder="Search character" />
                            </div>
                            <div className="col-auto">
                                <select onChange={() => handleChangeRegion(event)} ref={regionRef} name="select-region" id="region" className="form-select form-select-lg">
                                    <option value={''}>Choose Region</option>
                                    <option value="eu">EU</option>
                                    <option value="us">US</option>
                                    <option value="kr">KR</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                {/* TODO: pull list of all realms, populate the list *depending* on the region chosen */}
                                {realms === 'undefined' ? 'no' : renderRealms(realms)}
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-dark-mode btn-lg">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="row">
                <div className="col center-items">
                    {renderRecents()}
                </div>
                <div className="col center-items">
                    Favourites
                </div>
            </div>
        </div>
    )
}

export default Home
