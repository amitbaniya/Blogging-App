'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { blogDataTypes } from "@/types";

type EditorProps = {
    content: string;
    setBlogData: Dispatch<SetStateAction<blogDataTypes>>
};
export default function ContentEditor({ content, setBlogData }: EditorProps) {

    function handleChange(value: string) {
        setBlogData(prev => ({ ...prev, content: value }))
    };

    return (<>

        <Editor
            value={content}
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onEditorChange={(value) => handleChange(value)}

            init={{
                height: '100%',
                resize: false,
                menubar: false,
                statusbar: false,
                plugins: [
                    'lists',
                    'link',
                    'code',
                    'table',
                    'wordcount'
                ],
                toolbar:
                    'undo redo | blocks | bold italic underline | ' +
                    'alignleft aligncenter alignright | ' +
                    'bullist numlist | link | code',
            }}
        />
    </>

    );
}