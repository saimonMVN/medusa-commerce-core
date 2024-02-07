import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useWidgets } from "../../../providers/widget-provider"
import { useTranslation } from "react-i18next"
import WidgetContainer from "../../extensions/widget-container"
import Button from "../../fundamentals/button"
import Logo from "../../atoms/logo"
import PhoneIcon from "../../fundamentals/icons/phone-icon"
import GmailIcon from "../../fundamentals/icons/gmail-icon"
import { LoginFlow, UpdateRegistrationFlowBody } from "@ory/client"
import {Flow, Values} from "../../../ory/pkg"
import ory from "../../../ory/pkg/sdk"
import { handleFlowError } from "../../../ory/pkg/errors"
import { useLocation } from "react-router-dom"

const SignUpCard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { getWidgets } = useWidgets()
  const [flow, setFlow] = useState<LoginFlow | undefined>()

  const queryParams = new URLSearchParams(location.search)

  // Simulate useRouter functionality
  const returnTo = queryParams.get("return_to")
  const flowId = queryParams.get("flow")
  const refresh = queryParams.get("refresh")
  const aal = queryParams.get("aal")

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!location || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getRegistrationFlow({ id: String(flowId) })
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data)
        })
        .catch(handleFlowError(navigate, "registration", setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .createBrowserRegistrationFlow({
        returnTo: returnTo ? String(returnTo) : undefined,
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(navigate, "registration", setFlow))
  }, [flowId, navigate, location, aal, refresh, returnTo, flow])

  const onSubmit = async (values:Partial<Values>): Promise<void> => {
    ory
      .updateRegistrationFlow({
        flow: flow?.id || "",
        updateRegistrationFlowBody: values as | UpdateRegistrationFlowBody,
      })
      .then(() => {
        navigate("/", { replace: true })
      })
      .catch((err: any) => {
        // handle the error
        if (err.response.status === 400) {
          // user input error
          // show the error messages in the UI
          setFlow(err.response.data)
        }
      })
    // highlight-end
  }

  return (
    <div className="flex w-full flex-1 flex-wrap items-center justify-center px-11 text-center">
      {getWidgets("login.before").map((w, i) => {
        return (
          <WidgetContainer
            key={i}
            widget={w}
            injectionZone="login.before"
            entity={undefined}
          />
        )
      })}


      <div className="flex flex-col justify-center p-5">
        <div className="mb-1 py-5 ">
          <Logo
            className="float-left h-16 w-32 bg-slate-800 "
            imageUrl={
              "https://workplace.moveon.com.bd/user-uploads/app-logo/fa689640c304f28232efc675f8546504.png"
            }
          />
        </div>
        <h1 className="text-grey-90 mb-1 text-left text-[32px]">
          {t("login-card-log-in-to-medusa", "Sign in to MoveShop")}
        </h1>
        <h3 className="text-left text-[16px] text-black">
          {t(
            "login-card-login-in-to-medusa",
            "One last step before starting your free trial."
          )}
        </h3>
        <div className="py-3">
          <Flow onSubmit={onSubmit} flow={flow}  />
        </div>

        <div className="my-3   border-b text-center">
          <div className="inline-block translate-y-1/2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide text-gray-600">
            or
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-2 py-1">
          <div className="">
            <Button
              variant="primary"
              size="small"
              type="button"
              className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-2 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
            >
              <div className="rounded-full bg-white p-2">
                <GmailIcon size={20} />
              </div>
            </Button>
          </div>
          <div className="">
            <Button
              variant="primary"
              size="small"
              type="button"
              className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-2 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
            >
              <div className="rounded-full bg-white p-2">
                <PhoneIcon size={20} />
              </div>
            </Button>
          </div>
          <div className="">
            <Button
              variant="primary"
              size="small"
              type="button"
              className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-2 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
            >
              <div className="rounded-full bg-white p-2">
                <GmailIcon size={20} />
              </div>
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-center">
            {t(
              "singup-card-singup-in-to-already-moveshop",
              "Already have a MoveShop? "
            )}

            <span className="text-grey-90 ml-1 font-bold">
              <Link to="/login">Sign In </Link>
            </span>
          </p>
        </div>

        <div className="py-4">
          <p className="text-left">
            {t(
              "singup-card-singup-in-to-already-terms-conditions",
              "By proceeding, you agree to the Terms and Conditions and Privacy Policy"
            )}
          </p>
        </div>
      </div>
      <div className="relative ml-16 flex h-full w-[400px] flex-col">
        <img
          src="https://iili.io/JakUN2f.png"
          alt="JakUN2f.png"
          className="h-full w-full object-cover"
        />
      </div>

      {getWidgets("login.after").map((w, i) => {
        return (
          <WidgetContainer
            key={i}
            widget={w}
            injectionZone="login.after"
            entity={undefined}
          />
        )
      })}
    </div>
  )
}

export default SignUpCard
