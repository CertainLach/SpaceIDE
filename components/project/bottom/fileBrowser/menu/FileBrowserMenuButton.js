import {fileBrowserMenuItem} from "../../../../../styles/mainUi.less";
import React from "react";

export default props => <div onClick={props.onClick} className={fileBrowserMenuItem}>
    {props.title}
</div>;