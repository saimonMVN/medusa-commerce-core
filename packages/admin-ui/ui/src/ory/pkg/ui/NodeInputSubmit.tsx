import Button from "../../../components/fundamentals/button"
import { getNodeLabel } from "../typeGuards"

import { NodeInputProps } from "./helpers"

export function NodeInputSubmit<T>({
  node,
  attributes,
  disabled,
}: NodeInputProps) {
  return (
    <>
      <Button
        name={attributes.name}
        variant="primary"
        size="small"
        type="submit"
        value={attributes.value || ""}
        className="focus:shadow-outline text-large flex w-full items-center justify-center rounded-lg bg-black  py-3 font-bold text-white shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
        loading={attributes.disabled}
        disabled={attributes.disabled || disabled}
      >
        {getNodeLabel(node)}
      </Button>
    </>
  )
}
