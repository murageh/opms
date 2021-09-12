import Link from "next/link";
import React from "react";
import PageLayout from "../layouts/PageLayout";
import styles from "../styles/Home.module.css";


const About = () => {

  return (
    <main className={styles.main}>
      <h1 className={styles.sub_title}>
        About OPMS
      </h1>
      <p>
        <Link href="/">
          <a>Go: HOme</a>
        </Link>
      </p>
    </main>
  );
}

About.layout = PageLayout;
export default About;