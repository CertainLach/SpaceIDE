import {action, computed, observable} from "mobx";

export default class ProjectStore {
    @observable layoutModel = {
        "t":1,
        "type": "vsplitbox",
        "size": 15,
        "nodes": [
            {
                "type": "vsplitbox",
                "size": 45,
                "nodes": [
                    {
                        "type": "hsplitbox",
                        "size": 41,
                        "nodes": [
                            {
                                "type": "panel",
                                "panelType": "codeEditor",
                                "fileName":"a/b.js",
                                "status":"saved"
                            },
                            {
                                "type": "panel",
                                "panelType": "codeEditor",
                                "fileName":"b/c.js",
                                "status":"errored"
                            }
                        ]
                    },
                    {
                        "type": "panel",
                        "panelType": "codeEditor",
                        "status":"saving"
                    }
                ]
            },
            {
                "type": "panel",
                "panelType": "codeEditor",
                "status":"idle"
            }
        ]
    };
}
