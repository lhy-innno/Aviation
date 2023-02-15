import http from '../config'
export default {
	getAircraft: () => http.get('api/aircraft/getAll')
}
