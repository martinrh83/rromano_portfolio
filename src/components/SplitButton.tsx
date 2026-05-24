import { type ReactNode } from "react";

interface SplitButtonBaseProps {
  label: string;
  icon?: ReactNode;
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
  type?: never;
  onClick?: never;
}

type SplitButtonProps = SplitButtonAsButton | SplitButtonAsAnchor;

const inner = (label: string, icon: ReactNode, loading: boolean, loadingLabel?: string) => (
  <>
    <span className="split-btn-label">
      {loading && loadingLabel ? loadingLabel : label}
    </span>
    <span className="split-btn-divider" aria-hidden="true" />
    <span className="split-btn-arrow" aria-hidden="true">{icon ?? "→"}</span>
  </>
);

export function SplitButton(props: SplitButtonProps) {
  const { label, icon, loading = false, loadingLabel } = props;

  if (props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className="split-btn"
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
      className="split-btn"
    >
      {inner(label, icon, loading, loadingLabel)}
    </button>
  );
}
