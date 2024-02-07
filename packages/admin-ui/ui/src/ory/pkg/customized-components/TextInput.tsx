import { InputHTMLAttributes, ReactNode, CSSProperties } from "react"
import clsx from "clsx"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  subtitle?: ReactNode
  helper?: ReactNode
  state?: string | undefined
}

const TextInput = ({
  className,
  title,
  subtitle,
  disabled,
  type = "text",
  onChange,
  value,
  ...props
}: TextInputProps) => {
  let state = props.state
  if (disabled) {
    state = "disabled"
  }

  return (
    <>
      <input
        className={clsx(
            className,
          "w-full bg-transparent p-1 outline-none outline-offset-0",
            state === "error"  && "border-red-500"
            )}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
        {...props}
      />
      {subtitle && <div className="mb-2">{subtitle}</div>}
    </>
  )
}

export default TextInput
