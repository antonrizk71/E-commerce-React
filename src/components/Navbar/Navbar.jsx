import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [menu, setMenu] = useState("shop");
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>

            <div className={`menuAndcard ${showMenu ? 'show' : ''}`}>
                <ul className="nav-menu" id="nav-links">
                    <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === 'shop' && <hr />}</li>
                    <li onClick={() => setMenu("men")}><Link to='/mens'>Men</Link>{menu === 'men' && <hr />}</li>
                    <li onClick={() => setMenu("women")}><Link to='/womens'>Women</Link>{menu === 'women' && <hr />}</li>
                    <li onClick={() => setMenu("kids")}><Link to='/kids'>Kids</Link>{menu === 'kids' && <hr />}</li>
                </ul>

                <div className="nav-login-cart">
                    <button>Login</button>
                    <Link to='/cart'>
                        <img src={cart_icon} alt="" onClick={() => setMenu("cart")} />
                    </Link>
                    <div className="nav-card-count">0</div>
                </div>
            </div>

            <button id="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
                <i className="fa-solid fa-bars"></i>
            </button>
        </nav>
    )
}
