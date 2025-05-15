import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(".menu-overlay", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(".menu-item", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(".menu-overlay", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(".menu-item", {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { text: "Events", link: "#work" },
    { text: "Sara", link: "#manifesto" },
    { text: "About", link: "#about" },
    { text: "Contact", link: "#contact" }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} ref={navbarRef}>
        <div className="navbar-container">
          <div className="logo-container">
            <a 
              href="#hero" 
              onClick={(e) => {
                handleNavClick(e, "#hero");
                setIsMenuOpen(false);
              }} 
            >
              <div className="logo-main">
                <span className="text-default">SAMAGGI</span>
                <span className="text-hover" lang="th">-สามัคคี-</span>
              </div>
            </a>
          </div>
  
          {isScrolled ? (
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
            </button>
          ) : (
            <div className="nav-links">
              <a href="#work" onClick={(e) => handleNavClick(e, "#work")} className="underline-hover">
                <p>Work</p>
              </a>
              <a href="#manifesto" onClick={(e) => handleNavClick(e, "#manifesto")} className="underline-hover">
                <p>Manifesto</p>
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="underline-hover">
                <p>Spirit</p>
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="underline-hover">
                <p>Contact</p>
              </a>
            </div>
          )}
        </div>
      </nav>


      {/* Menu Overlay */}
      <div className="menu-overlay">
        <div className="menu-header">
          <div className="logo-container">
            <a 
              href="#hero" 
              onClick={(e) => {
                handleNavClick(e, "#hero");
                setIsMenuOpen(false);
              }} 
              className="logo-link"
            >
                      <div className="logo-main">
          <span className="text-default">SAMAGGI</span>
          <span className="text-hover" lang="th">-สามัคคี-</span>
        </div>
            </a>
          </div>
          <button className="close-button" onClick={toggleMenu}>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="menu-content">
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className="menu-item"
                onClick={(e) => handleNavClick(e, item.link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2ecc71";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <a href={item.link}>{item.text}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;