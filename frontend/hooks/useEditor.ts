import { FormatType } from "@/type/markdown_editor";
import { useRef } from "react";

export const useEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${
        textarea.scrollHeight < 300 ? textarea.scrollHeight : 300
      }px`;
    }
  };

  const formatText = (format: FormatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let formattedText = "";
    const newStart = start;
    let newEnd = end;

    switch (format) {
      case "bold":
        formattedText = `${text.slice(0, start)}**${text.slice(
          start,
          end
        )}**${text.slice(end)}`;
        newEnd = end + 4;
        break;

      case "italic":
        formattedText = `${text.slice(0, start)}*${text.slice(
          start,
          end
        )}*${text.slice(end)}`;
        newEnd = end + 2;
        break;

      case "numberedList": {
        const selectedLines = text.slice(start, end).split("\n");
        const formattedLines = selectedLines.map((line, index) =>
          line.trim() ? `${index + 1}. ${line}` : line
        );
        formattedText = `${text.slice(0, start)}${formattedLines.join(
          "\n"
        )}${text.slice(end)}`;
        newEnd = start + formattedLines.join("\n").length;
        break;
      }

      case "bulletList": {
        const selectedLines = text.slice(start, end).split("\n");
        const formattedLines = selectedLines.map((line) =>
          line.trim() ? `- ${line}` : line
        );
        formattedText = `${text.slice(0, start)}${formattedLines.join(
          "\n"
        )}${text.slice(end)}`;
        newEnd = start + formattedLines.join("\n").length;
        break;
      }

      case "link": {
        const selectedText = text.slice(start, end) || "link text";
        formattedText = `${text.slice(
          0,
          start
        )}[${selectedText}](url)${text.slice(end)}`;
        newEnd = start + formattedText.length;
        break;
      }
    }

    textarea.value = formattedText;
    adjustHeight();
    textarea.focus();
    textarea.setSelectionRange(newStart, newEnd);
  };

  return {
    textareaRef,

    adjustHeight,

    formatText,
  };
};
