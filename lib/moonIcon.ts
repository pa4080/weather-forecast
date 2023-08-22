/**
 * @see https://openweathermap.org/api/one-call-3 > moon_phase
 * @see https://erikflowers.github.io/weather-icons/
 * @see https://minkukel.com/en/various/calculating-moon-phase/
 * @see https://www.timeanddate.com/moon/phases/
 * @see https://www.almanac.com/astronomy/moon/calendar
 *
 * MAPPING:                   Sure  ToCheck
 * wi-moon-new			          0/1
 * wi-moon-waxing-crescent-1        0.03
 * wi-moon-waxing-crescent-2        0.06
 * wi-moon-waxing-crescent-3        0.10
 * wi-moon-waxing-crescent-4        0.14
 * wi-moon-waxing-crescent-5	0.18
 * wi-moon-waxing-crescent-6	0.22
 * wi-moon-first-quarter		  0.25
 * wi-moon-waxing-gibbous-1	  0.28
 * wi-moon-waxing-gibbous-2	  0.32
 * wi-moon-waxing-gibbous-3	  0.36
 * wi-moon-waxing-gibbous-4	  0.39
 * wi-moon-waxing-gibbous-5	  0.43
 * wi-moon-waxing-gibbous-6		      0.47
 * wi-moon-full			          0.5
 * wi-moon-waning-gibbous-1         0.53
 * wi-moon-waning-gibbous-2         0.56
 * wi-moon-waning-gibbous-3         0.60
 * wi-moon-waning-gibbous-4         0.64
 * wi-moon-waning-gibbous-5         0.68
 * wi-moon-waning-gibbous-6         0.72
 * wi-moon-third-quarter		  0.75
 * wi-moon-waning-crescent-1        0.78
 * wi-moon-waning-crescent-2        0.82
 * wi-moon-waning-crescent-3        0.86
 * wi-moon-waning-crescent-4        0.89
 * wi-moon-waning-crescent-5        0.93
 * wi-moon-waning-crescent-6        0.97
 */

export function moonIcon(phase: number | undefined, alt: boolean = true) {
	const iconBase = alt ? "wi-moon-alt" : "wi-moon";

	if (phase === undefined) {
		return `${iconBase}-full`;
	}

	if (0 <= phase && phase < 0.03) {
		return `${iconBase}-new`;
	} else if (0.03 <= phase && phase < 0.06) {
		return `${iconBase}-waxing-crescent-1`;
	} else if (0.06 <= phase && phase < 0.1) {
		return `${iconBase}-waxing-crescent-2`;
	} else if (0.1 <= phase && phase < 0.14) {
		return `${iconBase}-waxing-crescent-3`;
	} else if (0.14 <= phase && phase < 0.18) {
		return `${iconBase}-waxing-crescent-4`;
	} else if (0.18 <= phase && phase < 0.225) {
		return `${iconBase}-waxing-crescent-5`;
	} else if (0.22 <= phase && phase < 0.25) {
		return `${iconBase}-waxing-crescent-6`;
	} else if (0.25 <= phase && phase < 0.28) {
		return `${iconBase}-first-quarter`;
	} else if (0.28 <= phase && phase < 0.32) {
		return `${iconBase}-waxing-gibbous-1`;
	} else if (0.32 <= phase && phase < 0.36) {
		return `${iconBase}-waxing-gibbous-2`;
	} else if (0.36 <= phase && phase < 0.39) {
		return `${iconBase}-waxing-gibbous-3`;
	} else if (0.39 <= phase && phase < 0.43) {
		return `${iconBase}-waxing-gibbous-4`;
	} else if (0.43 <= phase && phase < 0.47) {
		return `${iconBase}-waxing-gibbous-5`;
	} else if (0.47 <= phase && phase < 0.5) {
		return `${iconBase}-waxing-gibbous-6`;
	} else if (0.5 <= phase && phase < 0.53) {
		return `${iconBase}-full`;
	} else if (0.53 <= phase && phase < 0.56) {
		return `${iconBase}-waning-gibbous-1`;
	} else if (0.56 <= phase && phase < 0.6) {
		return `${iconBase}-waning-gibbous-2`;
	} else if (0.6 <= phase && phase < 0.64) {
		return `${iconBase}-waning-gibbous-3`;
	} else if (0.64 <= phase && phase < 0.68) {
		return `${iconBase}-waning-gibbous-4`;
	} else if (0.68 <= phase && phase < 0.72) {
		return `${iconBase}-waning-gibbous-5`;
	} else if (0.72 <= phase && phase < 0.75) {
		return `${iconBase}-waning-gibbous-6`;
	} else if (0.75 <= phase && phase < 0.78) {
		return `${iconBase}-third-quarter`;
	} else if (0.78 <= phase && phase < 0.82) {
		return `${iconBase}-waning-crescent-1`;
	} else if (0.82 <= phase && phase < 0.86) {
		return `${iconBase}-waning-crescent-2`;
	} else if (0.86 <= phase && phase < 0.89) {
		return `${iconBase}-waning-crescent-3`;
	} else if (0.89 <= phase && phase < 0.93) {
		return `${iconBase}-waning-crescent-4`;
	} else if (0.93 <= phase && phase < 0.97) {
		return `${iconBase}-waning-crescent-5`;
	} else if (0.97 <= phase && phase < 1) {
		return `${iconBase}-waning-crescent-6`;
	} else {
		return `${iconBase}-new`;
	}
}
