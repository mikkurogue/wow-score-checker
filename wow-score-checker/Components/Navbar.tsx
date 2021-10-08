import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="navbar nav-dark">
            <Link href="/">
                <a className="navbar-brand">Score Checker</a>
            </Link>
        </nav>
    )
}

export default Navbar
