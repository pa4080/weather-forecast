import React from "react";

import { Inter } from "next/font/google";

import "./globals.css";
import manifest from "@/public/manifest.json";

import { AppContextProvider } from "@/contexts/AppContext";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<AppContextProvider>{children}</AppContextProvider>
			</body>
		</html>
	);
};

export default RootLayout;
