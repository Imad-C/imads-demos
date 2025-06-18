import { VC_API_KEY } from '$env/static/private';
import { badRequest, badGateway, internalError } from '$lib/api-errors';
import { fetchWeather } from '$lib/weather';

export async function POST({ request }) {
	try {
		const body = await request.json();
		if (!body.location) return badRequest('Location is required.');

		const data = await fetchWeather(body.location, VC_API_KEY);
		if (!data?.days || data.days.length < 2) return badGateway('Weather data unavailable.');

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Weather API error:', error);
		return internalError();
	}
}
