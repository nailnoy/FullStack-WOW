import React, { createRef } from "react";
import styled from "styled-components";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import { Row, Button } from "antd";

// code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

function PostEditor(props) {
    const editorRef = createRef();

    const onChangeEditorTextHandler = () => {
        console.log(editorRef.current.getInstance().getMarkdown());
    }
    return (
        <>
            <Editor
                previewStyle="vertical"
                height="79vh"
                initialEditType="markdown"
                initialValue="더 건강한 내일을 위해 함께해요."
                ref={editorRef}
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                onChange={onChangeEditorTextHandler}
            />
            <ButtonRow>
                <FilledBtn type="summit" >작성</FilledBtn>
                <UnfilledBtn type="button" >
                    취소
                </UnfilledBtn>
            </ButtonRow>
        </>
    )
}

export default PostEditor;


const ButtonRow = styled(Row)`
	margin-top: 30px;
	display: flex;
	justify-content: center;
  gap: 50px;
`;

const FilledBtn = styled(Button)`
	& {
		color: #ffffff;
		background-color: #1890ff;;
		border: none;
		border-radius: 6px;
		outline: none;
    cursor: pointer;
	}
`;

const UnfilledBtn = styled(Button)`
	& {
		color: #1890ff;;
		background-color: #ffffff;
		border: 2px solid #1890ff;;
		border-radius: 6px;
    cursor: pointer;
	}
`;
