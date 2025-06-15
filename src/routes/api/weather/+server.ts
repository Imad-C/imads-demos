import { VC_API_KEY } from '$env/static/private';
import { fetchWeather } from '$lib/services/visual-crossing';

export async function POST({ request }) {
	const body = await request.json();
	const data = await fetchWeather(body.location, VC_API_KEY);

	const dataSmall = {
		location: data.address,
		fullLocation: data.resolvedAddress,
		temp: data.days[0].temp,
		max: data.days[0].tempmax,
		min: data.days[0].tempmin,
		tomTemp: data.days[1].temp
	};

	return new Response(JSON.stringify(dataSmall), {
		headers: { 'Content-Type': 'application/json' }
	});
}
