import styles from "./Header.module.css";
// TODO: Add user logout functionality
const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Mood Tracker App</h1>
      <div className={styles.rightSection}>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
