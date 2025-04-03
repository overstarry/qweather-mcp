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

server.tool(
    "lookup-city",
    "Look up city information by name",
    {
        cityName: z.string().describe("Name of the city to look up"),
    },
    async ({ cityName }) => {
        const locationData = await makeQWeatherRequest<QWeatherLocationResponse>("/geo/v2/city/lookup", {
            location: cityName,
        });

        if (!locationData) {
            return {
                content: [
                    {
                        type: "text",
                        text: "API request failed",
                    },
                ],
            };
        }

        if (locationData.code !== "200") {
            return {
                content: [
                    {
                        type: "text",
                        text: `API returned error code: ${locationData.code}`,
                    },
                ],
            };
        }

        if (!locationData.location || locationData.location.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No relevant city information found",
                    },
                ],
            };
        }

        const cities = locationData.location.map(city =>
            [
                `City: ${city.name}`,
                `ID: ${city.id}`,
                `Location: ${city.adm1} ${city.adm2}`,
                `Coordinates: ${city.lat},${city.lon}`,
                "---"
            ].join("\n")
        );

        return {
            content: [
                {
                    type: "text",
                    text: `Query results:\n\n${cities.join("\n")}`,
                },
            ],
        };
    }
);

server.tool(
    "get-weather-now",
    "Get current weather for a location using QWeather API",
    {
        location: z.string().describe("Location ID for the city"),
    },
    async ({ location }) => {
        const weatherData = await makeQWeatherRequest<QWeatherNowResponse>("/v7/weather/now", {
            location,
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
            `Current Weather for location ${location}:`,
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

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});