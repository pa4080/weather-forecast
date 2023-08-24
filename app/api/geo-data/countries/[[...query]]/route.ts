import { NextRequest, NextResponse } from "next/server";

import data from "@/public/data/countries.minified.json";
import { Country } from "@/types/geo";

const usageMessage = "Use: /, /id/[countryId], /code/[countryIso2], /name/[countryName]";

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const countries = data as Country[];

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

				if (type === "id") {
					const countryId = parseInt(value);

					if (countryId > 250 || isNaN(countryId)) {
						return NextResponse.json(
							{ message: "Invalid country, use: /id/[1 - 250]" },
							{ status: 400 }
						);
					}

					const country = countries.find((country) => country.id === countryId);

					return NextResponse.json(country, { status: 200 });
				} else if (type === "code") {
					const country = countries.find(
						(country) => country.iso2.toUpperCase() === value.toUpperCase()
					);

					if (!country) {
						return NextResponse.json({ message: "Invalid country code" }, { status: 400 });
					}

					return NextResponse.json(country, { status: 200 });
				} else if (type === "name") {
					const country = countries.find(
						(country) => country.name.toLocaleLowerCase() === value.toLocaleLowerCase()
					);

					if (!country) {
						return NextResponse.json({ message: "Invalid country name" }, { status: 400 });
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
