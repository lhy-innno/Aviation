import http from '../config'
export default {
	getAirport: () => http.get('api/airport/getAll'),
	searchAirport: (params) => http.get('api/flight/search', params)
}
