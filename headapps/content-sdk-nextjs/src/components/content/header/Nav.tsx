import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import Style from '../../../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface NavProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: NavProps): React.JSX.Element => {
    const id = props.params.RenderingIdentifier;
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
            menuRef.current && !menuRef.current.contains(target) &&
            searchRef.current && !searchRef.current.contains(target) &&
            cartRef.current && !cartRef.current.contains(target) &&
            headerRef.current && !headerRef.current.contains(target) // include buttons
            ) {
            setMenuOpen(false);
            setSearchOpen(false);
            setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div ref={headerRef} className={`component ${props.params.styles}`} id={id || undefined}>
            <div className={Style.headerWrapper}>
                <div className={Style.logo}>
                    <a href="#">
                        <Image src="/images/demo-logo.png" alt="Logo" width={80} height={64} />
                    </a>
                </div>

                <div className={Style.navWrapper}>
                    {/* LEFT NAV */}
                    <ul className={Style.navLinks}>
                        <li className={Style.navLink}><a href="#">Speaker</a></li>
                        <li className={Style.navLink}><a href="#">Headphones</a></li>
                        <li className={Style.navLink}><a href="#">Amps</a></li>
                        <li className={Style.navLink}><a href="#">Pro</a></li>
                        <li className={Style.navLink}><a href="#">Artist Services</a></li>
                        <li className={`${Style.navLink} ${Style.mobileSearchLink}`}>
                            <a
                                onClick={() => {
                                    setSearchOpen(!searchOpen);
                                    setMenuOpen(false);
                                    setCartOpen(false);
                                }}
                            >
                                Search
                            </a>
                        </li>
                    </ul>

                    {/* RIGHT NAV */}
                    <ul className={Style.navLinks}>
                        
                        {/* Hamburger */}
                        <button
                            className={`${Style.mobileMenuButton} ${menuOpen ? Style.open : ''}`}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                                setSearchOpen(false);
                                setCartOpen(false);
                            }}
                        >
                        <span />
                        <span />
                        <span />
                        </button>

                        <li className={Style.navLink}><a href="#">Support</a></li>
                        <li className={Style.navLink}>
                            <a
                                onClick={() => {
                                    setSearchOpen(!searchOpen);
                                    setMenuOpen(false);
                                    setCartOpen(false);
                                }}
                            >
                                Search
                            </a>
                        </li>
                        <li className={`${Style.cartIcon} ${Style.navLink}`}>
                            <a  onClick={() => {
                                setCartOpen(!cartOpen);
                                setMenuOpen(false);
                                setSearchOpen(false);
                            }}>
                                <FontAwesomeIcon icon={faShoppingCart} width={24} height={24} />
                            </a>
                        </li>                   
                    </ul>
                </div>
            </div>

      

            {/* MOBILE FULLSCREEN OVERLAY */}
            <div ref={menuRef} className={`${Style.mobileContainer} ${menuOpen ? Style.show : ''}`}>
                <div className={Style.mobileMenu}>
                    <ul>
                        <li><a href="#">Speaker</a></li>
                        <li><a href="#">Headphones</a></li>
                        <li><a href="#">Amps</a></li>
                        <li><a href="#">Pro</a></li>
                        <li><a href="#">Artist Services</a></li>
                    </ul>
                    <ul className={Style.mobileMenuBottom}>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
            </div>
        
            <div ref={searchRef} className={`${Style.popupContainer} ${searchOpen ? Style.show : ''}`}>
                <div className={Style.searchMenu}>
                    <h2>Search</h2>
                    <input
                        type="search"
                        placeholder="Search products"
                        aria-label="Search"
                        autoFocus
                    />
                    <button>Go</button>
                </div>
            </div>

            <div ref={cartRef} className={`${Style.popupContainer} ${cartOpen ? Style.show : ''}`}>
                <div className={Style.cartMenu}>
                    <h2>Your Cart</h2>
                    <p>Your cart is currently empty.</p>
                    <button>Go to Cart</button>
                </div>
            </div>
    
        </div>
    );
};
