import TextInput from "../customized-components/TextInput"
import { NodeInputProps } from "./helpers"
import clsx from "clsx"
import React from "react"

export function NodeInputDefault<T>(props: NodeInputProps) {
  const { node, attributes, value = "", setValue, disabled } = props

  const onClick = () => {
    if (attributes.onclick) {
      const run = new Function(attributes.onclick)
      run()
    }
  }
console.log(node.meta,"{node.meta")
  // Render a generic text input field.
  return (
    <>
      {node.meta.label?.text && (
        <div className="text-left">{node.meta.label?.text}</div>
      )}
      <div
      >
        <TextInput
            className={clsx(
                "rounded-rounded h-[40px]  overflow-hidden border",
                "bg-grey-5 inter-base-regular placeholder:text-grey-40",
                "focus-within:shadow-input focus-within:border-violet-60",
                "flex items-center mb-3"
            )}
          title={node.meta.label?.text}
          onClick={onClick}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
          }}
          type={attributes.type}
          name={attributes.name}
          value={value}
          disabled={attributes.disabled || disabled}
          // help={node.messages.length > 0}
          state={
            node.messages.find(({ type }) => type === "error")
              ? "error"
              : undefined
          }
          subtitle={
            <>
              {node.messages.map(({ text, id }, k) => (
                <span className={"text-red-500 "} key={`${id}-${k}`} data-testid={`ui/message/${id}`}>
                  {text}
                </span>
              ))}
            </>
          }
        />
      </div>
    </>
  )
}
