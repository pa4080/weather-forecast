export function roundTo(numString: string | number, to = 1) {
	const num = parseFloat(String(numString));

	if (isNaN(num)) {
		return 0;
	}

	return +(Math.round(num * 100) / 100).toFixed(to);
}
