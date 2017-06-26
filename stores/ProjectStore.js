import {action, computed, observable} from "mobx";

export default class ProjectStore {
    @observable layoutModel = {
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
                                "type": "panel"
                            },
                            {
                                "type": "panel"
                            }
                        ]
                    },
                    {
                        "type": "panel"
                    }
                ]
            },
            {
                "type": "panel"
            }
        ]
    };
}
