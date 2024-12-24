interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function LoadMoreButton({
  onClick,
  isLoading,
}: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <button
          onClick={onClick}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Load More
        </button>
      )}
    </div>
  );
}
