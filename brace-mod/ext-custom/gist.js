// noinspection JSUnresolvedVariable
import {gistDark, gistLight, gistLoading} from "../../styles/editorExtensions/gist.less";
// Ported as extension from cs50 ide
ace.define("ace/ext/gist", ["require", "exports", "module", "ace/lib/dom", "ace/editor", "ace/config"], function (acequire) {
    const Editor = acequire("../editor").Editor;
    let icons = {
        dark: gistDark,
        light: gistLight,
        loading: gistLoading
    };

    acequire("../config").defineOptions(Editor.prototype, "editor", {
        enableGistSharing: {
            set: function (val) {
                if (val) {
                    let ace = this;
                    let currentSession = ace.renderer.session;
                    let keyUp, mouseUp;

                    function updateIcon(e, renderer) {
                        let selection = currentSession.selection;
                        let range = selection.getRange();
                        if (!isNaN(currentSession.row)) {
                            currentSession.removeGutterDecoration(
                                currentSession.row, icons.dark
                            );
                        }
                        currentSession.row = null;
                        if (range.isEmpty())
                            return;
                        currentSession.row = selection.getSelectionLead().row;
                        currentSession.addGutterDecoration(
                            currentSession.row, icons.dark
                        );
                    }

                    ace.container.onkeydown = function (e) {
                        if (e.shiftKey) {
                            keyUp = false;
                            return;
                        }
                        updateIcon();
                    };
                    ace.container.onkeyup = function (e) {
                        if (!e.shiftKey) {
                            keyUp = true;
                            updateIcon();
                        }
                    };
                    ace.container.onmousedown = function () {
                        mouseUp = false;
                        updateIcon();
                    };

                    document.addEventListener("mouseup", function () {
                        mouseUp = true;
                        updateIcon();
                    });

                    ace.on("guttermousedown", function (e) {

                        // get clicked row
                        const clickedRow = e.getDocumentPosition().row;

                        // get clicked region
                        const region = e.editor.renderer.$gutterLayer.getRegion(e);

                        // handle clicking on share icon
                        if (region === "markers" && clickedRow === currentSession.row) {
                            currentSession.addGutterDecoration(
                                currentSession.row, icons.loading
                            );
                            fetch('https://api.github.com/gists', {
                                method: 'post',
                                body: JSON.stringify({
                                    description: "Code shared from SpaceIDE",
                                    // TODO: Filename
                                    files: {"todo.filename": {"content": e.editor.getSelectedText()}},
                                    public: true
                                }),
                                contentType: "application/json"
                            }).then(response => response.json()).then(data => {
                                currentSession.removeGutterDecoration(
                                    currentSession.row, icons.loading
                                );
                                prompt('Done adding gist, url:', data.html_url);
                            });
                        }
                    }, true);
                } else {
                    throw new Error('Cannot disable gist handler!');
                }
            },
            value: false
        }
    });
});

(function () {
    ace.acequire(["ace/ext/gist"], function () {
    });
})();