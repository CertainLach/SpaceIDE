import {fileBrowser, open} from "styles/mainUi.less";

import {inject, observer} from "mobx-react";
import FileBrowserSection from "./FileBrowserSection";
import FileEntry from "./FileEntry";
import React from "react";
import FileBrowserMenu from "./menu/FileBrowserMenu";

export default inject('bottom')(observer(props => {
    let className = props.bottom.fileBrowserOpened ? open : '';

    let byExtension = {
        less: [],
        css: [],
        scss: [],
        sass: [],
        tsx: [],
        jsx: [],
        ts: [],
        js: [],
        java: [],
        json: [],
        yml: [],
        other: []
    };
    const styles = [];
    const codes = [];
    const datas = [];
    const others = [];
    props.bottom.files.forEach(file => {
        let extension = file.path.substr(file.path.lastIndexOf('.') + 1);
        if (!byExtension[extension])
            extension = 'other';
        byExtension[extension].push(file);
    });
    // Style
    if (byExtension.less)
        styles.push(...byExtension.less);
    if (byExtension.css)
        styles.push(...byExtension.css);
    if (byExtension.scss)
        styles.push(...byExtension.scss);
    if (byExtension.sass)
        styles.push(...byExtension.sass);
    // Code
    if (byExtension.tsx)
        codes.push(...byExtension.tsx);
    if (byExtension.jsx)
        codes.push(...byExtension.jsx);
    if (byExtension.ts)
        codes.push(...byExtension.ts);
    if (byExtension.js)
        codes.push(...byExtension.js);
    if (byExtension.java)
        codes.push(...byExtension.java);
    // Data
    if (byExtension.json)
        datas.push(...byExtension.json);
    if (byExtension.yml)
        datas.push(...byExtension.yml);
    // Others
    if (byExtension.other)
        others.push(...byExtension.other);

    return <div id={fileBrowser} className={className}>
        <FileBrowserSection title="STYLE">
            {styles.map(file => <FileEntry key={file.path} file={file}/>)}
        </FileBrowserSection>
        <FileBrowserSection title="CODE">
            {codes.map(file => <FileEntry key={file.path} file={file}/>)}
        </FileBrowserSection>
        <FileBrowserSection title="DATA">
            {datas.map(file => <FileEntry key={file.path} file={file}/>)}
        </FileBrowserSection>
        <FileBrowserSection title="OTHER">
            {others.map(file => <FileEntry key={file.path} file={file}/>)}
        </FileBrowserSection>
        <FileBrowserMenu/>
    </div>
}));