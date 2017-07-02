// noinspection JSUnresolvedVariable
import {preview, previewNamePrefix, previewsContainer} from "../../styles/editorExtensions/freeSpace.less";

ace.define("ace/ext/freespace", ["require", "exports", "module", "ace/lib/dom", "ace/editor", "ace/config"], function (acequire) {
    const Editor = acequire("../editor").Editor;

    const MAX_UNSEEN = 3;
    const MAX_FREE_LINES = 8;

    // TODO: Use browser crypto hash (or no?)
    function stringHashAbs(str = '') {
        let hash = 0;
        let i;
        let chr;
        let len;
        if (str.length === 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // Port from jQuery (but with filter callback)
    function nextAll(element, filter) {
        const siblings = Array.from(element.parentNode.children);
        let next = siblings.slice(siblings.indexOf(element) + 1);
        if (filter) {
            next = next.filter(filter);
        }
        return next;
    }

    function parents(elem, filter) {
        const elements = [];

        while ((elem = elem.parentElement) !== null) {
            if (elem.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (filter && filter(elem)) {
                elements.push(elem);
            }
        }

        return elements;
    }

    function onAfterRender(err, renderer) {
        // Get preview layer of current editor
        const previewContents = renderer.container.getElementsByClassName(previewsContainer)[0];
        // Hide ALL previews
        for (const previewElement of previewContents.getElementsByClassName(preview)) {
            previewElement.classList.add('unseen');
        }
        // Now process every link in container
        let previewNumber = 1;
        for (const currentLink of renderer.content.getElementsByClassName('ace_link')) {
            const url = currentLink.textContent;
            let previewType;
            let renderData;
            let renderTempData;
            // Youtube video
            if (renderTempData = url.match(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^<]+)/)) {
                renderData = renderTempData;
                previewType = 'youtube';
                // Image
            } else if (renderTempData = url.match(/.*\.(jpg|gif|png|jpeg|ico|svg|bmp)$/)) {
                renderData = renderTempData;
                previewType = 'image';
            }
            if (previewType) {
                console.log(previewType);
                const lineGroups = parents(currentLink, e => e.classList.contains('ace_line_group'))[0];
                const previewId = `${previewNamePrefix}_${previewNumber}_${stringHashAbs(lineGroups.textContent)}_${stringHashAbs(url)}`;
                let blankLineCount = 0;
                let blankLineHeight = 0;
                console.log(lineGroups);
                let nextGroups = nextAll(lineGroups, e => e.classList.contains('ace_line_group'));
                console.log(nextGroups);
                for (let nextGroup of nextGroups) {
                    console.log(blankLineCount, nextGroup);
                    if (nextGroup.textContent.trim() !== '') break;
                    blankLineHeight += +nextGroup.style.height.slice(0, -2); // Slice because there is "px" in styles
                    blankLineCount++;
                    if (blankLineCount >= MAX_FREE_LINES)
                        break; // Dont make very big previews
                }
                // Enought space for preview
                if (blankLineCount > 1) {
                    // Preview offsets and size calculation
                    let previewTopOffset = (currentLink.offsetTop + currentLink.offsetHeight + 2) + 'px';
                    let previewLeftOffset = (currentLink.offsetLeft + 6) + "px";
                    let previewHeight = (blankLineHeight - 8) + "px";
                    let previewWidth = "auto";
                    console.log(previewTopOffset, previewLeftOffset, previewHeight, previewWidth);
                    // Rendering
                    // If already rendered
                    let previewElement = document.getElementById(previewId);
                    // On error (?)
                    let contentHtml = "...";
                    switch (previewType) {
                        case "youtube":
                            contentHtml = `<iframe src="http://www.youtube.com/embed/${renderData}?modestbranding=1&rel=0&wmode=transparent&theme=light&color=white" frameborder="0" allowfullscreen></iframe>`;
                            previewWidth = Math.max(120, Math.min(640, Math.ceil(parseFloat(previewHeight) * 16.0 / 9.0))) + "px";
                            break;
                        case "image":
                            contentHtml = `<a href="${url}" target='_blank'><img src="${url}" /></a>`;
                            break;
                    }
                    // Preview is not created?
                    let createNew = false;
                    if (!previewElement)
                        createNew = true;

                    if (createNew) {
                        // Create new
                        previewElement = document.createElement('div');
                        previewElement.classList.add(preview);
                        previewElement.innerHTML = contentHtml;
                        previewElement.id = previewId;
                    }

                    // Set/update styles
                    previewElement.style.top = previewTopOffset;
                    previewElement.style.left = previewLeftOffset;
                    previewElement.style.height = previewHeight;
                    previewElement.style.width = previewWidth;

                    if (createNew) {
                        previewContents.insertBefore(previewElement, previewContents.firstChild);
                    } else {
                        previewElement.classList.remove('unseen');
                        // Show
                        previewElement.style.display = '';
                    }
                }
            }
            previewNumber++;
        }
        let unseenPreviews = previewContents.getElementsByClassName('unseen');
        // Hide offscreen
        for (const e of unseenPreviews) {
            e.style.display = 'none';
        }
        // Remove unseen if limit exceeded
        if (unseenPreviews.length > MAX_UNSEEN) {
            for (const e of Array.from(unseenPreviews).slice(-(unseenPreviews.length - MAX_UNSEEN))) {
                e.parentNode.removeChild(e);
            }
        }
    }

    acequire("../config").defineOptions(Editor.prototype, "editor", {
        enableFreeSpacePreviews: {
            set: function (val) {
                if (val) {
                    this.renderer.on("afterRender", onAfterRender);
                    let previewContainer = document.createElement('div');
                    previewContainer.classList.add('ace_layer');
                    previewContainer.classList.add(previewsContainer);
                    Array.from(this.container.getElementsByClassName('ace_content')).forEach(e => {
                        e.appendChild(previewContainer);
                    });
                } else {
                    this.renderer.off("afterRender", onAfterRender);
                    Array.from(this.container.getElementsByClassName(previewsContainer)).forEach(e => {
                        e.parentNode.removeChild(e);
                    });
                }
            },
            value: false
        }
    });
});

(function () {
    ace.acequire(["ace/ext/freespace"], function () {
    });
})();