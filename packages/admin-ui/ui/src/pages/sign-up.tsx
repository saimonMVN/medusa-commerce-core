import SEO from "../components/seo"
import PublicLayout from "../components/templates/login-layout"
import SignUpCard from "../components/organisms/sign-up-card"

const SignUp = () => {
    return (
        <PublicLayout>
            <SEO title="Signup"/>
            <SignUpCard/>
        </PublicLayout>
    )
}
export default SignUp
