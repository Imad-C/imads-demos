import { VC_API_KEY } from '$env/static/private';
import { badRequest, badGateway, internalError } from '$lib/api-errors';
import { fetchWeather, filterWeatherDay } from '$lib/weather';

export async function POST({ request }) {
	try {
		const body = await request.json();
		if (!body.location) return badRequest('Location is required.');

		const data = await fetchWeather(body.location, VC_API_KEY);
		if (data?.days?.length < 2) return badGateway('Weather data unavailable.');

		const keysToKeep = ['datetime', 'tempmax', 'tempmin', 'temp', 'conditions'];
		const daysFiltered = data.days.map((day) => filterWeatherDay(day, keysToKeep));

		const dataFiltered = {
			location: data.resolvedAddress,
			days: daysFiltered
		};

		return new Response(JSON.stringify(dataFiltered), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Weather API error:', error);
		return internalError();
	}
}
