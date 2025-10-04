type StarRatingProps = {
  score: number;
};

const StarRating = ({ score }: StarRatingProps) => {
  return (
    <div className="flex items-center mt-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, starIndex) => {
          const full = starIndex + 1 <= Math.floor(score);
          const half = !full && starIndex < score;

          return (
            <span key={starIndex} className="relative text-gray-300 text-lg">
              ★
              {full && (
                <span className="absolute inset-0 text-yellow-400">★</span>
              )}
              {half && (
                <span className="absolute inset-0 text-yellow-400 overflow-hidden w-1/2 inline-block">
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>

      <span
        className="ml-2 text-sm text-black"
        style={{ fontFamily: "Avenir - Book - 14" }}
      >
        {score.toFixed(1)}/5
      </span>
    </div>
  );
};

export default StarRating;
