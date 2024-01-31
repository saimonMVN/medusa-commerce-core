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
// import { getNodeId, isUiNodeInputAttributes } from "@ory/integrations/ui"
import {Component, FormEvent, MouseEvent, useState} from "react"

import { Messages } from "./Messages"
import {isUiNodeInputAttributes, getNodeId} from "../typeGuards";
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

const Flow = <T extends Values>({ flow, only, onSubmit, hideGlobalMessages }: Props<T>) => {

  const [state, setState] = useState<State<T>>({values: {} as T, isLoading: false})


  const initializeValues = (nodes: Array<UiNode> = []) => {
    // Compute the values
    const values = emptyState<T>()

    nodes.forEach((node) => {
      // This only makes sense for text nodes
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === "button" ||
          node.attributes.type === "submit"
        ) {
          // In order to mimic real HTML forms, we need to skip setting the value
          // for buttons as the button value will (in normal HTML forms) only trigger
          // if the user clicks it.
          return
        }
        values[node.attributes.name as keyof Values] = node.attributes.value
      }
    })

    // Set all the values!
    setState((state) => ({ ...state, values }))
  }



  // if (prevProps.flow !== this.props.flow) {
  //   // Flow has changed, reload the values!
  //   this.initializeValues(this.filterNodes())
  // }

  const filterNodes = (): Array<UiNode> => {
    // const { flow, only } = this.props
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

  initializeValues(filterNodes())

  // Handles form submission
  const handleSubmit = async(event: FormEvent<HTMLFormElement> | MouseEvent) => {
    // Prevent all native handlers
    event.stopPropagation()
    event.preventDefault()

    // Prevent double submission!
    if (state.isLoading) {
      return Promise.resolve()
    }

    const form = event.currentTarget

    let body: T | undefined

    if (form && form instanceof HTMLFormElement) {
      const formData = new FormData(form)

      // map the entire form data to JSON for the request body
      body = Object.fromEntries(formData) as T

      const hasSubmitter = (evt: any): evt is { submitter: HTMLInputElement } =>
        "submitter" in evt

      // We need the method specified from the name and value of the submit button.
      // when multiple submit buttons are present, the clicked one's value is used.
      if (hasSubmitter(event.nativeEvent)) {
        const method = event.nativeEvent.submitter
        body = {
          ...body,
          ...{ [method.name]: method.value },
        }
      }
    }

    setState((state) => ({
      ...state,
      isLoading: true,
    }))

    return onSubmit({ ...body, ...state.values })
      .finally(() => {
        // We wait for reconciliation and update the state after 50ms
        // Done submitting - update loading status
        setState((state) => ({
          ...state,
          isLoading: false,
        }))
      })
  }


    // const { hideGlobalMessages, flow } = this.props
    const { values, isLoading } = state

    // Filter the nodes - only show the ones we want
    const nodes = filterNodes()

    if (!flow) {
      // No flow was set yet? It's probably still loading...
      //
      // Nodes have only one element? It is probably just the CSRF Token
      // and the filter did not match any elements!
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
                  setState(
                    (state) => ({
                      ...state,
                      values: {
                        ...state.values,
                        [getNodeId(node)]: value,
                      },
                    }),
                    // resolve(),
                  )
                })
              }
            />
          )
        })}
      </form>
    )

}

