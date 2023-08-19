import { NextRequest, NextResponse } from "next/server";

// this data is not full ahd is quiet wrong for some contry codes
import data from "@/public/data/languages.minified.json";
import { Country, Language } from "@/types/geo-types";
import { GET as getCountries } from "@/app/api/countries/[[...query]]/route";

const usageMessage = "Use: /, /id/[countryId], /code/[countryIso2], /name/[countryName]";

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const countries = data as Language[];

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

				if (type === "code") {
					const country = countries.find(
						(country) => country.code.toUpperCase() === value.toUpperCase()
					);

					if (!country) {
						return NextResponse.json(
							{ message: `Invalid country code, we may not have a language record for '${value}'` },
							{ status: 400 }
						);
					}

					return NextResponse.json(country, { status: 200 });
				} else if (type === "id") {
					// Country name and id are not in the languages.minified.json file
					// So we need to get the country data from the countries API

					const data = await getCountries({} as NextRequest, {
						params: { query: ["id", String(value)] },
					});

					const countryData: Country = await data.json();

					if (!countryData) {
						return NextResponse.json({ message: "Invalid country Id" }, { status: 400 });
					}

					const country = countries.find(
						(country) => country.code.toUpperCase() === countryData.iso2.toUpperCase()
					);

					if (!country) {
						return NextResponse.json(
							{ message: `We do not have have a language record for '${countryData.name}'` },
							{ status: 400 }
						);
					}

					return NextResponse.json(country, { status: 200 });
				} else if (type === "name") {
					// Country name and id are not in the languages.minified.json file
					// So we need to get the country data from the countries API

					const data = await getCountries({} as NextRequest, {
						params: { query: ["name", String(value)] },
					});

					const countryData: Country = await data.json();

					if (!countryData) {
						return NextResponse.json({ message: "Invalid country name" }, { status: 400 });
					}

					const country = countries.find(
						(country) => country.code.toLowerCase() === countryData.iso2.toLowerCase()
					);

					if (!country) {
						return NextResponse.json(
							{ message: `We do not have have a language record for '${countryData.name}'` },
							{ status: 400 }
						);
					}

					return NextResponse.json(country, { status: 200 });
				} else {
					return NextResponse.json(
						{
							message: "Invalid type, use: [id], [code] or [name] of the country; " + usageMessage,
						},
						{ status: 400 }
					);
				}
			}

			default: {
				// This is the same as the default case
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
