import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import './code-editor.css';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValues?: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValues, onChange }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  const onClickFormat = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        singleQuote: true,
        semi: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onClickFormat}>
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValues}
        language="javascript"
        height="100%"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          scrollBeyondLastLine: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
