import { useContext } from 'react';
import { CollectionContext } from '../../context/CollectionContext.jsx';
import styles from './Navbar.module.css';
import { Link } from 'react-router';

const Navbar = () => {
    const { collection } = useContext(CollectionContext);

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Home</Link>
            <Link to="/collection" className={styles.collectionLink}>
                Ma Collection {collection.length > 0 && `(${collection.length})`}
            </Link>
        </nav>
    );
};

export default Navbar;