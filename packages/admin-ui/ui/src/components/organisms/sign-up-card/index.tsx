import { useAdminLogin } from "medusa-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useWidgets } from "../../../providers/widget-provider"
import { useTranslation } from "react-i18next"
import WidgetContainer from "../../extensions/widget-container"
import Button from "../../fundamentals/button"
import Logo from "../../atoms/logo"
import GmailIcon from "../../fundamentals/icons/gmail-icon"
import PhoneIcon from "../../fundamentals/icons/phone-icon"
import SigninInput from "../../molecules/input-signin"
import InputError from "../../atoms/input-error"
import { LoginFlow, UpdateLoginFlowBody} from "@ory/client";
import {ActionCard, CenterLink, Flow, LogoutLink, MarginCard} from "../../../ory/pkg";


type FormValues = {
    email: string
    password: string
}

type LoginCardProps = {
    toResetPassword: () => void
}

const LoginCard = ({ toResetPassword }: LoginCardProps) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormValues>()
    const navigate = useNavigate()
    const { mutate, isLoading } = useAdminLogin()
    const { t } = useTranslation()
    const { getWidgets } = useWidgets()
    const [flow, setFlow] = useState<LoginFlow | undefined>();

    const queryParams = new URLSearchParams(location.search);

    // Simulate useRouter functionality
    const returnTo = queryParams.get('return_to');
    const flowId = queryParams.get('flow');
    const refresh = queryParams.get('refresh');
    const aal = queryParams.get('aal');

    const onLogout = LogoutLink([aal, refresh])

    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!location || flow) {
            return
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory
                .getLoginFlow({ id: String(flowId) })
                .then(({ data }) => {
                    setFlow(data)
                })
                .catch(handleGetFlowError(history, "login", setFlow))
            return
        }

        // Otherwise we initialize it
        ory
            .createBrowserLoginFlow({
                refresh: Boolean(refresh),
                aal: aal ? String(aal) : undefined,
                returnTo: returnTo ? String(returnTo) : undefined,
            })
            .then(({ data }) => {
                setFlow(data)
            })
            .catch(handleFlowError(history, "login", setFlow))
    }, [flowId, history, location, aal, refresh, returnTo, flow])
    // }, [])

    const onSubmit = (values: UpdateLoginFlowBody) =>{

        console.log(values)
        history
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(`/auth-admin/login?flow=${flow?.id}`, { shallow: true })

        ory
            .updateLoginFlow({
                flow: String(flow?.id),
                updateLoginFlowBody: values,
            })
            // We logged in successfully! Let's bring the user home.
            .then(() => {
                if (flow?.return_to) {
                    window.location.href = flow?.return_to
                    return
                }
                history.push("/")
            })
            .then(() => {})
            .catch(handleFlowError(history, "login", setFlow))
            .catch((err: AxiosError) => {
                // If the previous handler did not catch the error it's most likely a form validation error
                if (err.response?.status === 400) {
                    // Yup, it is!
                    setFlow(err.response?.data)
                    return
                }

                return Promise.reject(err)
            })
    }

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: () => {
                navigate("/a/orders")
            },
            onError: () => {
                setError(
                    "password",
                    {
                        type: "manual",
                        message: t(
                            "login-card-no-match",
                            "These credentials do not match our records."
                        ),
                    },
                    {
                        shouldFocus: true,
                    }
                )
            },
        })
    }

    return (
        <div className="flex w-full flex-1 flex-wrap items-center justify-center px-11 text-center">
            {/* <div className="relative flex flex-col m-6 space-y-8 bg-white  md:flex-row md:space-y-0"></div>    */}
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

            <div className="flex flex-col justify-center p-9">
                <div className="mb-1 py-10 ">
                    <Logo
                        className="float-left h-16 w-32 bg-slate-800 "
                        imageUrl={"logo"}
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
                <div className="py-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-center">
                            <div className="py-5">
                                <SigninInput
                                    placeholder={t("login-card-email", "Email")}
                                    {...register("email", { required: true })}
                                    autoComplete="email"
                                    className="mb-small w-full py-3"
                                />
                                <SigninInput
                                    placeholder={t("login-card-password", "Password")}
                                    type={"password"}
                                    {...register("password", { required: true })}
                                    autoComplete="current-password"
                                    className="mb-xsmall w-full py-3"
                                />

                                <SigninInput
                                    placeholder={t("sign-card-shop-name", "Shop Name")}
                                    type={"password"}
                                    {...register("password", { required: true })}
                                    autoComplete="current-password"
                                    className="mb-xsmall w-full py-3"
                                />
                            </div>
                            <InputError errors={errors} name="password" />
                            <Button
                                variant="primary"
                                size="small"
                                type="button"
                                className="focus:shadow-outline bg-black flex w-full items-center text-large justify-center rounded-lg  py-5 font-bold text-white shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                                loading={isLoading}
                            >
                                Sign In
                            </Button>
                            <span
                                className="inter-small-regular text-grey-50 mt-8 cursor-pointer"
                                onClick={toResetPassword}
                            >
                {t("login-card-forgot-your-password", "Forgot your password?")}
              </span>
                        </div>
                    </form>
                </div>

                <div className="my-1   border-b text-center">
                    <div className="inline-block translate-y-1/2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide text-gray-600">
                        or
                    </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-2 py-4">
                    <div className="py-2">
                        <Button
                            variant="primary"
                            size="small"
                            type="button"
                            className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-3 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                        >
                            <div className="rounded-full bg-white p-2">
                                <GmailIcon size={20} />
                            </div>
                        </Button>
                    </div>
                    <div className="py-2">
                        <Button
                            variant="primary"
                            size="small"
                            type="button"
                            className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-3 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                        >
                            <div className="rounded-full bg-white p-2">
                                <PhoneIcon size={20} />
                            </div>
                        </Button>
                    </div>
                    <div className="py-2">
                        <Button
                            variant="primary"
                            size="small"
                            type="button"
                            className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-gray-200  py-3 font-bold text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                        >
                            <div className="rounded-full bg-white p-2">
                                <GmailIcon size={20} />
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="py-4">
                    <p className="text-center">
                        {t(
                            "singup-card-singup-in-to-already-moveshop",
                            "Already have a MoveShop? "
                        )}
                        <span className="text-grey-90 ml-1 font-bold">Sign In</span>
                    </p>
                </div>

                <div className="py-10">
                    <p className="text-left">
                        {t(
                            "singup-card-singup-in-to-already-terms-conditions",
                            "By proceeding, you agree to the Terms and Conditions and Privacy Policy"
                        )}
                    </p>
                </div>
            </div>
            <div className="relative ml-16 flex h-full w-[600px] flex-col">
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

export default LoginCard
