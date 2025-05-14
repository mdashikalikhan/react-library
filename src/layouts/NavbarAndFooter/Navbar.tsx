import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3' >
            <div className='container-fluid'>
                <span className='navbar-brand'>AlgoStrive Solutions Limited</span>
                <button className='navbar-toogler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navDropDown'
                    aria-controls='navDropDown' aria-expanded='false'
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navDropDown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link'  to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <a href='#' type='button'
                                className='btn btn-outline-light'>Sign in</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}