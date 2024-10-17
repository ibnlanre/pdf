import { ComponentProps } from "react";

interface ControlButtonProps extends ComponentProps<"button"> {
  label: string;
  icon: JSX.Element;
}

export function ControlButton({ icon, label, ...props }: ControlButtonProps) {
  return (
    <button
      {...props}
      className="react-pdf__Controls__button"
      aria-label={label}
      title={label}
      aria-disabled="false"
      role="button"
    >
      {icon}

      <style>{`          
        .react-pdf__Controls__button {
          vertical-align: middle;
          width: var(--react-pdf__button-width);
          height: var(--react-pdf__button-height);
          font-size: var(--react-pdf__button-icon-size);
          border-radius: var(--react-pdf__button-border-radius);
          border: var(--react-pdf__button-border);
          background: var(--react-pdf__button-background);
          color: var(--react-pdf__button-color);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          
          &:hover {
            background: color-mix(in srgb, var(--react-pdf__button-color) 20%, transparent);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: transparent;
          }
        }
      `}</style>
    </button>
  );
}
