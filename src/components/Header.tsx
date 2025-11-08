import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
// TODO: Add user logout functionality
const Header: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("userId");
    navigate("/auth");
  }

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Mood Tracker App</h1>
      <div className={styles.rightSection}>
        <button className={styles.logoutBtn} onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
