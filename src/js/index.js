import "../style/style.css";

import { cube, square } from "./math.js";

// square(2);
// square(4);

cube(10);

function component() {
  const element = document.createElement("pre");
  element.innerHTML = "Hello webpack! 5 cubed is equal to " + cube(5);
  return element;
}

document.body.appendChild(component());

// alert("Hello world from Webpack!!");

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
// import { faCheckCircle, faAdjust } from "@fortawesome/free-solid-svg-icons";

// import React from "react";
// import ReactDOM from "react-dom";

// import First from "./first";
// import Second from "./Second";

// const App = () => (
//   <>
//     <First />
//     <Second />
//   </>
// );

// const node = document.getElementById("app");
// console.log("TCL: node", node);

// ReactDOM.render(<App />, node);
