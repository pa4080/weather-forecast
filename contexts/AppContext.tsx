"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

import messages from "@/messages/en.json";
import { WeatherData_MainDisplay, OpenWeatherData, WeatherUnits } from "@/types/weather";
import { useGeoDetector } from "@/hooks/useGeoDetector";
import { GeoCoordinates } from "@/types/geo";
import { useWeather } from "@/hooks/useWeather";
import { tempColor } from "@/lib/tempColor";
import { roundTo } from "@/lib/round";
import { getDates } from "@/lib/getDates";

interface AppContextProps {
	countryCode: string;
	setCountryCode: Dispatch<SetStateAction<string>>;
	countryName: string;
	setCountryName: Dispatch<SetStateAction<string>>;
	cityName: string;
	setCityName: Dispatch<SetStateAction<string>>;
	geoCoord: GeoCoordinates | undefined;
	setGeoCoord: Dispatch<SetStateAction<GeoCoordinates | undefined>>;
	weatherData: OpenWeatherData | undefined;
	units: WeatherUnits;
	setUnits: Dispatch<SetStateAction<WeatherUnits>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	mainData: WeatherData_MainDisplay | undefined;
	setMainData: (
		weatherDataCurrent: OpenWeatherData["current"],
		weatherDataDaily: OpenWeatherData["daily"][number],
		weatherData: OpenWeatherData
	) => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppContextProviderProps {
	children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string>("");
	const [countryName, setCountryName] = useState<string>("");
	const [cityName, setCityName] = useState<string>("");
	const [geoCoord, setGeoCoord] = useState<GeoCoordinates | undefined>();
	const [units, setUnits] = useState<WeatherUnits>("metric");
	const [isLoading, setIsLoading] = useState(false);
	const [mainData, setMainDataToDisplay] = useState<WeatherData_MainDisplay | undefined>();

	const { userData, geoPos } = useGeoDetector();
	const { weatherData, setWeatherCoord } = useWeather(setIsLoading);

	useEffect(() => {
		setCountryCode(userData?.countryCode || "");
		setCityName(userData?.cityName || "");
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

	const setMainData = (
		weatherDataCurrent: OpenWeatherData["current"],
		weatherDataDaily: OpenWeatherData["daily"][number],
		weatherData: OpenWeatherData
	) => {
		const { date, remoteDate } = getDates(weatherDataCurrent.dt, weatherData?.timezone_offset);

		setMainDataToDisplay({
			cityName: String(cityName),
			countryName: String(countryName),
			countryCode: String(countryCode),
			weatherId: weatherDataCurrent.weather[0].id,
			tempColor: tempColor(weatherDataCurrent.temp, units),
			units: units,
			displayUnits: messages.WeatherUnits[units],
			tempCurrent: roundTo(weatherDataCurrent.temp, 0),
			tempFeelsLike: roundTo(weatherDataCurrent.feels_like, 0),
			tempDayMin: roundTo(weatherDataDaily.temp.min, 0),
			tempDayMax: roundTo(weatherDataDaily.temp.max, 0),
			date: weatherDataCurrent.dt,
			dayOfTheMonth: remoteDate.getDate(),
			localDateText: date.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hourCycle: "h24",
			}),
			remoteDateText: remoteDate.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hourCycle: "h24",
			}),
			partOfTheDay:
				weatherDataCurrent.dt > weatherDataCurrent.sunrise &&
				weatherDataCurrent.dt < weatherDataCurrent.sunset
					? "day"
					: "night",
			humidity: weatherDataCurrent.humidity,
			pressure: weatherDataCurrent.pressure,
			windSpeed: weatherDataCurrent.wind_speed,
			windDirection: weatherDataCurrent.wind_deg,
			moonPhase: weatherDataDaily.moon_phase,
			precipitation: weatherDataDaily.pop,
			cloudiness: weatherDataCurrent.clouds,
		});
	};

	useEffect(() => {
		if (weatherData) {
			// eslint-disable-next-line no-console
			// console.log(weatherData);

			setMainData(weatherData.current, weatherData.daily[0], weatherData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weatherData]); /* units - cause new rendering before the new data is fetched */

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
				isLoading,
				setIsLoading,
				mainData,
				setMainData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
