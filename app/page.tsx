import Image from "next/image";

import logo from "../public/favicon.svg";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<Image alt="logo" height={320} src={logo} width={320} />
		</main>
	);
}
