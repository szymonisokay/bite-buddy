export const getTimeFrames = () => {
	const fullHours = []

	// Generate full hours for a 24-hour period
	for (let hour = 0; hour < 24; hour++) {
		const formattedHour = new Date(0, 0, 0, hour, 0, 0).toLocaleTimeString(
			'en-US',
			{ hour: '2-digit', minute: '2-digit', hour12: true }
		)
		fullHours.push(formattedHour)
	}

	// Print the array of full hours
	return fullHours
}
