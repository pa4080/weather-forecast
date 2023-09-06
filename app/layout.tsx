import React from "react";
import { Analytics } from "@vercel/analytics/react";

import { Manrope as DefaultFont } from "next/font/google";

import "./globals.css";
import "@/public/css/weather-icons/weather-icons.min.css";
import "@/public/css/weather-icons/weather-icons-wind.min.css";

import manifest from "@/public/manifest.json";

import { AppContextProvider } from "@/contexts/AppContext";

import type { Metadata } from "next";

const font = DefaultFont({
	subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
});

export const metadata: Metadata = {
	title: manifest.name,
	description: manifest.description,
	manifest: "/manifest.json",
	viewport: "width=device-width, initial-scale=1",
	robots: "index,follow",
	keywords: manifest.keywords,
	themeColor: manifest.theme_color,
	publisher: manifest.author,
	creator: manifest.author,
	colorScheme: "light",
};

interface Props {
	children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={font.className}>
				<AppContextProvider>{children}</AppContextProvider>
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
