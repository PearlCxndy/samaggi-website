import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";


import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";

import { projects } from "./projects";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";


const Home = () => {
  const manifestoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    
    return () => clearTimeout(scrollTimeout);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".team").classList.add("light");
        document.querySelector(".footer").classList.add("light");
      },
      onLeaveBack: () => {
        document.querySelector(".team").classList.remove("light");
        document.querySelector(".footer").classList.remove("light");
      },
    });

    if (!isMobile) {
      gsap.set(".project", { opacity: 0.35 });
    }

    if (!isMobile) {
      const projects = document.querySelectorAll(".project");

      projects.forEach((project) => {
        const projectImg = project.querySelector(".project-img img");

        project.addEventListener("mouseenter", () => {
          gsap.to(project, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            opacity: 0.35,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }

    const manifestoText = new SplitType(".manifesto-title h1", {
      types: ["words", "chars"],
      tagName: "span",
      wordClass: "word",
      charClass: "char",
    });

    const style = document.createElement("style");
    style.textContent = `
      .word {
        display: inline-block;
        margin-right: 0em;
      }
      .char {
        display: inline-block;
      }
    `;
  
    document.head.appendChild(style);

    gsap.set(manifestoText.chars, {
      opacity: 0.25,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 35%",
        end: "bottom 75%",
        scrub: true,
        markers: false,
      },
    });

    manifestoText.chars.forEach((char, index) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.1
      );
    });

    gsap.to(".marquee-text", {
      scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          const moveAmount = self.progress * -1000;
          gsap.set(".marquee-text", {
            x: moveAmount,
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      manifestoText.revert();
      style.remove();
    };
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    
    const rows = document.querySelectorAll(".row");
    const isMobileView = window.innerWidth <= 900;

    const getStartX = (index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      return direction * (isMobileView ? 150 : 300);
    };

    if (rows.length > 0) {
      rows.forEach((row, index) => {
        const existingTrigger = ScrollTrigger.getAll().find(
          (st) => st.trigger === ".gallery" && st.vars?.targets === row
        );
        if (existingTrigger) {
          existingTrigger.kill();
        }

        const startX = getStartX(index);

        gsap.set(row, { x: startX });

        gsap.to(row, {
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: isMobileView ? 0.5 : 1,
            onUpdate: (self) => {
              const moveAmount = startX * (1 - self.progress);
              gsap.set(row, {
                x: moveAmount,
              });
            },
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <ReactLenis root>
      <div className="home">
        <Cursor />
        <NavBar />
        <section className="hero" id="hero">

          <VideoPlayer />

          <div className="header-container">
          <div className="intro-header">
          <p className="intro-thai" lang="th">( กลุ่มนักศึกษาไทยในอังกฤษ )</p>
          <p className="intro-eng">Thai Students' Association in the UK</p>
          </div>
          
          <div className="header h-1">
            <h1>Text 1 (put here)</h1>
            <h1 lang="th">ภาษาไทย</h1>
          </div>
          <div className="header h-2">
            <h1>Text 2, (put here)</h1>
            <h1 lang="th">ภาษาไทย</h1>
          </div>
          <div className="header h-3">
            <h1>Text 3, (put here)</h1>
            <h1 lang="th">ภาษาไทย</h1>
          </div>
          <div className="header h-4">
            <h1>Text 4, (put here)</h1>
            <h1 lang="th">ภาษาไทย</h1>
          </div>
          </div>


        </section>

        <section className="work" id="work">
          <div className="container">
            <div className="work-header">
              <HiArrowRight size={13} />
              <p>Selected projects</p>
            </div>

            <div className="projects">
              <div className="project-col">
                {projects
                  .filter((project) => project.column === 1)
                  .map((project) => (
                    <Link to="/work" key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt="Project Thumbnail" />
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="project-col">
                {projects
                  .filter((project) => project.column === 2)
                  .map((project) => (
                    <Link to="/work" key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt="Project Thumbnail" />
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>


        <section className="cta" id="about">
          <div className="cta-bg-img">
            <img src="/cta/cta-bg.png" alt="" />
          </div>
          <div className="cta-title">
            <p>Trusted by visionaries</p>
          </div>
          <div className="cta-header">
            <h2>
              Apple, Netflix, Gucci, Tesla, Uniqlo, Sephora, Google, Moët &
              Chandon, Spotify, BMW, Montblanc, Panasonic, Nespresso, L’Oréal,
              Samsung
            </h2>
          </div>
          <div className="cta-btn">
            <button>Discover more at origin.co</button>
          </div>
        </section>
        
        <section className="team" id="team">
        <div className="marquee">
          <div className="marquee-text">
            <h1>Maybeputsomethinghere?</h1>
          </div>
        </div>
        </section>

        <section id="contact" className="footer">
  {/* Top white section */}
        <div className="footer-top">
        <div className="footer-top-inner">
          <h1>Keep in touch</h1>
          <div className="footer-email">
            <p>We’d love to hear from you</p>
            <h2>
              <a href="mailto:hello@samaggisamagom.com">hello@samaggisamagom.com</a>
            </h2>
          </div>
        </div>
      </div>
  {/* Bottom black section */}
  <div className="footer-bottom">
  <div className="footer-left">
    <p>Events</p>
    <p>Mission</p>
    <p>Let's talk</p>
  </div>

  <div className="footer-center">
    <form className="newsletter-form">
      <label htmlFor="email">Sign up for our newsletter</label>
      <input type="email" id="email" placeholder="Your email here" />
      <button type="submit">→</button>
    </form>
  </div>

  <div className="footer-right">
    <div className="social-links">
      <p>Instagram ↗</p>
      <p>Facebook ↗</p>
      <p>LinkedIn ↗</p>
      <p>Line OA↗</p>
    </div>
    <div className="footer-meta">
      <div className="footer-location">
        <p>London—UK</p>
        <p>Samaggi Samagom™</p>
      </div>
      <button className="back-to-top" onClick={scrollToTop}>↑</button>
    </div>
  </div>
  
  <div className="footer-wordmark">
    <h1>SAMAGGI</h1>
  </div>
</div>
</section>
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);