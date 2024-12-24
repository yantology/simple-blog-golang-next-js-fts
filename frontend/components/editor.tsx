import React from "react";
import type { Selection } from "../types";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (selection: Selection) => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  onSelect,
}) => {
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    onSelect({
      start: target.selectionStart,
      end: target.selectionEnd,
    });
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSelect={handleSelect}
      className="w-full min-h-96 p-2 font-mono text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
