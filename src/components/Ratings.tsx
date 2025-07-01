import { useState } from "react";

export default function Ratings({
  userRating,
  setUserRating,
}: {
  userRating: null | number;
  setUserRating: (value: null | number) => void;
}) {
  const [temp, setTemp] = useState<number | null>(null);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Stars
          key={i}
          onClick={() => setUserRating(i)}
          fill={
            userRating != null
              ? userRating >= i
              : temp != null
              ? temp >= i
              : false
          }
          onMouseEnter={() => {
            setTemp(i);
            setUserRating(null);
          }}
          onMouseLeave={() => setTemp(null)}
        />
      ))}
    </div>
  );
}

type starsType = {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  fill: boolean;
};

function Stars({ onClick, fill, onMouseEnter, onMouseLeave }: starsType) {
  return (
    <span
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: "3rem",
        height: "2rem",
        cursor: "pointer",
      }}
    >
      {fill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#fbb91b"
          stroke="#fbb91b"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fbb91b"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
