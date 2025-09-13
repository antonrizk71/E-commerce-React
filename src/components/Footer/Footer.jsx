import logo from '../Assets/logo.png'
export default function Footer() {

    return (
        <footer className=" text-center py-4 mt-5 ">
            <div className="mx-auto border-top border-3  border-dark-subtle w-75 mb-2"></div>
            <div className="container">
                {/* Logo + Website Name */}
                <div className="mb-3">
                    <img
                        src={logo}
                        alt="Logo"
                        // width="40"
                        className="me-2"
                    />
                    <span className="fs-5 fw-bold">SHOPPER</span>
                </div>

                {/* Social Icons */}
                <div className="mb-3">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className=" mx-2"
                    >
                        <i className="fa-brands fa-facebook fa-lg"></i>
                    </a>
                    <a
                        href="https://wa.me/201000000000"
                        target="_blank"
                        rel="noreferrer"
                        className="text-success mx-2"
                    >
                        <i className="fa-brands fa-whatsapp fa-lg"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className=" text-danger mx-2"
                    >
                        <i className="fa-brands fa-instagram fa-lg"></i>
                    </a>
                </div>

                {/* Copyright */}
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} SHOPPER. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

