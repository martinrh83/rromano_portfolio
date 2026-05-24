interface SplitButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  onClick?: () => void;
}

export function SplitButton({
  label,
  type = "button",
  disabled = false,
  loading = false,
  loadingLabel,
  onClick,
}: SplitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="split-btn"
    >
      <span className="split-btn-label">
        {loading && loadingLabel ? loadingLabel : label}
      </span>
      <span className="split-btn-divider" aria-hidden="true" />
      <span className="split-btn-arrow" aria-hidden="true">→</span>
    </button>
  );
}
