import { useAdminLogin } from "medusa-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useWidgets } from "../../../providers/widget-provider"
import { useTranslation } from "react-i18next"
import WidgetContainer from "../../extensions/widget-container"
import Button from "../../fundamentals/button"
import Logo from "../../atoms/logo"
import SigninInput from "../../molecules/input-signin"
import InputError from "../../atoms/input-error"
import InputField from "../../molecules/input"
import Thumbnail from "../../atoms/thumbnail"

type FormValues = {
    email: string
    password: string
}



const OnboardingProfile = () => {

    const { t } = useTranslation()

    return (
        <div className="flex w-full flex-1 flex-wrap items-center justify-center text-center">
            <div className="flex flex-col justify-center">
                <div className="mb-8 flex justify-center">
                    <Logo
                        className="h-16 w-32 bg-slate-800 "
                        imageUrl={""}
                    />
                </div>

                <div className="mb-1 mt-14 py-10 flex justify-center relative">
                    <div>
                        <Thumbnail
                            className="h-52 w-52 bg-slate-300 rounded-full"
                            src={"https://i.postimg.cc/dDp5WjDZ/male-avatar-profile-picture-vector-10211761.jpg"}
                            size="large"
                        />
                    </div>
                    <div className="absolute top-44 right-24">
                        <Thumbnail className="h-16 w-16 bg-slate-400 rounded-full" src={""} />
                    </div>

                </div>

                <div className="py-4">
                    <h1 className="text-grey-90 mb-1 text-center text-[32px]">
                        {t("onboarding-profile-h1-card", "Hi, Mohammad Shafi")}
                    </h1>
                    <h3 className="text-center text-[16px] text-black">
                        {t("onboarding-profile-h3-card", "Do you want to continue you with your moveon account?")}
                    </h3>
                </div>
                <div className="py-4 flex justify-center">
                    <Button
                        variant="primary"
                        size="small"
                        type="button"
                        className="focus:shadow-outline bg-slate-300  flex h-[34px] w-[133px] items-center text-small justify-center rounded-lg  py-5 text-black shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                    >
                        Continue SignIn
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OnboardingProfile
