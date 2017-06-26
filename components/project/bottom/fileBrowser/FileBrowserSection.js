import {fileBrowserSectFiles, fileBrowserSection, fileBrowserSectTitle} from "styles/mainUi.less";
import React from "react";

export default props => <div className={fileBrowserSection}>
    <div className={fileBrowserSectTitle}>{props.title}</div>
    <div className={fileBrowserSectFiles}>{props.children}</div>
</div>;