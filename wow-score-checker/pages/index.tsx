import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col center-items">
                    <div className="search-wrapper">
                        <form className="row g-3">
                            <div className="col-auto">
                                <input type="text" className="form-control form-control-lg" placeholder="Search character" />
                            </div>
                            <div className="col-auto">
                                <select name="select-region" id="region" className="form-select form-select-lg">
                                    <option selected>Choose Region</option>
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
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-dark-mode btn-lg">
                                    Go
                                </button>
                            </div>
                        </form>
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
