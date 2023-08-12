'use client'
import styles from '../styles/navbar.module.css';
import '../globals.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


function Navbar() 
{
  const [shouldRender, setShouldRender] = useState(false);
  const [navbarShadow, setNavbarShadow]=useState(false);
  const [hamMenu, setHamMenu]=useState(false);
  const [New, setNew]=useState(true);

  
  useEffect(() => 
  {
      const timer = setTimeout(() => {
          setShouldRender(true);
      }, 100);

      return () => clearTimeout(timer);
  }, []);


  const scrollToAbout = () => 
  {
    const aboutSection = document.querySelector('.about_container');
    const offsetTop = aboutSection.offsetTop;
    const scrollToPosition = offsetTop - 80;
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth'
    });
    setHamMenu(false);
  }

  const scrollToMajorProjects = () => 
  {
    const majorProjectsSection = document.querySelector('.major_projects_parent');
    const offsetTop = majorProjectsSection.offsetTop;
    const scrollToPosition = offsetTop - 80;
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth'
    });
    setHamMenu(false);
  }

  // const scrollToExperience = () => {
  //   const experienceSection = document.querySelector('.experience_container');
  //   experienceSection.scrollIntoView({ behavior: 'smooth' });
  // };


  const scrollToContact = () => 
  {
    const contactSection = document.querySelector('.contact_container');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setHamMenu(false);
  };

  useEffect(() => {
    const toggleBodyScroll = (scrollable) => {
      document.body.style.overflow = scrollable ? "auto" : "hidden";
    };

    if (hamMenu) {
      toggleBodyScroll(false);
    } else {
      toggleBodyScroll(true);
    }

  }, [hamMenu]);


  const handleScroll = () => 
  {
    if (window.scrollY>5)
    {
      setNavbarShadow(true);
    }
    else
    {
      setNavbarShadow(false);
    }
  };

  const handleResize = () =>
  {
    if (window.innerWidth<769) 
    {
      // setHamMenu(true);
    }
    else
    {
      setHamMenu(false);
      setNew(true);
    }
  }

  useEffect(() => 
  {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  const toggleHamMenu = () =>
  {
    setHamMenu(!hamMenu);
  }

  const handleHamIconClick = () =>
  {
    toggleHamMenu();
    setNew(false);
  }

  return (
    <div>
        {shouldRender && 
        <nav 
            className={navbarShadow ? `${styles.navbar_container} ${styles.navbar_shadow}` : styles.navbar_container}
        >
        <a href='' className={styles.logo_container}>
            {/* <Image
                src="/images/A.jpg" // Provide the path to your image
                alt="Description of the image"
                width={45}
                height={45}
            /> */}
        </a>
        <div className={styles.nav_tabs}>
            <ul>
                <li>Home</li>
                <li onClick={scrollToAbout}>About</li>
                <li>Experience</li>
                <li onClick={scrollToMajorProjects}>Work</li>
                <li onClick={scrollToContact}>Contact</li>
            </ul>
        </div>

        <div className={styles.ham_icon} onClick={handleHamIconClick}>
          <span className={hamMenu ? styles.rotateDown : New ? '' : styles.removeRotateDown}></span>
          <span className={hamMenu ? New ? '' : styles.remove : ''}></span>
          <span className={hamMenu ? styles.rotateUp : New ? '' : styles.removeRotateUp}></span>
        </div>

        {hamMenu && <div className={styles.blur} onClick={toggleHamMenu}></div>}

        <div className={hamMenu ? `${styles.ham_tabs} ${styles.ham_tabs_show}` : `${styles.ham_tabs} ${styles.ham_tabs_hide}`}>
          <ul>
                <li>Home</li>
                <li onClick={scrollToAbout}>About</li>
                <li>Experience</li>
                <li onClick={scrollToMajorProjects}>Work</li>
                <li onClick={scrollToContact}>Contact</li>
          </ul>
        </div>

      </nav>}
    </div>
  );
}

export default Navbar;

