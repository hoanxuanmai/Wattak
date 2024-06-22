import {TextareaHTMLAttributes} from 'react';

export default function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        >
        </textarea>
    );
}
