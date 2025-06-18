export interface WeatherDay {
	datetime: string;
	tempmax: number;
	tempmin: number;
	temp: number;
	conditions: string;
	icon: string;
}

export interface WeatherApiResponse {
	resolvedAddress: string;
	days: WeatherDay[];
}

export async function fetchWeather(location: string, apiKey: string): Promise<WeatherApiResponse> {
	const res = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}` +
			`?unitGroup=uk&key=${apiKey}&contentType=json`
	);
	return res.json();
}
