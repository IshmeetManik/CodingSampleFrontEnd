import React from "react";
import { Loader } from "semantic-ui-react";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const LoaderExampleInlineCentered = () => <Loader active inline="centered" />;

export default LoaderExampleInlineCentered;
