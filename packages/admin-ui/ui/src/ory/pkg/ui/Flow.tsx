import React, { useState, useEffect, FormEvent, MouseEvent } from "react";
import { Messages } from "./Messages";
import { isUiNodeInputAttributes, getNodeId } from "../typeGuards";
import { Node } from "./Node";
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
} from "@ory/client";

type Values = Partial<
    | UpdateLoginFlowBody
    | UpdateRegistrationFlowBody
    | UpdateRecoveryFlowBody
    | UpdateSettingsFlowBody
    | UpdateVerificationFlowBody
>;

type Methods =
    | "oidc"
    | "password"
    | "profile"
    | "totp"
    | "webauthn"
    | "passkey"
    | "link"
    | "lookup_secret";

type Props<T> = {
  flow?:
      | LoginFlow
      | RegistrationFlow
      | SettingsFlow
      | VerificationFlow
      | RecoveryFlow;
  only?: Methods;
  onSubmit: (values: T) => Promise<void>;
  hideGlobalMessages?: boolean;
};

const emptyState = <T extends Values>() => ({} as T);

type State<T> = {
  values: T;
  isLoading: boolean;
};

export const Flow: React.FC<Props<Values>> = (props) => {
  const [state, setState] = useState<State<Values>>({
    values: emptyState(),
    isLoading: false,
  });

  useEffect(() => {
    initializeValues(filterNodes());
  }, [props.flow]);

  const initializeValues = (nodes: Array<UiNode> = []) => {
    const values = emptyState<Values>();
    nodes.forEach((node) => {
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
            node.attributes.type === "button" ||
            node.attributes.type === "submit"
        ) {
          return;
        }
        values[node.attributes.name as keyof Values] =
            node.attributes.value;
      }
    });
    setState((prevState) => ({ ...prevState, values }));
  };

  const filterNodes = (): Array<UiNode> => {
    const { flow, only } = props;
    if (!flow) {
      return [];
    }
    return flow.ui.nodes.filter(({ group }) => {
      if (!only) {
        return true;
      }
      return group === "default" || group === only;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (state.isLoading) {
      return Promise.resolve();
    }

    const form = event.currentTarget;
    let body: Values | undefined;

    if (form && form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      body = Object.fromEntries(formData) as Values;

      const hasSubmitter = (
          evt: any
      ): evt is { submitter: HTMLInputElement } => "submitter" in evt;

      if (hasSubmitter(event.nativeEvent)) {
        const method = event.nativeEvent.submitter;
        body = {
          ...body,
          ...{ [method.name]: method.value },
        };
      }
    }

    setState((prevState) => ({ ...prevState, isLoading: true }));

    return props.onSubmit({ ...body, ...state.values }).finally(() => {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }, 50);
    });
  };

  const { hideGlobalMessages, flow } = props;
  const { values, isLoading } = state;
  const nodes = filterNodes();

  if (!flow) {
    return null;
  }

  return (
      <form action={flow.ui.action} method={flow.ui.method} onSubmit={handleSubmit}>
        {!hideGlobalMessages ? <Messages messages={flow.ui.messages} /> : null}
        {nodes.map((node, k) => {
          const id = getNodeId(node) as keyof Values;
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
                        }));
                        resolve();
                      })
                  }
              />
          );
        })}
      </form>
  );
};












// import {
//   LoginFlow,
//   RecoveryFlow,
//   RegistrationFlow,
//   SettingsFlow,
//   UiNode,
//   UpdateLoginFlowBody,
//   UpdateRecoveryFlowBody,
//   UpdateRegistrationFlowBody,
//   UpdateSettingsFlowBody,
//   UpdateVerificationFlowBody,
//   VerificationFlow,
// } from "@ory/client"
// // import { getNodeId, isUiNodeInputAttributes } from "@ory/integrations/ui"
// import { Component, FormEvent, MouseEvent } from "react"
//
// import { Messages } from "./Messages"
// import {isUiNodeInputAttributes, getNodeId} from "../typeGuards";
// import { Node } from "./Node"
//
// export type Values = Partial<
//   | UpdateLoginFlowBody
//   | UpdateRegistrationFlowBody
//   | UpdateRecoveryFlowBody
//   | UpdateSettingsFlowBody
//   | UpdateVerificationFlowBody
// >
//
// export type Methods =
//   | "oidc"
//   | "password"
//   | "profile"
//   | "totp"
//   | "webauthn"
//   | "passkey"
//   | "link"
//   | "lookup_secret"
//
// export type Props<T> = {
//   // The flow
//   flow?:
//     | LoginFlow
//     | RegistrationFlow
//     | SettingsFlow
//     | VerificationFlow
//     | RecoveryFlow
//   // Only show certain nodes. We will always render the default nodes for CSRF tokens.
//   only?: Methods
//   // Is triggered on submission
//   onSubmit: (values: T) => Promise<void>
//   // Do not show the global messages. Useful when rendering them elsewhere.
//   hideGlobalMessages?: boolean
// }
//
// function emptyState<T>() {
//   return {} as T
// }
//
// type State<T> = {
//   values: T
//   isLoading: boolean
// }
//
// export class Flow<T extends Values> extends Component<Props<T>, State<T>> {
//   constructor(props: Props<T>) {
//     super(props)
//     this.state = {
//       values: emptyState(),
//       isLoading: false,
//     }
//   }
//
//   componentDidMount() {
//     this.initializeValues(this.filterNodes())
//   }
//
//   componentDidUpdate(prevProps: Props<T>) {
//     if (prevProps.flow !== this.props.flow) {
//       // Flow has changed, reload the values!
//       this.initializeValues(this.filterNodes())
//     }
//   }
//
//   initializeValues = (nodes: Array<UiNode> = []) => {
//     // Compute the values
//     const values = emptyState<T>()
//     nodes.forEach((node) => {
//       // This only makes sense for text nodes
//       if (isUiNodeInputAttributes(node.attributes)) {
//         if (
//           node.attributes.type === "button" ||
//           node.attributes.type === "submit"
//         ) {
//           // In order to mimic real HTML forms, we need to skip setting the value
//           // for buttons as the button value will (in normal HTML forms) only trigger
//           // if the user clicks it.
//           return
//         }
//         values[node.attributes.name as keyof Values] = node.attributes.value
//       }
//     })
//
//     // Set all the values!
//     this.setState((state) => ({ ...state, values }))
//   }
//
//   filterNodes = (): Array<UiNode> => {
//     const { flow, only } = this.props
//     if (!flow) {
//       return []
//     }
//     return flow.ui.nodes.filter(({ group }) => {
//       if (!only) {
//         return true
//       }
//       return group === "default" || group === only
//     })
//   }
//
//   // Handles form submission
//   handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent) => {
//     // Prevent all native handlers
//     event.stopPropagation()
//     event.preventDefault()
//
//     // Prevent double submission!
//     if (this.state.isLoading) {
//       return Promise.resolve()
//     }
//
//     const form = event.currentTarget
//
//     let body: T | undefined
//
//     if (form && form instanceof HTMLFormElement) {
//       const formData = new FormData(form)
//
//       // map the entire form data to JSON for the request body
//       body = Object.fromEntries(formData) as T
//
//       const hasSubmitter = (evt: any): evt is { submitter: HTMLInputElement } =>
//         "submitter" in evt
//
//       // We need the method specified from the name and value of the submit button.
//       // when multiple submit buttons are present, the clicked one's value is used.
//       if (hasSubmitter(event.nativeEvent)) {
//         const method = event.nativeEvent.submitter
//         body = {
//           ...body,
//           ...{ [method.name]: method.value },
//         }
//       }
//     }
//
//     this.setState((state) => ({
//       ...state,
//       isLoading: true,
//     }))
//
//     return this.props
//       .onSubmit({ ...body, ...this.state.values })
//       .finally(() => {
//         // We wait for reconciliation and update the state after 50ms
//         // Done submitting - update loading status
//         this.setState((state) => ({
//           ...state,
//           isLoading: false,
//         }))
//       })
//   }
//
//   render() {
//     const { hideGlobalMessages, flow } = this.props
//     const { values, isLoading } = this.state
//
//     // Filter the nodes - only show the ones we want
//     const nodes = this.filterNodes()
//
//     if (!flow) {
//       // No flow was set yet? It's probably still loading...
//       //
//       // Nodes have only one element? It is probably just the CSRF Token
//       // and the filter did not match any elements!
//       return null
//     }
//
//     return (
//       <form
//         action={flow.ui.action}
//         method={flow.ui.method}
//         onSubmit={this.handleSubmit}
//       >
//         {!hideGlobalMessages ? <Messages messages={flow.ui.messages} /> : null}
//         {nodes.map((node, k) => {
//           const id = getNodeId(node) as keyof Values
//           return (
//             <Node
//               key={`${id}-${k}`}
//               disabled={isLoading}
//               node={node}
//               value={values[id]}
//               dispatchSubmit={this.handleSubmit}
//               setValue={(value) =>
//                 new Promise((resolve) => {
//                   this.setState(
//                     (state) => ({
//                       ...state,
//                       values: {
//                         ...state.values,
//                         [getNodeId(node)]: value,
//                       },
//                     }),
//                     resolve,
//                   )
//                 })
//               }
//             />
//           )
//         })}
//       </form>
//     )
//   }
// }