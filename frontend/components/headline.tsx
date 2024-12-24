interface HeadlineComponentProps {
  title: string;
  subtitle: string;
}
export default function Headline({ title, subtitle }: HeadlineComponentProps) {
  return (
    <div id="title section" className="space-y-2">
      <h1 className="text-4xl font-bold text-gray-800 leading-none">{title}</h1>
      <p className="text-lg leading-relaxed ">{subtitle}</p>
    </div>
  );
}
