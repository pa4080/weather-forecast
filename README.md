# Weather Forecast

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8d5d5f4034024a0ba400a9c000fe5daf)](https://app.codacy.com/gh/metalevel-tech/prj-nextjs-weather-forecast/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

**The purpose of the project is to satisfy an exam task for a job interview: [assignment](.assignment/task-assignment.md). For more information about the project see the [Workflow](#workflow) section.**

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Workflow

- [x] **Do initial research about the project [3h]**
- APIs. Apparently the best public weather API is [OpenWeatherMap One Call API 3.0](https://openweathermap.org/api/one-call-3), but before conclude that I've tested few others.
- Basic design, and icon pack research:
  - [Weather Icons by Erik Flowers](https://erikflowers.github.io/weather-icons/)
  - [Weather Icons React @npm](https://www.npmjs.com/package/weather-icons-react) | [Weather Icons React @home](https://najens.github.io/weather-icons-react/) | [react-weather-illustrations @npm](https://www.npmjs.com/package/react-weather-illustrations) < [@bybas/weather-icons @npm](https://www.npmjs.com/package/@bybas/weather-icons)
- Node.js packages
- [x] **Setup the project [3h]**
- Create by `npx create-next-app --typescript`.
- Add `chadcn-ui` and setup TailwindCSS.
- Create GitHub repository and link the project.
- Create Vercel project and link to the repository.
- Redirect the domain to Vercel via Cloudflare admin panel.
- Create SVG logo and favicon.
- etc.
- [x] **Deal wit the City/Country selection - create own API [10h]**
- Test few NPM packages that provides such lists and functionality.
- Try to use [nicholidev/country-cities](https://github.com/nicholidev/country-cities) and [venkatmcajj/react-country-state-city](https://github.com/venkatmcajj/react-country-state-city) packages.
- Unfortunately both doesn't fit well to the project requirements. At least the data files are hosted outside the project...
- Also the Chadcn-ui/Radix Select component doesn't behave as it is expected with city lists longer than 1000 items.
- Create own Next.js API endpoint to provide the data, thus some of the heavy tasks will be processed (and cached) on the server side. For example the City's data file is about 24 MB.
- Create a dropdown select and accompanying components and logic that fits to the project requirements.
- [x] **Fetch and display the weather data [8h]**
- Setup the metadata and manifest.json.
- Create the [`useGeoDetector()`](hooks/useGeoDetector.ts) hook to detect the user's location.
- The hook uses the [browser's Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
- Also as fallback it uses the [ipapi.co](https://ipapi.co/) API, to detect the geolocation by IP address.
- In addition create the necessary Next.js API endpoint to provide the data, which must be fetched with private API key.
- Pass the data ot the [`<Select />`] and vice versa.
- Create the [`useWeatherData()`](hooks/useWeatherData.ts) hook to fetch the weather data.
- In addition create the necessary Next.js API endpoint... with private API key.
- Fetch da data and display it on the page, do tests with different locations by using the Tor network.
- Extend the functionality of the previously created [`<SelectDropdown />`](components/SelectDropdown.tsx) component to be used to switch also the display units.
- [x] **Setup and test the icon pack [2h]**
- [Weather Icons by Erik Flowers](https://erikflowers.github.io/weather-icons/)
- [Weather Icons by Erik Flowers GitHub](https://github.com/erikflowers/weather-icons)
- [Weather Icons by Erik Flowers API integration > Open Weather Map](https://erikflowers.github.io/weather-icons/api-list.html)
- [ ] **Create the UI [8h]**

## Credits

The Country/State/City data is taken from [venkatmcajj/react-country-state-city](https://github.com/venkatmcajj/react-country-state-city). Later I fount that probably the origin of this data is [mledoze/countries](https://github.com/mledoze/countries/tree/master/data).

Also the code of the [`<SelectDropdown />`](components/SelectDropdown.tsx) component and of the [`geo-type.ts`](types/geo-types.ts) file is particularly based on the code of the analogus component in [venkatmcajj/react-country-state-city](https://github.com/venkatmcajj/react-country-state-city). Here is an improved and TailwindCSS adapted version of the mentioned code.

Here I'm using the [**"Weather Icons"**](https://github.com/erikflowers/weather-icons/tree/master) pack which is licensed licensed under [SIL OFL 1.1](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).
