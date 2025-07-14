"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ClickCounter from "./component/ClickCounter/page.js";
import Form from "./component/Form/page.js";

export default function Home() {
  return (
    <div>
      <ClickCounter />
      <Form
        name={"bbbbbbbbbb"}
        link={"www.yahoo.com"}
        onClick={() => {
          alert("bbbbbbbbbbbbbbbbbbbb");
        }}
      />
      <Form
        name={"xxxxxxxxxxxxxxxx"}
        onClick={() => {
          alert("xxxxxxxxxxxxxxxxxxxxxxxx");
        }}
      />
    </div>
  );
}
