'use client'

import DOMPurify from 'isomorphic-dompurify';
import './blog.css'

export default function PurifiedContent({ content, short = false }: { content: string, short: boolean }) {
    return (
        <div
            className={short ? 'purified-short-content' : ''}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
            }}
        />
    )
}