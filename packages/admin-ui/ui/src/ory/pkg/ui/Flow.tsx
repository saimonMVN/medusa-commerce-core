import {
  LoginFlow,
  RecoveryFlow,
  RegistrationFlow,
  SettingsFlow,
  UiNode,
  UpdateLoginFlowBody,
  UpdateRecoveryFlowBody,
  UpdateRegistrationFlowBody,
  UpdateSettingsFlowBody,
  UpdateVerificationFlowBody,
  VerificationFlow,
} from "@ory/client"
import React, {
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react"

import { Messages } from "./Messages"
import { isUiNodeInputAttributes, getNodeId } from "../typeGuards"
import { Node } from "./Node"

export type Values = Partial<
  | UpdateLoginFlowBody
  | UpdateRegistrationFlowBody
  | UpdateRecoveryFlowBody
  | UpdateSettingsFlowBody
  | UpdateVerificationFlowBody
>

export type Methods =
  | "oidc"
  | "password"
  | "profile"
  | "totp"
  | "webauthn"
  | "passkey"
  | "link"
  | "lookup_secret"

export type Props<T> = {
  // The flow
  flow?:
    | LoginFlow
    | RegistrationFlow
    | SettingsFlow
    | VerificationFlow
    | RecoveryFlow
  // Only show certain nodes. We will always render the default nodes for CSRF tokens.
  only?: Methods
  // Is triggered on submission
  onSubmit: (values: T) => Promise<void>
  // Do not show the global messages. Useful when rendering them elsewhere.
  hideGlobalMessages?: boolean
}

function emptyState<T>() {
  return {} as T
}

type State<T> = {
  values: T
  isLoading: boolean
}

export const Flow: React.FC<Props<Values>> = (props) => {
  const [state, setState] = useState<State<Values>>({
    values: emptyState(),
    isLoading: false,
  })

  useEffect(() => {
    initializeValues(filterNodes())
  }, [props.flow])

  const initializeValues = (nodes: Array<UiNode> = []) => {
    const values = emptyState<Values>()
    nodes.forEach((node) => {
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === "button" ||
          node.attributes.type === "submit"
        ) {
          return
        }
        values[node.attributes.name as keyof Values] = node.attributes.value
      }
    })
    setState((prevState) => ({ ...prevState, values }))
  }

  const filterNodes = (): Array<UiNode> => {
    const { flow, only } = props
    if (!flow) {
      return []
    }
    return flow.ui.nodes.filter(({ group }) => {
      if (!only) {
        return true
      }
      return group === "default" || group === only
    })
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | MouseEvent
  ) => {
    event.stopPropagation()
    event.preventDefault()

    if (state.isLoading) {
      return Promise.resolve()
    }

    const form = event.currentTarget
    let body: Values | undefined

    if (form && form instanceof HTMLFormElement) {
      const formData = new FormData(form)
      body = Object.fromEntries(formData) as Values

      const hasSubmitter = (evt: any): evt is { submitter: HTMLInputElement } =>
        "submitter" in evt

      if (hasSubmitter(event.nativeEvent)) {
        const method = event.nativeEvent.submitter
        body = {
          ...body,
          ...{ [method.name]: method.value },
        }
      }
    }

    setState((prevState) => ({ ...prevState, isLoading: true }))

    try {
      return await props.onSubmit({ ...body, ...state.values })
    } finally {
      setTimeout(() => {
        setState((prevState_1) => ({
          ...prevState_1,
          isLoading: false,
        }))
      }, 50)
    }
  }

  const { hideGlobalMessages, flow } = props
  const { values, isLoading } = state
  const nodes = filterNodes()

  if (!flow) {
    return null
  }

  return (
    <form
      action={flow.ui.action}
      method={flow.ui.method}
      onSubmit={handleSubmit}
    >
      {!hideGlobalMessages ? <Messages messages={flow.ui.messages} /> : null}
      {nodes.map((node, k) => {
        const id = getNodeId(node) as keyof Values
        return (
          <Node
            key={`${id}-${k}`}
            disabled={isLoading}
            node={node}
            value={values[id]}
            dispatchSubmit={handleSubmit}
            setValue={(value) =>
              new Promise((resolve) => {
                setState((prevState) => ({
                  ...prevState,
                  values: {
                    ...prevState.values,
                    [getNodeId(node)]: value,
                  },
                }))
                resolve()
              })
            }
          />
        )
      })}
    </form>
  )
}