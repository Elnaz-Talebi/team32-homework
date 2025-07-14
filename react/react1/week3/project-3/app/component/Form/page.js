"use client";
import styles from "./page.module.css";

function Form({ name, link, onClick }) {
  return (
    <div>
      <a className={styles.text} onClick={onClick}>
        Hello {name}
      </a>
    </div>
  );
}
export default Form;
