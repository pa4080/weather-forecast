import { City, CountryState, CountryStateCity, Language, State } from "@/types/geo-types";

export const GetCountryStates = async (countryId: number): Promise<State[] | []> => {
	const worldStates: CountryState[] = await fetch("/data/states.minified.json").then((res) =>
		res.json()
	);
	const countryStatesObj = worldStates.find((state: CountryState) => state.id === countryId);

	return countryStatesObj?.states ?? [];
};

export const GetCity = async (countryId: number, stateId: number): Promise<Array<City> | []> => {
	const cities = await fetch("/data/cities.minified.json").then((res) => res.json());
	const record = cities as Array<CountryStateCity>;
	const countries = record.find((e: CountryStateCity) => e.id === countryId);

	if (countries) {
		const states = countries && countries.states ? countries.states : [];
		const city = states.find((e) => e.id === stateId);

		return city && city.cities ? city.cities : [];
	} else {
		return [];
	}
};
