export namespace SearchParams {
	interface FlightType {
		flight_id: number
		model: string
		departure_airport: number
		destination_airport: number
		departure_date: string
		departure_time: string
		arrival_date: string
		arrival_time: string
		seat: string
		charge: number
	}

	interface CityOptionType {
		label: string
		value: number
	}

	interface AircraftOptionType {
		aircraft_id: number
		manufacturer: string
		model: string
		number_of_seat: number
	}
}
