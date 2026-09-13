export function BoltMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-terracota-500 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none">
        <path
          d="M13.2 2 4.5 13.6a.9.9 0 0 0 .72 1.44h4.2l-1.1 6.8a.6.6 0 0 0 1.07.46l9.06-11.9a.9.9 0 0 0-.72-1.44h-4.2l1.1-6.55A.6.6 0 0 0 13.2 2Z"
          fill="#FBF3EA"
        />
      </svg>
    </span>
  );
}
