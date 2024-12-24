"use client";

import { useEditor } from "@/hooks/useEditor";
import { useState } from "react";
import { EditorToolbar } from "./markdown_editor_toolbar";

export default function MarkdownEditor() {
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);
  const { textareaRef, adjustHeight, formatText } = useEditor();

  return (
    <div className="relative">
      <EditorToolbar
        onFormat={formatText}
        isToolbarExpanded={isToolbarExpanded}
        setIsToolbarExpanded={setIsToolbarExpanded}
      />

      <textarea
        ref={textareaRef}
        name="editor"
        id="editor"
        className="w-full border rounded-lg p-2 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
        placeholder="Tulis konten anda di sini..."
        onChange={adjustHeight}
        rows={1}
      />
    </div>
  );
}
