// Global setup/teardown

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  console.log("***************BEFOREEACH RUNNING")
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  console.log("***************AFTEREACH RUNNING")
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});