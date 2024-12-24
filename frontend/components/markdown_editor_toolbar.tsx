import {
  Bold,
  Italic,
  ListOrdered,
  List,
  Link,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { ToolbarButton } from "./toolbarButton";
import { FormatType } from "@/type/markdown_editor";
import { ToolbarDivider } from "./toolbar_divider";

interface EditorToolbarProps {
  onFormat: (format: FormatType) => void;
  isToolbarExpanded: boolean;
  setIsToolbarExpanded: (value: boolean) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onFormat,
  isToolbarExpanded,
  setIsToolbarExpanded,
}) => {
  return (
    <div className="relative mb-2">
      <div className="flex flex-col sm:flex-row border rounded-lg">
        <div className="flex items-center justify-between sm:justify-start gap-0.5 sm:gap-2 p-1.5 sm:p-2">
          <div className="flex items-center gap-0.5 sm:gap-2">
            <ToolbarButton
              title="Bold"
              icon={Bold}
              onClick={() => onFormat("bold")}
            />
            <ToolbarButton
              title="Italic"
              icon={Italic}
              onClick={() => onFormat("italic")}
            />
          </div>

          <button
            className="sm:hidden p-1.5 hover:bg-gray-200 rounded-lg"
            onClick={() => setIsToolbarExpanded(!isToolbarExpanded)}
          >
            {isToolbarExpanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>

        <div
          className={`
            ${isToolbarExpanded ? "flex" : "hidden"}
            sm:flex
            flex-col sm:flex-row
            sm:items-center
            border-t sm:border-t-0
            sm:border-l
            border-gray-200
            p-1.5 sm:p-2
            gap-2
          `}
        >
          <div className="flex items-center gap-0.5 sm:gap-2">
            <ToolbarButton
              title="Numbered List"
              icon={ListOrdered}
              onClick={() => onFormat("numberedList")}
            />
            <ToolbarButton
              title="Bullet List"
              icon={List}
              onClick={() => onFormat("bulletList")}
            />
          </div>

          <ToolbarDivider />

          <div className="flex items-center gap-0.5 sm:gap-2">
            <ToolbarButton
              title="Insert Link"
              icon={Link}
              onClick={() => onFormat("link")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
