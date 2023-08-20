export interface Country {
	id: number;
	name: string;
	iso3: string;
	iso2: string;
	numeric_code: string;
	phone_code: number;
	capital: string;
	currency: string;
	currency_name: string;
	currency_symbol: string;
	native: string;
	region: string;
	subregion: string;
	emoji: string;
	emojiU: string;
	tld: string;
	latitude: string;
	longitude: string;
}
export interface State {
	id: number;
	name: string;
	state_code: string;
	latitude?: string;
	longitude?: string;
	emoji?: string;
	emojiU?: string;
}

export interface City {
	id: number;
	name: string;
	latitude: string;
	longitude: string;
	emoji?: string;
	emojiU?: string;
}

export interface Language {
	code: string;
	name: string;
	native: string;
}
export interface CountryState {
	id: number;
	states: State[];
}

export interface CountryStateCity {
	id: number;
	states: {
		id: number;
		cities: City[];
	}[];
}

export interface UserGeoData {
	cityName: string;
	countryCode: string;
	lat: number;
	lon: number;
}

/**
 * We are currently using https://ipapi.co/json/
 * which provides a plenty of other properties.
 * @see process.env.NEXT_PUBLIC_CLIENT_DATA_BY_IP_PARSER_URL
 */
export interface ClientDataByIp {
	ip: string;
	city: string;
	country_name: string;
	country_code: string;
	country_capital: string;
	latitude: number;
	longitude: number;
}
