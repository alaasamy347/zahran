// Main Imports
// import { useState, useEffect } from "react";
// import axios from "axios";
import Headroom from "react-headroom";
// Components
import Navbar from "./Navbar/Navbar";
import BottomHeader from "./BottomHeader/BottomHeader";
// Styles
import styles from "./Header.module.css";
// Data
import allCategories from "../../../data/categories.json";

const categories = allCategories;

const Header = () => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/categories").then((res) => {
  //     setCategories(res.data);
  //   });
  // }, []);

  return (
    <Headroom>
      <header className={styles.header}>
        <Navbar />
        <BottomHeader categories={categories} />
      </header>
    </Headroom>
  );
};

export default Header;
