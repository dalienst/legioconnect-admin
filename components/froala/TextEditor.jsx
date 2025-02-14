"use client";
import React from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

function TextEditor({ value, onModelChange }) {
  return (
    <FroalaEditorComponent
      tag="textarea"
      model={value}
      onModelChange={onModelChange}
    />
  );
}

export default TextEditor;
