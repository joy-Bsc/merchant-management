import axios from 'axios';
import Store from '../redux/store/Store';
import { HideLoader, ShowLoader } from '../redux/state-slice/settings-slice';
import { getToken, setEmail, setOTP, setToken, setUserDetails } from '../helper/SessionHelper';
import { setProfile } from '../redux/state-slice/profile-slice';
import { BaseURL } from './../helper/config';
import { errorToast, successToast } from '../helper/FormHelper'; // Assuming you have these functions

const AxiosHeader = { headers: { "token": getToken() } };

export async function RegistrationRequest(email, firstName, lastName, mobile, password, photo) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/Registration";
    const PostBody = { email, firstName, lastName, mobile, password, photo };

    try {
        const res = await axios.post(URL, PostBody);
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            if (res.data.status === "fail") {
                if (res.data.data.keyPattern.email === 1) {
                    errorToast("Email already exists");
                } else {
                    errorToast('Something went wrong');
                }
                return false;
            } else {
                successToast("Registration successful");
                return true;
            }
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (error) {
        Store.dispatch(HideLoader());
        console.error("Registration error:", error);
        errorToast("Something went wrong");
        return false;
    }
}

export async function LoginRequest(email, password) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/Login";
    const PostBody = { email, password };

    try {
        const res = await axios.post(URL, PostBody); // Await here
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            successToast("Login successful");
            return true;
        } else {
            errorToast("Invalid email or password");
            return false;
        }
    } catch (error) {
        Store.dispatch(HideLoader());
        console.error("Login error:", error);
        errorToast("Something went wrong");
        return false;
    }
}

export async function GetProfileDetails() {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/ProfileDetails";

    try {
        const res = await axios.get(URL, AxiosHeader);
        Store.dispatch(HideLoader());
      
        

        if (res.status === 200) {
            Store.dispatch(setProfile(res.data['data'][0]));
        } else {
            errorToast("Something went wrong");
        }
    } catch (e) {
        Store.dispatch(HideLoader());
        errorToast("Something went wrong");
        console.log(e);
    }
}

export async function ProfileUpdateRequest(firstName, lastName, mobile, password, photo) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL +"/ProfileUpdate";
    const PostBody = { firstName, lastName, mobile, password, photo };

    try {
        const res = await axios.post(URL, PostBody, AxiosHeader);
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            successToast("Profile update success");
            setUserDetails({ firstName, lastName, mobile, password, photo });
            return true;
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (error) {
        Store.dispatch(HideLoader());
        console.error("Profile update error:", error);
        errorToast("Something went wrong");
        return false;
    }
}

export async function RecoverVerifyEmailRequest(email) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverVerifyEmail/" + email;

    try {
        const res = await axios.get(URL, AxiosHeader);
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                errorToast("No User Found");
                return false;
            } else {
                setEmail(email);
                successToast("A six digit code sent to your email address");
                return true;
            }
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (e) {
        errorToast("Something went wrong");
        Store.dispatch(HideLoader());
        return false;
    }
}

export async function RecoverVerifyOTPRequest(email, OTP) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverVerifyOtp/" + email + "/" + OTP;

    try {
        const res = await axios.get(URL, AxiosHeader);
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                errorToast("Invalid OTP");
                return false;
            } else {
                setOTP(OTP);
                successToast("Code verification success");
                return true;
            }
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (e) {
        errorToast("Something went wrong");
        Store.dispatch(HideLoader());
        return false;
    }
}

export async function RecoverResetPassRequest(email, OTP, password) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverResetPassword";
    const PostBody = { email, OTP, password };

    try {
        const res = await axios.post(URL, PostBody);
        Store.dispatch(HideLoader());

        if (res.status === 200) {
            setOTP(OTP);
            successToast("New Password created");
            return true;
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (e) {
        errorToast(e.message);
        Store.dispatch(HideLoader());
        return false;
    }
}

