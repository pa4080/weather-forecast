"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { useGeoDetector } from "@/hooks/useGeoDetector";
import { GeoCoordinates } from "@/types/geo-types";
import { OpenWeatherData, WeatherUnits } from "@/types/weather-types";
import { useWeather } from "@/hooks/useWeather";

interface AppContextProps {
	countryCode: string | undefined;
	setCountryCode: Dispatch<SetStateAction<string | undefined>>;
	cityName: string | undefined;
	setCityName: Dispatch<SetStateAction<string | undefined>>;
	geoCoord: GeoCoordinates | undefined;
	setGeoCoord: Dispatch<SetStateAction<GeoCoordinates | undefined>>;
	weatherData: OpenWeatherData | undefined;
	units: WeatherUnits;
	setUnits: Dispatch<SetStateAction<WeatherUnits>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppContextProviderProps {
	children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string | undefined>();
	const [cityName, setCityName] = useState<string | undefined>();
	const [geoCoord, setGeoCoord] = useState<GeoCoordinates | undefined>();
	const [units, setUnits] = useState<WeatherUnits>("metric");

	const { userData, geoPos } = useGeoDetector();
	const { weatherData, setWeatherCoord } = useWeather();

	useEffect(() => {
		setCountryCode(userData?.countryCode);
		setCityName(userData?.cityName);
	}, [userData]);

	useEffect(() => {
		if (geoCoord) {
			// This will be called either when the user selects a city from the dropdown
			// or when the user's geolocation is detected by IP. Also when the user's
			// geolocation is detected by the browser, but it will take time (ms) to set
			// "geoCoord" on the base of "geoPos", so for this case we have the other condition
			setWeatherCoord({ ...geoCoord, units });
		} else if (geoPos) {
			// If the user's geolocation is available "geoPos" will appear before "geoCoord",
			// so we can set the weather coordinates here and fetch the weather data
			setWeatherCoord({ lat: geoPos.coords.latitude, lon: geoPos.coords.longitude, units });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geoCoord, geoPos, units]);

	useEffect(() => {
		if (weatherData) {
			// eslint-disable-next-line no-console
			console.log(weatherData);
		}
	}, [weatherData]);

	return (
		<AppContext.Provider
			value={{
				countryCode,
				setCountryCode,
				cityName,
				setCityName,
				geoCoord,
				setGeoCoord,
				weatherData,
				units,
				setUnits,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
