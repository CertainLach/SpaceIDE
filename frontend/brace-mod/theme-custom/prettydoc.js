ace.define("ace/theme/prettydoc", ["require", "exports", "module", "ace/lib/dom"], function (acequire, exports, module) {

    exports.isDark = true;
    exports.cssClass = "ace-prettydoc";
    exports.cssText = `.ace-prettydoc .ace_gutter {
        background: #232323;
        color: #E2E2E2
        }
        .ace-prettydoc .ace_print-margin {
        width: 1px;
        background: #232323
        }
        .ace-prettydoc {
        background-color: #141414;
        color: #F8F8F8
        }
        .ace-prettydoc .ace_cursor {
        color: #A7A7A7
        }
        .ace-prettydoc .ace_marker-layer .ace_selection {
        background: rgba(221, 240, 255, 0.20)
        }
        .ace-prettydoc.ace_multiselect .ace_selection.ace_start {
        box-shadow: 0 0 3px 0px #141414;
        border-radius: 2px
        }
        .ace-prettydoc .ace_marker-layer .ace_step {
        background: rgb(102, 82, 0)
        }
        .ace-prettydoc .ace_marker-layer .ace_bracket {
        margin: -1px 0 0 -1px;
        border: 1px solid rgba(255, 255, 255, 0.25)
        }
        .ace-prettydoc .ace_marker-layer .ace_active-line {
        background: rgba(255, 255, 255, 0.031)
        }
        .ace-prettydoc .ace_gutter-active-line {
        background-color: rgba(255, 255, 255, 0.031)
        }
        .ace-prettydoc .ace_marker-layer .ace_selected-word {
        border: 1px solid rgba(221, 240, 255, 0.20)
        }
        .ace-prettydoc .ace_invisible {
        color: rgba(255, 255, 255, 0.25)
        }
        .ace-prettydoc .ace_keyword,
        .ace-prettydoc .ace_meta {
        color: #CDA869
        }
        .ace-prettydoc .ace_constant,
        .ace-prettydoc .ace_constant.ace_character,
        .ace-prettydoc .ace_constant.ace_character.ace_escape,
        .ace-prettydoc .ace_constant.ace_other,
        .ace-prettydoc .ace_heading,
        .ace-prettydoc .ace_markup.ace_heading,
        .ace-prettydoc .ace_support.ace_constant {
        color: #CF6A4C;
        font-weight: 600;
        }
        .ace-prettydoc .ace_invalid.ace_illegal {
        color: #F8F8F8;
        background-color: rgba(86, 45, 86, 0.75)
        }
        .ace-prettydoc .ace_invalid.ace_deprecated {
        text-decoration: underline;
        font-style: italic;
        color: #D2A8A1
        }
        .ace-prettydoc .ace_support {
        color: #9B859D
        }
        .ace-prettydoc .ace_fold {
        margin-left: 3px;
        background-color: #B33712;
        border-color: #000
        }
        .ace-prettydoc .ace_support.ace_function {
        color: #DAD085
        }
        .ace-prettydoc .ace_list,
        .ace-prettydoc .ace_markup.ace_list,
        .ace-prettydoc .ace_storage {
        color: #F9EE98
        }
        .ace-prettydoc .ace_entity.ace_name.ace_function,
        .ace-prettydoc .ace_meta.ace_tag,
        .ace-prettydoc .ace_variable {
        color: #AC885B
        }
        .ace-prettydoc .ace_string {
        color: #8F9D6A
        }
        .ace-prettydoc .ace_string.ace_regexp {
        color: #E9C062
        }
        .ace-prettydoc .ace_comment {
        font-style: italic;
        color: #5F5A60
        }
        .ace-prettydoc .ace_variable {
        color: #7587A6
        }
        .ace-prettydoc .ace_xml-pe {
        color: #494949
        }
        .ace-prettydoc .ace_definition  {color: #B9E;}
        .ace-prettydoc .ace_important   {color: #F33;}
        .ace-prettydoc .ace_question    {color: #69C;}
        .ace-prettydoc .ace_cmdquote    {color: #FFD; font-style: italic;}
        .ace-prettydoc .ace_taskunstart {color: #BBB; font-weight: 400;}
        .ace-prettydoc .ace_taskongoing {color: #FF8; font-weight: 400;}
        .ace-prettydoc .ace_taskexecutd {color: #777; font-weight: 400;}
        .ace-prettydoc .ace_wemail      {color: #6CA; text-decoration: underline;}
        .ace-prettydoc .ace_wperson     {color: #3CE; text-decoration: underline;}
        .ace-prettydoc .ace_whashtag    {color: #9C9; text-decoration: underline;}
        .ace-prettydoc .ace_link        {color: #AAA; text-decoration: underline;}
        .ace-prettydoc .ace_endsect     {color: #CF6A4C; font-weight: 600;}
    }`;

    const dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
