import styles from './Navbar.module.css';
import { Link } from 'react-router';

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Home</Link>
        </nav>
    )

}

export default Navbar;