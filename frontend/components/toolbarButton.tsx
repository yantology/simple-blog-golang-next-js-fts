import { ToolbarButtonProps } from "@/type/markdown_editor";
import React from "react";

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  title,
  icon: Icon,
}) => (
  <button
    className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors"
    title={title}
    onClick={onClick}
    type="button"
  >
    <Icon size={18} className="sm:w-5 sm:h-5" />
  </button>
);
