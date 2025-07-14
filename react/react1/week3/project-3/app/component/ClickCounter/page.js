"use client";
import React, { useEffect, useState } from "react";

function ClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    //setCount(count + 1);
    console.log(count);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>You clicked {count} times</p>
      <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx {count} times</p>
    </div>
  );
}

export default ClickCounter;
