import { NextRequest, NextResponse } from "next/server";

import data from "@/public/data/cities.minified.json";
import {
	City,
	Country,
	CountryStateCity,
	CountryStateCityFull,
	State,
	StateFull,
} from "@/types/geo";
import { GET as getCountries } from "@/app/api/geo-data/countries/[[...query]]/route";
import { GET as getStates } from "@/app/api/geo-data/states/[[...query]]/route";

const usageMessage =
	"Use: /, /country_state/[countryId]/[stateId], " +
	"/country_id_state_structured/[countryId], /country_code_state_structured/[countryIso2], " +
	"/id/[countryId], /id_states/[countryId], /id_flat/[countryId], " +
	"/code/[countryIso2], /code_states/[countryIso2], /code_flat/[countryIso2]";

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const countries = data as CountryStateCity[];

		switch (params?.query?.length ?? 0) {
			case 0: {
				return NextResponse.json(countries, { status: 200 });
			}

			case 1: {
				// This is the same as the default case
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}

			case 2: {
				const [type, value] = params.query;
				let countryId = parseInt(value);

				if (type.includes("code")) {
					const data = await getCountries({} as NextRequest, {
						params: { query: ["code", String(value)] },
					});

					countryId = ((await data.json()) as Country).id;
				}

				if (type === "id" || type === "code") {
					const country = countries.find(({ id }) => id === countryId);

					if (!country) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					return NextResponse.json(country, { status: 200 });
				} else if (type === "id_states" || type === "code_states") {
					const country = countries.find(({ id }) => id === countryId);

					if (!country) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					return NextResponse.json(country.states, { status: 200 });
				} else if (type === "id_flat" || type === "code_flat") {
					const country = countries.find(({ id }) => id === countryId);

					if (!country) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					const cities = country?.states
						.flatMap(({ cities }) => cities && cities)
						.sort((a, b) => a.name.localeCompare(b.name));

					if (cities.length === 0) {
						// Catch the cases when there is no data for a the country.
						// We assume there are countries with a single city or state.
						// So we will get the country data from the countries API.

						const country: Country = await (
							await getCountries({} as NextRequest, {
								params: { query: ["id", String(countryId)] },
							})
						).json();

						const cities: City[] = [
							{
								id: country.id,
								name: country.capital ?? country.name,
								latitude: country.latitude,
								longitude: country.longitude,
							},
						];

						return NextResponse.json(cities, { status: 200 });
					}

					return NextResponse.json(cities, { status: 200 });
				} else if (
					type === "country_id_state_structured" ||
					type === "country_code_state_structured"
				) {
					const countryCitiesData = countries.find(({ id }) => id === countryId);

					if (!countryCitiesData) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					const countryData = await (
						await getCountries({} as NextRequest, {
							params: { query: ["id", String(countryId)] },
						})
					).json();

					const citiesFlat: City[] = countryCitiesData?.states
						.flatMap(({ cities }) => cities && cities)
						.sort((a, b) => a.name.localeCompare(b.name));

					if (citiesFlat.length === 0) {
						// We assume there are countries with a single city without states.

						const cities: City[] = [
							{
								id: countryData.id,
								name: countryData.capital ?? countryData.name,
								latitude: countryData.latitude,
								longitude: countryData.longitude,
							},
						];

						const countryStateCityFull: CountryStateCityFull = {
							...countryData,
							citiesLength: citiesFlat.length,
							states: cities,
						};

						return NextResponse.json(countryStateCityFull, { status: 200 });
					}

					const countryStatesData: State[] = await (
						await getStates({} as NextRequest, {
							params: { query: [String(countryId)] },
						})
					).json();

					const countryStatesDataWithCities: StateFull[] = countryStatesData
						.map((state) => {
							return {
								...state,
								cities: countryCitiesData.states
									.filter(({ id }) => id === state.id)[0]
									.cities.sort((a, b) => a.name.localeCompare(b.name)),
							};
						})
						.filter(({ cities }) => cities.length > 0)
						.sort((a, b) => a.name.localeCompare(b.name));

					const countryStateCityFull: CountryStateCityFull = {
						...countryData,
						citiesLength: citiesFlat.length,
						states: countryStatesDataWithCities,
					};

					return NextResponse.json(countryStateCityFull, { status: 200 });
				} else {
					return NextResponse.json(
						{
							message: "Invalid type, use: [id] of the country; " + usageMessage,
						},
						{ status: 400 }
					);
				}
			}

			case 3: {
				const [type, valueCountry, valueState] = params.query;
				const countryId = parseInt(valueCountry);
				const stateId = parseInt(valueState);

				if (type === "country_state") {
					const country = countries.find(({ id }) => id === countryId);

					if (!country) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					const state = country.states.find(({ id }) => id === stateId);

					if (!state) {
						return NextResponse.json({ message: "Invalid state Id" }, { status: 400 });
					}

					const cities = state.cities.sort((a, b) => a.name.localeCompare(b.name));

					return NextResponse.json(cities, { status: 200 });
				} else {
					return NextResponse.json(
						{ message: "Invalid type, use: country_state; " + usageMessage },
						{ status: 400 }
					);
				}
			}

			default: {
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
