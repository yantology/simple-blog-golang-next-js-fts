import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HomeAsideProps {
  categories: string[];
  stateCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (search: string) => void;
}

export default function HomeAside({
  categories,
  stateCategory,
  onCategoryChange,
  onSearch,
}: HomeAsideProps) {
  return (
    <aside className="md:col-span-1 bg-background p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="relative mb-6 rounded-lg shadow-sm ">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={stateCategory === category ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </aside>
  );
}
