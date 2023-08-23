export function getDates(inputDate: number, timezoneOffset: number) {
	const date = new Date(inputDate * 1000);
	const dateOffset = new Date((inputDate + timezoneOffset) * 1000);
	const remoteDate = new Date(
		dateOffset.getUTCFullYear(),
		dateOffset.getUTCMonth(),
		dateOffset.getUTCDate(),
		dateOffset.getUTCHours(),
		dateOffset.getUTCMinutes(),
		dateOffset.getUTCSeconds()
	);

	return {
		date,
		remoteDate,
	};
}
