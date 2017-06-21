import {fileBrowserMenu, mainMenu, selectedFileMenu} from "../../../../../styles/mainUi.less";

import {inject, observer} from "mobx-react";
import FileBrowserMenuButton from "./FileBrowserMenuButton";
import FileBrowserMenuInput from "./FileBrowserMenuInput";
import React from "react";

export default inject('bottom')(observer(
    props => {
        let menuType;
        let menuContent;
        if (props.bottom.selectedFile) {
            menuType = selectedFileMenu;
            menuContent = <div>
                <FileBrowserMenuInput value={props.bottom.selectedFile}/>
                <FileBrowserMenuButton title="Rename"/>
                <FileBrowserMenuButton title="Delete"/>
                <FileBrowserMenuButton title="Copy"/>
            </div>
        } else {
            menuType = mainMenu;
            menuContent = <div>
                <FileBrowserMenuButton title="New file"/>
            </div>
        }
        return <div id={fileBrowserMenu} className={menuType}>
            {menuContent}
        </div>
    }
));