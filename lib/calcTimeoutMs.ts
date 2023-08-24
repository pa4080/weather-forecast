export function calcTimeoutMs(cities: number | undefined) {
	if (!cities) {
		return 0;
	} else if (cities < 1000) {
		return 0;
	} else if (cities < 5000) {
		return 100;
	} else if (cities < 10000) {
		return 300;
	} else {
		return 500;
	}
}
