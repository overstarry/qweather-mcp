import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const QWEATHER_API_BASE = process.env.QWEATHER_API_BASE
if (!QWEATHER_API_BASE) {
    throw new Error("QWEATHER_API_BASE env is not set")
}
const QWEATHER_API_KEY = process.env.QWEATHER_API_KEY
if (!QWEATHER_API_KEY) {
    throw new Error("QWEATHER_API_KEY env is not set")
}

// Create server instance
const server = new McpServer({
    name: "qweather",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

async function makeQWeatherRequest<T>(endpoint: string, params: Record<string, string>): Promise<T | null> {
    const url = new URL(`${QWEATHER_API_BASE}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'X-QW-Api-Key': QWEATHER_API_KEY as string
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error("Error making QWeather request:", error);
        return null;
    }
}

interface QWeatherNowResponse {
    code: string;
    updateTime: string;
    now: {
        obsTime: string;
        temp: string;
        feelsLike: string;
        text: string;
        windDir: string;
        windScale: string;
        humidity: string;
        precip: string;
        pressure: string;
        vis: string;
    };
}

interface QWeatherDailyResponse {
    code: string;
    updateTime: string;
    fxLink: string;
    daily: Array<{
        fxDate: string;
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moonPhase: string;
        moonPhaseIcon: string;
        tempMax: string;
        tempMin: string;
        iconDay: string;
        textDay: string;
        iconNight: string;
        textNight: string;
        wind360Day: string;
        windDirDay: string;
        windScaleDay: string;
        windSpeedDay: string;
        wind360Night: string;
        windDirNight: string;
        windScaleNight: string;
        windSpeedNight: string;
        humidity: string;
        precip: string;
        pressure: string;
        vis: string;
        cloud: string;
        uvIndex: string;
    }>;
}

interface QWeatherLocationResponse {
    code: string;
    location: Array<{
        name: string;
        id: string;
        lat: string;
        lon: string;
        adm2: string;
        adm1: string;
        country: string;
        type: string;
        rank: string;
    }>;
}

interface QWeatherMinutelyResponse {
    code: string;
    updateTime: string;
    fxLink: string;
    summary: string;
    minutely: Array<{
        fxTime: string;
        precip: string;
        type: string;
    }>;
}

server.tool(
    "get-weather-now",
    "Get current weather for a location using QWeather API",
    {
        cityName: z.string().describe("Name of the city to look up weather for"),
    },
    async ({ cityName }) => {
        // First, look up the city to get its ID
        const locationData = await makeQWeatherRequest<QWeatherLocationResponse>("/geo/v2/city/lookup", {
            location: cityName,
        });

        if (!locationData || locationData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to find the specified city",
                    },
                ],
            };
        }

        if (!locationData.location || locationData.location.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No matching city found",
                    },
                ],
            };
        }

        // Use the first matching city's ID
        const cityId = locationData.location[0].id;
        const cityInfo = locationData.location[0];

        const weatherData = await makeQWeatherRequest<QWeatherNowResponse>("/v7/weather/now", {
            location: cityId,
        });

        if (!weatherData || weatherData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve current weather data",
                    },
                ],
            };
        }

        const now = weatherData.now;
        const weatherText = [
            `Current Weather for ${cityInfo.name} (${cityInfo.adm1} ${cityInfo.adm2}):`,
            `Temperature: ${now.temp}°C (Feels like: ${now.feelsLike}°C)`,
            `Condition: ${now.text}`,
            `Wind: ${now.windDir} Scale ${now.windScale}`,
            `Humidity: ${now.humidity}%`,
            `Precipitation: ${now.precip}mm`,
            `Pressure: ${now.pressure}hPa`,
            `Visibility: ${now.vis}km`,
            `Last Updated: ${weatherData.updateTime}`,
        ].join("\n");

        return {
            content: [
                {
                    type: "text",
                    text: weatherText,
                },
            ],
        };
    }
);

server.tool(
    "get-weather-forecast",
    "Get weather forecast for a location using QWeather API",
    {
        cityName: z.string().describe("Name of the city to look up weather for"),
        days: z.enum(["3d", "7d", "10d", "15d", "30d"]).describe("Number of forecast days"),
    },
    async ({ cityName, days }) => {
        // First, look up the city to get its ID
        const locationData = await makeQWeatherRequest<QWeatherLocationResponse>("/geo/v2/city/lookup", {
            location: cityName,
        });

        if (!locationData || locationData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to find the specified city",
                    },
                ],
            };
        }

        if (!locationData.location || locationData.location.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No matching city found",
                    },
                ],
            };
        }

        // Use the first matching city's ID
        const cityId = locationData.location[0].id;
        const cityInfo = locationData.location[0];

        const weatherData = await makeQWeatherRequest<QWeatherDailyResponse>(`/v7/weather/${days}`, {
            location: cityId,
        });

        if (!weatherData || weatherData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve weather forecast data",
                    },
                ],
            };
        }

        const forecastText = [
            `${days.replace('d', ' Days')} Weather Forecast for ${cityInfo.name} (${cityInfo.adm1} ${cityInfo.adm2}):`,
            `Last Updated: ${weatherData.updateTime}`,
            '',
            ...weatherData.daily.map(day => [
                `Date: ${day.fxDate}`,
                `Temperature: ${day.tempMin}°C ~ ${day.tempMax}°C`,
                `Daytime: ${day.textDay}`,
                `Night: ${day.textNight}`,
                `Sunrise: ${day.sunrise || 'N/A'}  Sunset: ${day.sunset || 'N/A'}`,
                `Precipitation: ${day.precip}mm`,
                `Humidity: ${day.humidity}%`,
                `Wind: Day-${day.windDirDay}(Scale ${day.windScaleDay}), Night-${day.windDirNight}(Scale ${day.windScaleNight})`,
                `UV Index: ${day.uvIndex}`,
                '---'
            ].join('\n'))
        ].join('\n');

        return {
            content: [
                {
                    type: "text",
                    text: forecastText,
                },
            ],
        };
    }
);

server.tool(
    "get-minutely-precipitation",
    "Get minutely precipitation forecast for a location using QWeather API",
    {
        cityName: z.string().describe("Name of the city to look up precipitation forecast for"),
    },
    async ({ cityName }) => {
        // First, look up the city to get its location coordinates
        const locationData = await makeQWeatherRequest<QWeatherLocationResponse>("/geo/v2/city/lookup", {
            location: cityName,
        });

        if (!locationData || locationData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to find the specified city",
                    },
                ],
            };
        }

        if (!locationData.location || locationData.location.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No matching city found",
                    },
                ],
            };
        }

        // Use the first matching city's coordinates
        const cityInfo = locationData.location[0];
        const location = `${cityInfo.lon},${cityInfo.lat}`;

        const precipData = await makeQWeatherRequest<QWeatherMinutelyResponse>("/v7/minutely/5m", {
            location: location,
        });

        if (!precipData || precipData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve precipitation forecast data",
                    },
                ],
            };
        }

        const precipText = [
            `Minutely Precipitation Forecast - ${cityInfo.name} (${cityInfo.adm1} ${cityInfo.adm2}):`,
            `Forecast Description: ${precipData.summary}`,
            `Last Updated: ${precipData.updateTime}`,
            '',
            '2-Hour Precipitation Forecast:',
            ...precipData.minutely.map(minute =>
                `Time: ${minute.fxTime.split('T')[1].split('+')[0]} - ${minute.type === 'rain' ? 'Rain' : 'Snow'}: ${minute.precip}mm`
            ),
            '',
            `Data Source: ${precipData.fxLink}`,
        ].join('\n');

        return {
            content: [
                {
                    type: "text",
                    text: precipText,
                },
            ],
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});