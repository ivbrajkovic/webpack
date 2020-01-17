import { render } from "preact";

Promise.resolve().finally();

const First = () => <h1>First</h1>;

render(<First />, document.getElementById("app1"));
