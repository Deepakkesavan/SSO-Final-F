

export const APP_LOGIN_BRANDING_DETAILS = {
    title: "Login",
    subtitle: "Sign in to continue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.",
    buttonText: "Learn More"
}

export const SIGNUP_BRANDING_DETAILS = {
    title: "Sign Up",
    subtitle: "Create your Account",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.",
    buttonText: "Learn More"
}

export const USER_LOGIN_BRANDING_DETAILS = {
    title: "Welcome",
    subtitle: "Sign in to continue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.",
    buttonText: "Learn More"
}

export const LOGIN_PAGE_DETAILS = {
    title: "Sign in",
    loadingText: "Checking authentication status...",
    errorMessages:{
        email: "Invalid email address",
        password: "Please enter password"
    },
    divider: "",
    formButtons:{
        azure: "Login with Azure AD",
        dashboard: "Go to Dashboard"
    },
    loggedInText: "You are already logged in!"
}

export const USER_LOGIN_PAGE_DETAILS = {
    mainTitle: "Sign In",
    subtitle: "Custom Login",
    errorMessages:{
        username:"Username is required",
        password:"Password is required",
    },
    formLinksLabel:{
        forgotPassword: "Forgot Password?"
    },
    formButtons:{
        signup: "Sign Up",
    },
    divider: "OR",
    layout: USER_LOGIN_BRANDING_DETAILS
}

export const FORGOT_PASSWORD_PAGE_DETAILS = {
    title: "Forgot Password",
    descripton: "Enter your email address and we'll send you a link to reset your password.",
    errorMessages: {
        email: "Please enter a valid email",
    },
    formButtons:{
        login: "Back to Login"
    },
    layout: USER_LOGIN_BRANDING_DETAILS
}

export const VERIFY_OTP_PAGE_DETALS = {
    title: "Verify OTP",
    description: "Please enter the 6-digit code sent to",
    resendText: "Didn't recieved the code?",
    formButtons: {
        email : "Change Email"
    },
    layout: USER_LOGIN_BRANDING_DETAILS
}

export const SET_NEW_PASSWORD_PAGE_DETAILS = {
    title: "Set New Password",
    desciption: "Create a strong password for",
    passwordStrengthText: "Password Strenght",
    requirementsTitle: "Password must contain:",
    requirements:{
        length: "At least 6 characters",
        case: "Upper and lowercase letters",
        number: "At least one number"
    },
    formButtons: {
        login: "Back to Login"
    },
    layout: USER_LOGIN_BRANDING_DETAILS
}

export const SIGNUP_PAGE_DETAILS = {
    mainTitle: "Create Account",
    subtitle: "Sign Up",
    loading: "Creating your account",
    errorMessages: {
        username: "Username must be at least 3 characters",
        email: "Please enter a valid email",
        password: "Password must be at least 6 characters"
    },
    formButtons: {
        login: "Back to Login"
    },
    layout:SIGNUP_BRANDING_DETAILS
}

export const AZURE_LOGIN_DETAILS = {
    title: "Sign in",
    subtitle: "Sign-In with Clarium Mail",
    loading: "Redirecting to Azure...",
    buttonText: "Sign in with Microsoft"
}



