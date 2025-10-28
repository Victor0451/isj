import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    const { getDescrip, placeholder, val } = this.props;

    return (
      <div>
        <Editor
          placeholder={placeholder}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          onChange={() => {
            getDescrip(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
          }}
        />
      </div>
    );
  }
}
export default EditorConvertToHTML;
