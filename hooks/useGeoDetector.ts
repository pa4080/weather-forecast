/**
 * @see https://openweathermap.org/api/one-call-3
 * @see https://openweathermap.org/api/geocoding-api
 * @see https://ipapi.co
 */

import { useEffect, useState } from "react";

import { ClientDataByIp, UserGeoData } from "@/types/geo";
import { Route } from "@/routes";

const ipToGeoAndData = process.env.NEXT_PUBLIC_CLIENT_DATA_BY_IP_PARSER_URL;

const geoToData = (lat: number, lon: number) => `${Route.api.geoReverse}/${lat}/${lon}`;

const options: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

type ErrorsCallback = (err: GeolocationPositionError) => void;

const errorsCb: ErrorsCallback = (err) => {
	console.warn(`ERROR(${err.code}): ${err.message}`);
};

export function useGeoDetector() {
	const [permissions, setPermissions] = useState<PermissionStatus>();
	const [geoPos, setGeoPos] = useState<GeolocationPosition>();
	const [userData, setUserData] = useState<UserGeoData>();

	const getPositionByIp = async () => {
		try {
			const response = await fetch(String(ipToGeoAndData));

			if (!response.ok) {
				throw new Error("Network response was not ok on @getPositionByIp()");
			}

			const clientDataByIp: ClientDataByIp = await response.json();
			const userData: UserGeoData = {
				cityName: clientDataByIp.city,
				countryCode: clientDataByIp.country_code,
				lat: clientDataByIp.latitude,
				lon: clientDataByIp.longitude,
			};

			setUserData(userData);
		} catch (err) {
			console.warn(err);
		}
	};

	const getPosition = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => setGeoPos(pos),
			(err) => {
				getPositionByIp();
				errorsCb(err);
			},
			options
		);
	};

	const getReverseData = async (latitude: number, longitude: number) => {
		try {
			const response = await fetch(geoToData(latitude, longitude));

			if (!response.ok) {
				throw new Error("Network response was not ok on @getReverseData()");
			}

			const userData: UserGeoData = await response.json();

			setUserData(userData);
		} catch (err) {
			console.warn(err);
		}
	};

	const getPermission = async () => {
		try {
			if (navigator.geolocation) {
				const permissions = await navigator.permissions.query({ name: "geolocation" });

				setPermissions(permissions);
			} else {
				getPositionByIp();
			}
		} catch (err) {
			console.warn(err);
		}
	};

	useEffect(() => {
		if (geoPos) {
			const { latitude, longitude } = geoPos.coords;

			getReverseData(latitude, longitude);
		}
	}, [geoPos]);

	useEffect(() => {
		if (permissions) {
			if (permissions.state === "granted" || permissions.state === "prompt") {
				getPosition();
			} else {
				// if (permissions.state === "denied")
				getPositionByIp();
			}

			permissions.onchange = function () {
				getPermission();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [permissions]);

	useEffect(() => {
		if (navigator.geolocation) {
			getPermission();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { userData, geoPos };
}
