import { useId } from "react";

/**
 * Flag of the People's Republic of China at its official 3:2 ratio,
 * drawn to the construction sheet so it stays crisp at any size.
 */
export function ChinaFlag({ className, label }: { className?: string; label: string }) {
  const starId = useId();

  return (
    <svg viewBox="0 0 30 20" role="img" aria-label={label} className={className}>
      <defs>
        <path
          id={starId}
          fill="#FFDE00"
          d="M0,-1 0.587785,0.809017 -0.951057,-0.309017H0.951057L-0.587785,0.809017z"
        />
      </defs>
      <rect width="30" height="20" fill="#DE2910" />
      <use href={`#${starId}`} transform="translate(5,5) scale(3)" />
      <use href={`#${starId}`} transform="translate(10,2) rotate(23.036243)" />
      <use href={`#${starId}`} transform="translate(12,4) rotate(45.869898)" />
      <use href={`#${starId}`} transform="translate(12,7) rotate(69.945396)" />
      <use href={`#${starId}`} transform="translate(10,9) rotate(20.659808)" />
    </svg>
  );
}
