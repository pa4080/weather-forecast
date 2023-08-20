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

interface AppContextProps {
	countryCode: string | undefined;
	setCountryCode: Dispatch<SetStateAction<string | undefined>>;
	cityName: string | undefined;
	setCityName: Dispatch<SetStateAction<string | undefined>>;
	geoCoord: GeoCoordinates;
	setGeoCoord: Dispatch<SetStateAction<GeoCoordinates>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppContextProviderProps {
	children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string | undefined>();
	const [cityName, setCityName] = useState<string | undefined>();
	const [geoCoord, setGeoCoord] = useState<GeoCoordinates>({ lat: 0, lon: 0 });

	const { userData, geoPos } = useGeoDetector();

	useEffect(() => {
		setCountryCode(userData?.countryCode);
		setCityName(userData?.cityName);
	}, [userData]);

	useEffect(() => {
		if (geoPos) {
		} else if (geoCoord) {
		}

		// eslint-disable-next-line no-console
		console.log(geoCoord);
	}, [geoCoord, geoPos]);

	return (
		<AppContext.Provider
			value={{
				countryCode,
				setCountryCode,
				cityName,
				setCityName,
				geoCoord,
				setGeoCoord,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
