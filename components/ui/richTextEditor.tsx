'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    minHeight?: string;
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
    ({ value = '', onChange, placeholder = 'Start typing...', className, disabled = false, minHeight = '150px' }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const [isActive, setIsActive] = useState({
            bold: false,
            italic: false,
            underline: false,
            insertUnorderedList: false,
            insertOrderedList: false,
            justifyLeft: false,
            justifyCenter: false,
            justifyRight: false,
        });

        // Initialize editor content
        useEffect(() => {
            if (editorRef.current && value !== editorRef.current.innerHTML) {
                editorRef.current.innerHTML = value;
            }
        }, [value]);

        // Update active states based on current selection
        const updateActiveStates = useCallback(() => {
            const newActiveStates = {
                bold: document.queryCommandState('bold'),
                italic: document.queryCommandState('italic'),
                underline: document.queryCommandState('underline'),
                insertUnorderedList: document.queryCommandState('insertUnorderedList'),
                insertOrderedList: document.queryCommandState('insertOrderedList'),
                justifyLeft: document.queryCommandState('justifyLeft'),
                justifyCenter: document.queryCommandState('justifyCenter'),
                justifyRight: document.queryCommandState('justifyRight'),
            };
            setIsActive(newActiveStates);
        }, []);

        // Handle content changes
        const handleInput = useCallback(() => {
            if (editorRef.current && onChange) {
                const content = editorRef.current.innerHTML;
                onChange(content);
            }
        }, [onChange]);

        // Handle selection changes
        const handleSelectionChange = useCallback(() => {
            updateActiveStates();
        }, [updateActiveStates]);

        // Execute formatting commands
        const executeCommand = useCallback((command: string, value?: string) => {
            if (disabled) return;

            document.execCommand(command, false, value);
            editorRef.current?.focus();
            updateActiveStates();
            handleInput();
        }, [disabled, updateActiveStates, handleInput]);

        // Handle link insertion
        const insertLink = useCallback(() => {
            if (disabled) return;

            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;

            const selectedText = selection.toString();
            const url = prompt('Enter URL:', 'https://');

            if (url) {
                if (selectedText) {
                    executeCommand('createLink', url);
                } else {
                    const linkText = prompt('Enter link text:', url);
                    if (linkText) {
                        const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
                        executeCommand('insertHTML', link);
                    }
                }
            }
        }, [disabled, executeCommand]);

        // Handle paste to clean up formatting
        const handlePaste = useCallback((e: React.ClipboardEvent) => {
            if (disabled) return;

            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            executeCommand('insertText', text);
        }, [disabled, executeCommand]);

        // Handle key commands
        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (disabled) return;

            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        executeCommand('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        executeCommand('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        executeCommand('underline');
                        break;
                }
            }
        }, [disabled, executeCommand]);

        useEffect(() => {
            document.addEventListener('selectionchange', handleSelectionChange);
            return () => {
                document.removeEventListener('selectionchange', handleSelectionChange);
            };
        }, [handleSelectionChange]);

        const toolbarButtons = [
            {
                command: 'bold',
                icon: Bold,
                title: 'Bold (Ctrl+B)',
                isActive: isActive.bold,
            },
            {
                command: 'italic',
                icon: Italic,
                title: 'Italic (Ctrl+I)',
                isActive: isActive.italic,
            },
            {
                command: 'underline',
                icon: Underline,
                title: 'Underline (Ctrl+U)',
                isActive: isActive.underline,
            },
            { divider: true },
            {
                command: 'insertUnorderedList',
                icon: List,
                title: 'Bullet List',
                isActive: isActive.insertUnorderedList,
            },
            {
                command: 'insertOrderedList',
                icon: ListOrdered,
                title: 'Numbered List',
                isActive: isActive.insertOrderedList,
            },
            { divider: true },
            {
                command: 'justifyLeft',
                icon: AlignLeft,
                title: 'Align Left',
                isActive: isActive.justifyLeft,
            },
            {
                command: 'justifyCenter',
                icon: AlignCenter,
                title: 'Align Center',
                isActive: isActive.justifyCenter,
            },
            {
                command: 'justifyRight',
                icon: AlignRight,
                title: 'Align Right',
                isActive: isActive.justifyRight,
            },
            { divider: true },
            {
                command: 'formatBlock',
                value: 'h3',
                icon: Type,
                title: 'Heading',
                isActive: false,
            },
            {
                command: 'formatBlock',
                value: 'blockquote',
                icon: Quote,
                title: 'Quote',
                isActive: false,
            },
            {
                command: 'insertLink',
                icon: Link,
                title: 'Insert Link',
                isActive: false,
                onClick: insertLink,
            },
        ];

        return (
            <div className={cn('border-1 border-primary rounded-md focus-within:ring-2 focus-within:ring-primary/80 focus-within:border-primary/80', className)}>
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-md">
                    {toolbarButtons.map((button, index) => {
                        if ('divider' in button) {
                            return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />;
                        }

                        const Icon = button.icon;
                        return (
                            <button
                                key={button.command + (button.value || '')}
                                type="button"
                                disabled={disabled}
                                title={button.title}
                                onClick={() => {
                                    if (button.onClick) {
                                        button.onClick();
                                    } else {
                                        executeCommand(button.command, button.value);
                                    }
                                }}
                                className={cn(
                                    'p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                                    button.isActive && 'bg-indigo-100 text-indigo-600'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                            </button>
                        );
                    })}
                </div>

                {/* Editor */}
                <div
                    ref={editorRef}
                    contentEditable={!disabled}
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        'p-3 outline-none prose prose-sm max-w-none',
                        'focus:ring-0 focus:outline-none',
                        disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
                    )}
                    style={{ minHeight }}
                    suppressContentEditableWarning={true}
                    data-placeholder={placeholder}
                />

                <style jsx>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
          
          [contenteditable] h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0.5rem 0;
          }
          
          [contenteditable] blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 0.5rem 0;
            font-style: italic;
            color: #6b7280;
          }
          
          [contenteditable] ul, [contenteditable] ol {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }
          
          [contenteditable] li {
            margin: 0.25rem 0;
          }
          
          [contenteditable] a {
            color: #3b82f6;
            text-decoration: underline;
          }
          
          [contenteditable] a:hover {
            color: #1d4ed8;
          }
        `}</style>
            </div>
        );
    }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor; 