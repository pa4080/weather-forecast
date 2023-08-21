import { NextRequest, NextResponse } from "next/server";

import data from "@/public/data/states.minified.json";
import { Country, CountryState, State } from "@/types/geo";
import { GET as getCountries } from "@/app/api/countries/[[...query]]/route";

const usageMessage = "Use: /, /[countryId], /[countryId]/[stateId]";

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const countries = data as CountryState[];

		switch (params?.query?.length ?? 0) {
			case 0: {
				return NextResponse.json(countries, { status: 200 });
			}

			case 1: {
				const [countryValue] = params.query;
				const countryId = parseInt(countryValue);

				const country = countries.find(({ id }) => id === countryId);

				if (!country) {
					return NextResponse.json(
						{ message: "Invalid country, use: /id/[1 - 250]" },
						{ status: 400 }
					);
				}

				const states = country.states.sort((a, b) => a.name.localeCompare(b.name));

				if (states?.length === 0) {
					// Catch the cases when there is no data for a the country.
					// We assume there are countries with a single city or state.
					// So we will get the country data from the countries API.
					// *** Currently this logic is implemented only here! ***

					const data = await getCountries({} as NextRequest, {
						params: { query: ["id", String(countryId)] },
					});

					const country: Country = await data.json();
					const states: State[] = [
						{
							id: country.id,
							name: country.capital ?? country.name,
							state_code: country.iso3 ?? country.iso2,
						},
					];

					return NextResponse.json(states, { status: 200 });
				}

				return NextResponse.json(states, { status: 200 });
			}

			case 2: {
				const [valueCountry, valueState] = params.query;
				const countryId = parseInt(valueCountry);
				const stateId = parseInt(valueState);

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

				return NextResponse.json(state, { status: 200 });
			}

			default: {
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
