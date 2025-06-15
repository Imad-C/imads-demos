export async function fetchWeather(location: string, apiKey: string) {
	const res = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`
	);
	return res.json();
}
