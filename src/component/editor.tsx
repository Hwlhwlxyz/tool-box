import React, { useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor(props: any) {
  function onChange(currentValue: string) {
    console.log(currentValue)
    if (props.onChange) {
      props.onChange(currentValue);
    }
  }

  // Render editor
  return (
    <AceEditor
      value={props.text || ""}
      mode="json"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ useWorker: false }}
    />
  );
}
