import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const currentPath = location.pathname.split("/").pop() || "shop";
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const updateCartCount = () => {
            const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            setCartCount(savedCart.length);
        };

        updateCartCount();

        window.addEventListener("cartUpdated", updateCartCount);

        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);
    return (
        <nav>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>

            <div className={`menuAndcard ${showMenu ? 'show' : ''}`}>
                <ul className="nav-menu" id="nav-links">
                    <li>
                        <Link to='/'>Shop</Link>
                        {currentPath === '' || currentPath === 'shop' ? <hr /> : null}
                    </li>
                    <li>
                        <Link to='/mens'>Men</Link>
                        {currentPath === 'mens' ? <hr /> : null}
                    </li>
                    <li>
                        <Link to='/womens'>Women</Link>
                        {currentPath === 'womens' ? <hr /> : null}
                    </li>
                    <li>
                        <Link to='/kids'>Kids</Link>
                        {currentPath === 'kids' ? <hr /> : null}
                    </li>
                </ul>

                <div className="nav-login-cart">
                    <button>Login</button>
                    <Link to='/cart'>
                        <img src={cart_icon} alt="" />
                    </Link>
                    <div className="nav-card-count">{cartCount}</div>
                </div>
            </div>

            <button id="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
                <i className="fa-solid fa-bars"></i>
            </button>
        </nav>
    )
}
