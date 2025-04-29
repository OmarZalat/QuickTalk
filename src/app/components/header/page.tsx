import React from "react";
import styles from "./page.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>QuickTalk</div>
    </header>
  );
}
