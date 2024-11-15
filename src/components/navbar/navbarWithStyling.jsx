import React, { useState } from "react";
import styles from "./NavbarWithStyling.module.css";
import About from "../about/About";
import HoverButton from "../button/HoverButton";

const NavbarWithStyling = ({ menu, name, age, address }) => {
  let list;
  let biodata = {};
  const [biodata2, setBiodata2] = useState({});

  if (menu) {
    list = (
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
    list = <h1>List not exist</h1>;
  }

  function handleTriggerSelect(selectedStudent) {
    console.log("ke trigger " + selectedStudent);
    setBiodata2({
      ...biodata,
      name,
      age,
      address,
    });
    biodata = {
      ...biodata,
      name,
      age,
      address,
    };
  }

  console.log(biodata);
  console.log("COMPONENT RENDER ?");

  return (
    <>
      {/* modal component */}
      <div className={styles.overlay} onClick={""}>
        <div className={styles.modal}>
          {/* <button className={styles.closeButton} onClick={""}>
            &times;
          </button> */}
          <div className={styles.content}>
            Biodata : {biodata2.name} {biodata2.age} {biodata2.address}
          </div>
        </div>
      </div>
      {/* modal component */}

      <div className={styles.navbar}>
        <h1 className={styles.title}>FSW 2 - {name}</h1>
        {list}
      </div>
      <div className={styles.about}>
        <About name={name} age={age} address={address} />
      </div>
      <HoverButton onSelect={() => handleTriggerSelect(name)}>
        Click Me!
      </HoverButton>
    </>
  );
};

export default NavbarWithStyling;
