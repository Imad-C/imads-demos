export async function fetchWeather(location: string, apiKey: string) {
	const res = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`
	);
	return res.json();
}

export function filterWeatherDay(day, keysToKeep) {
	return Object.fromEntries(Object.entries(day).filter(([key]) => keysToKeep.includes(key)));
}

interface WeatherDay {
	datetime: string;
	tempmax: number;
	tempmin: number;
	temp: number;
	conditions: string;
}

export interface WeatherData {
	location: string;
	days: WeatherDay[];
}
