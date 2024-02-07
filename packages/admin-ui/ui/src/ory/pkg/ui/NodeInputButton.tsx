import {getNodeLabel} from "../typeGuards"
import {Button} from "@ory/themes"
import {callWebauthnFunction, NodeInputProps} from "./helpers"
import React from "react";

export function NodeInputButton<T>({ node, attributes, setValue, disabled, dispatchSubmit,}: NodeInputProps) {
    // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
    const onClick = (e: React.MouseEvent | React.FormEvent<HTMLFormElement>) => {
        if (attributes.onclick) {
            e.stopPropagation()
            e.preventDefault()
            callWebauthnFunction(attributes.onclick)
            return
        }

        setValue(attributes.value).then(() => dispatchSubmit(e))
    }

    return (
        <>
            <Button
                name={attributes.name}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onClick(e)
                }}
                value={attributes.value || ""}
                disabled={attributes.disabled || disabled}
            >
                {getNodeLabel(node)}
            </Button>
        </>
    )
}
