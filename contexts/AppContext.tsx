"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import { WeatherData_MainDisplay, OpenWeatherData, WeatherUnits } from "@/types/weather";

import { useGeoDetector } from "@/hooks/useGeoDetector";
import { GeoCoordinates } from "@/types/geo";
import { useWeather } from "@/hooks/useWeather";
import { temperatureColor } from "@/lib/temeratureColor";
import { roundTo } from "@/lib/round";

interface AppContextProps {
	countryCode: string | undefined;
	setCountryCode: Dispatch<SetStateAction<string | undefined>>;
	countryName: string | undefined;
	setCountryName: Dispatch<SetStateAction<string | undefined>>;
	cityName: string | undefined;
	setCityName: Dispatch<SetStateAction<string | undefined>>;
	geoCoord: GeoCoordinates | undefined;
	setGeoCoord: Dispatch<SetStateAction<GeoCoordinates | undefined>>;
	weatherData: OpenWeatherData | undefined;
	units: WeatherUnits;
	setUnits: Dispatch<SetStateAction<WeatherUnits>>;
	mainDataDisplay: WeatherData_MainDisplay | undefined;
	setMainDataDisplay: Dispatch<SetStateAction<WeatherData_MainDisplay | undefined>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppContextProviderProps {
	children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string | undefined>();
	const [countryName, setCountryName] = useState<string | undefined>();
	const [cityName, setCityName] = useState<string | undefined>();
	const [geoCoord, setGeoCoord] = useState<GeoCoordinates | undefined>();
	const [units, setUnits] = useState<WeatherUnits>("metric");
	const [mainDataDisplay, setMainDataDisplay] = useState<WeatherData_MainDisplay | undefined>();

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

			setMainDataDisplay({
				cityName: String(cityName),
				countryName: String(countryName),
				countryCode: String(countryCode),
				weatherId: weatherData?.current.weather[0].id,
				tempColor: temperatureColor(weatherData?.current.temp, units),
				units: units,
				tempCurrent: roundTo(weatherData?.current.temp, 0),
				tempFeelsLike: roundTo(weatherData?.current.feels_like, 0),
				tempDayMin: roundTo(weatherData?.daily[0].temp.min, 0),
				tempDayMax: roundTo(weatherData?.daily[0].temp.max, 0),
				date: weatherData?.current.dt,
				dateText: new Date(weatherData?.current.dt * 1000).toLocaleDateString("en-US", {
					weekday: "long",
					month: "short",
					day: "numeric",
				}),
				humidity: weatherData?.current.humidity,
				pressure: weatherData?.current.pressure,
				windSpeed: weatherData?.current.wind_speed,
				windDirection: weatherData?.current.wind_deg,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weatherData]); /* units - cause new rendering before the new data is fetched*/

	return (
		<AppContext.Provider
			value={{
				countryCode,
				setCountryCode,
				countryName,
				setCountryName,
				cityName,
				setCityName,
				geoCoord,
				setGeoCoord,
				weatherData,
				units,
				setUnits,
				mainDataDisplay,
				setMainDataDisplay,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
