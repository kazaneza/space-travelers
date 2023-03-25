import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import planet from '../img/planet.png';

const Navbar = () => (
  <div className={styles.navContainer}>
    <nav className={styles.navbar}>
      <img src={planet} alt="My logo" className={styles.logo} />
      <h1 className={styles.heading}>Space Travelers&apos; Hub</h1>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={styles.active}>
            Rockets
          </NavLink>
        </li>
        <li>
          <NavLink to="/missions" className={styles.active}>
            Missions
          </NavLink>
        </li>
        <li>
          <NavLink to="/MyProfile" className={styles.active}>
            My Profile
          </NavLink>
        </li>
      </ul>

    </nav>
    <hr className={styles.horizontal} />
  </div>

);

export default Navbar;
