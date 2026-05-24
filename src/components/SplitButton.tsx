import { type ReactNode } from "react";

type SplitButtonVariant = "solid" | "outline";

interface SplitButtonBaseProps {
  label: string;
  icon?: ReactNode;
  variant?: SplitButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
}

interface SplitButtonAsButton extends SplitButtonBaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface SplitButtonAsAnchor extends SplitButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  download?: string;
  type?: never;
  onClick?: never;
}

type SplitButtonProps = SplitButtonAsButton | SplitButtonAsAnchor;

const inner = (
  label: string,
  icon: ReactNode,
  loading: boolean,
  loadingLabel?: string,
) => (
  <>
    <span className="split-btn-label">
      {loading && loadingLabel ? loadingLabel : label}
    </span>
    <span className="split-btn-divider" aria-hidden="true" />
    <span className="split-btn-arrow" aria-hidden="true">
      {icon ?? "→"}
    </span>
  </>
);

export function SplitButton(props: SplitButtonProps) {
  const { label, icon, variant = "solid", loading = false, loadingLabel } =
    props;

  const className = `split-btn${variant === "outline" ? " split-btn-outline" : ""}`;

  if (props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        download={props.download}
        className={className}
      >
        {inner(label, icon, loading, loadingLabel)}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled || loading}
      onClick={props.onClick}
      className={className}
    >
      {inner(label, icon, loading, loadingLabel)}
    </button>
  );
}
