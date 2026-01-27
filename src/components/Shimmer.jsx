const Shimmer = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {Array(9)
        .fill("")
        .map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 animate-pulse">
            {/* Image */}
            <div className="h-40 bg-gray-300 rounded-lg" />

            {/* Title */}
            <div className="h-4 bg-gray-300 rounded mt-4 w-3/4" />

            {/* Subtitle */}
            <div className="h-3 bg-gray-300 rounded mt-2 w-1/2" />
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
