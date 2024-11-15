import React, { useState } from "react";
import styles from "./NavbarWithStyling.module.css";

const Navbar = ({ menu, name }) => {
  const [list, setList] = useState("");

  if (menu) {
    setList(
      <ul className={styles.list}>
        <li className={styles.item}>
          <a href="#" className={styles.link}>
            Home
          </a>
        </li>
        <li className={styles.item}>
          <a href="#" className={styles.link}>
            {menu[0]}
          </a>
        </li>
        <li className={styles.item}>
          <a href="#" className={styles.link}>
            Logout
          </a>
        </li>
      </ul>
    );
  } else {
    setList(<h1>List not exist</h1>);
  }

  return (
    <div className={styles.navbar}>
      <header></header>
      <h1 className={styles.title}>FSW 2 - {name}</h1>
    </div>
  );
};

export default Navbar;
