import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faAdjust } from "@fortawesome/free-solid-svg-icons";

// We are only using the user-astronaut icon
library.add(faCheckCircle, faAdjust);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();

// faHammer;
