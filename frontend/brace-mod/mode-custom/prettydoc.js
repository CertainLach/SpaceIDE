ace.define("ace/mode/prettydoc_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (acequire, exports, module) {
    const oop = acequire("../lib/oop");
    const TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

    const PrettydocHighlightRules = function () {
        // --
        const regexpWillBeginComment = "(?=(\\s\\/))";
        const regexpEndLineOrWillBeginComment = "($|" + regexpWillBeginComment + ")";
        const regexpLazyAnyCharacters = ".*?";
        const regexpLazyAnyCharToEndOrComment = regexpLazyAnyCharacters + regexpEndLineOrWillBeginComment;
        const regexpBeginLineOrIndent = "^\\s*";

        this.$rules = {
            // --
            "start": [{
                token: "comment",
                regex: "((^|\\s+)\/\/).*$"
            }, {
                token: "heading",
                regex: "^[A-ZА-Я]+[^a-zа-я]+?" + regexpEndLineOrWillBeginComment
            }, {
                token: "refimport", //
                egex: "^\\s*\\+\\s.*$"
            }, {
                token: "definition", // a:b
                regex: regexpBeginLineOrIndent + "[^\{\\s]*\:\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "orderedlist", // Ordered list
                regex: "^\\s*[0-9]+\\..*$"
            }, {
                token: "forcetype", // ...
                regex: "^\\s*\\.[^\\s]*"
            }, {
                token: "endsect", // End of section
                regex: "^--" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "important", // Important
                regex: regexpBeginLineOrIndent + "!\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "question", // Question
                regex: regexpBeginLineOrIndent + "\\?\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "cmdquote", // Cmd/Quote
                regex: regexpBeginLineOrIndent + "\\>\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "taskunstart", // Unstarted task
                regex: regexpBeginLineOrIndent + "[\\-\\*]\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "taskongoing", // Ongoing task
                regex: regexpBeginLineOrIndent + "[oO]\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "taskexecutd", // Executed task
                regex: regexpBeginLineOrIndent + "[xX]\\s" + regexpLazyAnyCharToEndOrComment
            }, {
                token: "emphasis", // Emphasis
                regex: "\\*[^\\s][^\\*]+[^\\s]\\*"
            }, {
                token: "parens", // Parenthetical side note
                regex: "\\([^\\)]+\\)"
            }, {
                token: "string", // String
                regex: '"[^"]+"'
            }, {
                token: "link", // @email
                regex: "[a-zA-Z]+@[^\\s]+"
            }, {
                token: "wperson", // @person
                regex: "@[^\\s]+"
            }, {
                token: "whashtag", // #hashtag
                regex: "#[^\\s]+"
            }, {
                token: "wreference", // &reference
                regex: "&[^\\s]+"
            }, {
                token: "link", // URL -> example.com/something
                regex: "[^\\s]*\\.[^\\s]+\\/+[^\\s]*"
            }, {
                token: "link", // URL -> http://example.com
                regex: "[^\\s]*\\:\\/\\/[^\\s]+"
            }, {
                token: "comment", // MULTI-LINE COMMENT. Modifies state.
                regex: "(^|\\s+)\\/\\*.*$",
                next: "multiline_comment"
            }],
            "multiline_comment": [{
                token: "comment", // MULTI-LINE string end
                regex: "(^|.*)\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }],


        };
    };

    oop.inherits(PrettydocHighlightRules, TextHighlightRules);

    exports.PrettydocHighlightRules = PrettydocHighlightRules;
});

ace.define("ace/mode/folding/prettydoc", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function (acequire, exports) {
    const oop = acequire("../../lib/oop");
    const BaseFoldMode = acequire("./fold_mode").FoldMode;
    const Range = acequire("../../range").Range;

    const FoldMode = exports.FoldMode = function () {
    };
    oop.inherits(FoldMode, BaseFoldMode);

    (function () {
        const regexpHeading = new RegExp("^[A-ZА-Я]+[^a-zа-я]+?($|(?=(\\s\/)))");
        const regextEndSection = new RegExp("^--.*?($|(?=(\\s\/)))");
        const regexpIndentation = new RegExp("\\S");
        this.getFoldWidget = function (session, foldStyle, row) {
            // GET THE START OF A FOLD RANGE
            const line = session.getLine(row);
            const indent = line.search(regexpIndentation);
            const next = session.getLine(row + 1);
            const nNext = session.getLine(row + 2);
            const prev = session.getLine(row - 1);
            const prevIndent = prev.search(regexpIndentation);
            const nextIndent = next.search(regexpIndentation);
            const nNextIndent = nNext.search(regexpIndentation);
            // This is a bit strange, but pretty clever :)
            // We start a fold if (next line is more indented OR (Next two lines are blank))
            if (indent >= 0 && (nextIndent > indent || (nextIndent === -1 && nNextIndent === -1))) {
                // Indentation fold.
                return "start";
            } else {
                // Not standard indentation, but could be a HEADING (all caps) fold...
                const lineIsHeading = line.search(regexpHeading) >= 0;
                if (lineIsHeading) return "start";
                // No fold.
                return "";
            }
        };
        this.getFoldWidgetRange = function (session, foldStyle, row) {
            // In the simple case, folding is defined by indentation.. Just check/return that if available.
            const range = this.indentationBlockSpecial(session, row);
            if (range) return range;
            // Otherwise, it could be a same-level fold, i.e. a HEADING (all caps)...
            let line = session.getLine(row);
            let startIsHeading = line.search(regexpHeading) >= 0;
            const startIndent = line.search(regexpIndentation);
            if (!startIsHeading || startIndent < 0) return;
            const startColumn = line.length;
            const maxRow = session.getLength();
            const startRow = row;
            let endRow = row;
            while (++row < maxRow) {
                line = session.getLine(row);
                const indent = line.search(regexpIndentation);
                const l2IsHeading = line.search(regexpHeading) >= 0;
                // Check if we reached another heading on the same level.
                if (l2IsHeading && indent === startIndent) break;
                // check if heading was indented and we outdented
                if (indent >= 0 && indent < startIndent) break;
                // Check if user has forced section to end with "--" line
                const l2IsEndSect = line.search(regextEndSection) >= 0;
                if (l2IsEndSect && indent === startIndent) break;
                endRow = row;
            }
            // --
            if (endRow > startRow) {
                const endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        };
        // This is a special version of block indentation that continues
        // the indentation for n-1 following blank lines.
        this.indentationBlockSpecial = function (session, row, column) {
            const re = /\S/;
            const line = session.getLine(row);
            const startLevel = line.search(re);
            if (startLevel === -1) return null;
            const startColumn = column || line.length;
            const maxRow = session.getLength();
            const startRow = row;
            let endRow = row;
            let seenMoreIndented = false;
            while (++row < maxRow) {
                const level = session.getLine(row).search(re);
                if (level === -1) {
                    endRow = seenMoreIndented ? row : (row - 1); // -1 here if you want to allow for a possible gap between sub-sections.
                    continue;
                }
                if (level <= startLevel) break;
                seenMoreIndented = true;
                endRow = row;
            }
            if (endRow > startRow) {
                const endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        };
    }).call(FoldMode.prototype);

});

ace.define("ace/mode/prettydoc", ["require", "exports", "module"], function (acequire, exports) {
    "use strict";

    const oop = acequire("../lib/oop");
    const TextMode = acequire("./text").Mode;
    const PrettydocHighlightRules = acequire("./prettydoc_highlight_rules").PrettydocHighlightRules;
    const PrettydocFoldMode = acequire("./folding/prettydoc").FoldMode;
    const Range = acequire("../range").Range;

    const Mode = function () {
        this.HighlightRules = PrettydocHighlightRules;
        this.foldingRules = new PrettydocFoldMode("\\:");
    };
    oop.inherits(Mode, TextMode);

    (function () {

        this.lineCommentStart = "//";
        this.blockComment = {start: "/*", end: "*/"};

        this.getNextLineIndent = function (state, line, tab) {
            let indent = this.$getIndent(line);

            const tokenizedLine = this.getTokenizer().getLineTokens(line, state);
            const tokens = tokenizedLine.tokens;

            if (tokens.length && tokens[tokens.length - 1].type === "comment") {
                return indent;
            }

            if (state === "start") {
                const match = line.match(/^.*[\{\(\[\:]\s*$/);
                if (match) {
                    indent += tab;
                }
            }

            return indent;
        };

        const outdents = {
            "pass": 1,
            "return": 1,
            "raise": 1,
            "break": 1,
            "continue": 1
        };

        this.checkOutdent = function (state, line, input) {
            if (input !== "\r\n" && input !== "\r" && input !== "\n")
                return false;

            let tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
            let last;
            if (!tokens)
                return false;
            do {
                last = tokens.pop();
            } while (last && (last.type === "comment" || (last.type === "text" && last.value.match(/^\s+$/))));

            if (!last)
                return false;

            return (last.type === "keyword" && outdents[last.value]);
        };

        this.autoOutdent = function (state, doc, row) {

            row += 1;
            const indent = this.$getIndent(doc.getLine(row));
            const tab = doc.getTabString();
            if (indent.slice(-tab.length) === tab)
                doc.remove(new Range(row, indent.length - tab.length, row, indent.length));
        };

        this.$id = "ace/mode/prettydoc";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
