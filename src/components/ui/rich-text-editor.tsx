"use client";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: placeholder || "Write something...",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link"],
        ["clean"],
      ],
    },
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "align",
      "blockquote",
      "code-block",
      "link",
    ],
  });

  // Keep editor content in sync
  useEffect(() => {
    if (quill) {
      // Set initial content correctly
      if (quill.root.innerHTML !== value) {
        quill.clipboard.dangerouslyPasteHTML(value || "");
      }
      
      const handler = () => {
        onChange(quill.root.innerHTML);
      };
      
      quill.on("text-change", handler);
      
      // Cleanup
      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill, value, onChange]);

  return (
    <div className={`rich-text-editor ${className || ""}`}>
      <div ref={quillRef} style={{ direction: 'ltr' }} />
      <style>{`
        .rich-text-editor .ql-editor {
          min-height: 200px;
          font-family: inherit;
          text-align: left;
          direction: ltr;
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid hsl(var(--border));
          border-left: 1px solid hsl(var(--border));
          border-right: 1px solid hsl(var(--border));
          border-radius: 0.375rem 0.375rem 0 0;
          background: hsl(var(--background));
          direction: ltr;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid hsl(var(--border));
          border-left: 1px solid hsl(var(--border));
          border-right: 1px solid hsl(var(--border));
          border-radius: 0 0 0.375rem 0.375rem;
          direction: ltr;
        }
        .rich-text-editor .ql-editor {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
}