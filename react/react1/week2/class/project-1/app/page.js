"use client";

import Button from "./button";
import Card from "./card";
import Layout from "./layout-component";

export default function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <Layout>
      <h2>Welcome to the Page</h2>

      <Button text="Click me" onClick={handleClick} />

      {/* <hr style={{ margin: "40px 0" }} /> */}

      <Card
        title="Beautiful Sunset"
        description="A stunning view of the sun setting over the mountains."
        imageUrl="./IMG_0235.JPG"
      />
    </Layout>
  );
}
