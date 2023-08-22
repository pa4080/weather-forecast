import React from "react";

import Widget from "@/components/Widget";

const Home: React.FC = () => {
	return (
		<main
			className="flex min-h-screen items-center justify-center bg-fixed bg-no-repeat bg-center"
			// style={{
			// 	backgroundImage: "url(/favicon.svg)",
			// }}
		>
			<Widget />
		</main>
	);
};

export default Home;
