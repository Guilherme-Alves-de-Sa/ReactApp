import { login_login_user } from "../api/graphQLModel"

const getLocalInfo = () => {
    let token: string | null
    let user: login_login_user | null
    token = localStorage.getItem("AUTH_SETTOKEN")
    user =  (JSON.parse(localStorage.getItem("AUTH_SETUSER")!))

    return {
        auth: {
            access_token: token,
            isAuthenticated: token ? true : false,
            user: user
        },
    }
}

export default getLocalInfo;