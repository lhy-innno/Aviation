import http from '../config'
import { User } from './index.d'
export default {
	signUp: (params: User.SignUpParams) => http.post('api/user/signup', params),
	login: (params: User.LoginParams) => http.post('api/auth/login', params)
}
