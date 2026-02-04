import styles from './Navbar.module.css';
import { Routes, Route } from 'react-router';

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <p className={styles.logo}> Home</p>
        </nav>
    )

}

export default Navbar;