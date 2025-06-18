export function badRequest(message: string) {
	return new Response(JSON.stringify({ error: message }), {
		status: 400,
		headers: { 'Content-Type': 'application/json' }
	});
}

export function badGateway(message: string) {
	return new Response(JSON.stringify({ error: message }), {
		status: 502,
		headers: { 'Content-Type': 'application/json' }
	});
}

export function internalError(message = 'Internal server error.') {
	return new Response(JSON.stringify({ error: message }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' }
	});
}
