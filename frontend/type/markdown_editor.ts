// types.ts
export interface SelectionInfo {
  start: number;
  end: number;
  selectedText: string;
}

export type FormatType =
  | "bold"
  | "italic"
  | "numberedList"
  | "bulletList"
  | "link";

export interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
