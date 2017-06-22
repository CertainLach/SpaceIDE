ace.define("ace/ext/spellcheck", ["require", "exports", "module", "ace/lib/dom", "ace/editor", "ace/config"], function(acequire, exports, module) {
    // TODO: move to less?
    var fsPreviewCss = `
    .ace_fs_preview {
        position: absolute;
        right: 20px;
        border-left: 2px dotted rgba(128,128,128,0.5);
        padding: 2px;
        padding-left: 7px;
        overflow: hidden;
        cursor: text;
    }
    .ace_fs_preview > * {
        pointer-events: auto;
    }

    .ace_fs_preview img {
        height: 100%; 
        width: auto; 
        background-color: rgba(128,128,128,0.85);
    }
    .ace_fs_preview img:hover {
        outline: 2px solid #808080;
    }

    .ace_fs_preview iframe {
        height: 100%;
        width: 100%; 
        background: #808080;
    }
    `;

    const dom = acequire("../lib/dom");
    dom.importCssString(fsPreviewCss, "ace_fs_previews");

    const Editor = acequire("../editor").Editor;

    // TODO: Use only for images (Since youtube videos takes soo much ram)
    const MAX_UNSEEN = 0;

    // TODO: Use browser crypto hash (or no?)
    function stringHashAbs(str) {
        str = str || "";
        var hash = 0,
            i, chr, len;
        if (str.length == 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // Port from jQuery (but with filter callback)
    function nextAll(element, filter) {
        const siblings = [...element.parentNode.children];
        let next = siblings.slice(siblings.indexOf(element) + 1);
        if (filter) {
            next = next.filter(filter);
        }
        return next;
    }

    function onAfterRender(err, renderer) {
        // Get preview layer of current editor
        const previewContents = renderer.container.getElementsByClassName('ace_fs_previews')[0];
        // Hide ALL previews
        [...previewContents.getElementsByClassName('ace_fs_preview')].forEach(e => e.classList.add('unseen'));
        // Now process every link in container
        [...renderer.content.getElementsByClassName('ace_link')].forEach((currentLink, index) => {
            const url = currentLink.textContent;
            let previewType;
            let renderData;
            let renderTempData;
            // Youtube video
            if (renderTempData = url.match(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^<]+)/)) {
                renderData = renderTempData;
                previewType = 'youtube';
            } else if (renderTempData = url.match(/.*\.(jpg|gif|png|jpeg|ico|svg|bmp)$/)) {
                renderData = renderTempData;
                previewType = 'image';
            }
            if (previewType) {
                const lineGroup = [...currentLink.getElementsByClassName('.ace_line_group')].map(e => e.parentNode);
                const previewId = "fsp_id_" + stringHashAbs(lineGroup.text()) + "_" + stringHashAbs(url);
                let blankLineCount = 0;
                let blankLineHeight = 0;
                let nextGroups = nextAll(lineGroup, e => e.classList.contains('ace_line_group'));
                for (let nextGroup of nextGroups) {
                    // TODO: trim?
                    if (nextGroup.textContent !== '') break;
                    blankLineHeight += +nextGroup.style.height.slice(0, -2); // Slice because there is "px" in styles
                    blankLineCount++;
                }
                // Enought space for preview
                if (blankLineCount > 1) {
                    // Preview offsets and size calculation
                    const previewTopOffset = (currentLink.offsetTop + (+currentLink.style.height.slice(0, -2)) + 2) + 'px';
                    const previewLeftOffset = (currentLink.offsetLeft + 6) + "px";
                    const previewHeight = (blankLineHeight - 8) + "px";
                    const previewWidth = "auto";
                    // Rendering
                    // If already rendered
                    const previewElement = document.getElementById(previewId);
                    // On error (?)
                    const contentHtml = "...";
                    switch (previewType) {
                        case "youtube":
                            contentHtml = `<iframe src="http://www.youtube.com/embed/${renderData}?modestbranding=1&rel=0&wmode=transparent&theme=light&color=white" frameborder="0" allowfullscreen></iframe>`;
                            // TODO: Recalculate player width?
                            break;
                        case "image":
                            contentHtml = `<a href="${url}" target='_blank'><img src="${url}" /></a>`;
                            break;
                    }
                    // Preview is not created?
                    let createNew = false;
                    if (previewElement.length === 0)
                        createNew = true;

                    if (createNew) {
                        // Create new
                        previewElement = document.createElement('div');
                        previewElement.classList.add('ace_fs_preview');
                        previewElement.innerHTML = contentHtml;
                        previewElement.id = previewId;
                    }

                    // Set/update styles
                    previewElement.style.top = previewTopOffset;
                    previewElement.style.left = previewLeftOffset;
                    previewElement.style.height = previewHeight;
                    previewElement.style.width = previewWidth;

                    if (createNew) {
                        previewContents.insertBefore(el, previewContents.firstChild);
                    } else {
                        previewElement.classList.remove('unseen');
                        // Show
                        previewElement.style.display = '';
                    }
                }
            }
        });
        let unseenPreviews = previewContents.getElementsByClassName('unseen');
        unseenPreviews.forEach(e => e.style.display = 'none'); // Hide offscreen
        if (unseenPreviews.length > MAX_UNSEEN) {
            unseenPreviews.slice(-(unseenPreviews.length - MAX_UNSEEN)).forEach(e => {
                e.parentNode.removeChild(e);
            });
        }
    }

    acequire("../config").defineOptions(Editor.prototype, "editor", {
        enableFreeSpacePreviews: {
            set: function(val) {
                if (val) {
                    this.renderer.on("afterRender", onAfterRender);
                    $(this.container).find(".ace_content").append("<div class='ace_layer ace_fs_previews'></div>");
                } else {
                    this.renderer.off("afterRender", onAfterRender);
                    $(this.container).find(".ace_content .ace_layer.ace_fs_previews").remove();
                }
            },
            value: true
        }
    });
});

(function() {
    ace.acequire(["ace/ext/freespace"], function() {});
})();