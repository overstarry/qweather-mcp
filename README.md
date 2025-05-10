# qweather-mcp
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/ae24a36c-f029-49b3-9c42-fc111021add0)
[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/overstarry-qweather-mcp-badge.png)](https://mseep.ai/app/overstarry-qweather-mcp)
[![smithery badge](https://smithery.ai/badge/@overstarry/qweather-mcp)](https://smithery.ai/server/@overstarry/qweather-mcp)

English | [简体中文](./README.zh-CN.md)

> MCP server for [QWeather](https://www.qweather.com/) API, providing comprehensive weather information query capabilities through Model Context Protocol (MCP).

## ✨ Features

- 🌤️ Real-time weather queries
- 📅 Multi-day weather forecasts (3/7/10/15/30 days)
- 🔑 Simple API key configuration
- 🔌 Custom API base URL support
- 🛠️ Complete tool integration

## 📦 Installation

### Via Smithery

Recommended: Install automatically for Claude Desktop using [Smithery](https://smithery.ai/server/@overstarry/qweather-mcp):

```bash
npx -y @smithery/cli install @overstarry/qweather-mcp --client claude
```

### Manual Configuration

1. First, get your API Key from the [QWeather Console](https://console.qweather.com/).

2. Start the server:

```bash
# stdio server
npx -y qweather-mcp
```

3. Configure environment variables:

```bash
QWEATHER_API_BASE=https://api.qweather.com
QWEATHER_API_KEY=<your-api-key>
```

### JSON Configuration

Add to your configuration file:

```json
{
  "mcpServers": {
    "qweather": {
      "command": "npx",
      "args": ["-y", "qweather-mcp"],
      "env": {
        "QWEATHER_API_BASE": "<your-api-url>",
        "QWEATHER_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

## 🛠️ Available Tools

### get-weather-now

Get current weather information for a specified location.

### get-weather-forecast

Get weather forecast information for a specified location with customizable forecast days:
- 3-day forecast
- 7-day forecast
- 10-day forecast
- 15-day forecast
- 30-day forecast

Forecast data includes:
- Temperature range (min/max)
- Day/night weather conditions
- Sunrise/sunset times
- Precipitation
- Humidity
- Wind conditions
- UV index

### get-minutely-precipitation

Provides minute-by-minute precipitation forecast for the next 2 hours, including:
- Precipitation type (rain/snow)
- Precipitation amount per minute
- Precise time predictions
- Real-time forecast descriptions

### get-hourly-forecast

Provides hourly weather forecasts for 24, 72, or 168 hours, including:
- Temperature changes
- Weather conditions
- Wind direction and force
- Relative humidity
- Atmospheric pressure
- Precipitation probability
- Cloud coverage

### get-weather-warning

Provides real-time weather warning information, including:
- Warning issuing authority
- Warning level and type
- Detailed warning content
- Warning validity period
- Related recommendations

### get-weather-indices

Provides weather life indices information, supporting various index types:
- Sports index
- Car wash index
- Dressing index
- Fishing index
- UV index
- Tourism index
- Allergy index
and 16 other life indices

### get-air-quality

Provides real-time air quality data, including:
- AQI index
- Air quality level
- Primary pollutants
- Health advice
- Pollutant concentrations

### get-air-quality-hourly

Provides hourly air quality forecast for the next 24 hours:
- Hourly AQI predictions
- Pollutant concentration changes
- Health impact assessment
- Protection recommendations

### get-air-quality-daily

Provides air quality forecast for the next 3 days:
- Daily AQI predictions
- Primary pollutant forecasts
- Air quality level changes
- Health protection advice

## 🤝 Contributing

Issues and improvements are welcome! Please check our contribution guidelines.

## 📄 License

MIT

## 🔗 Related Links

- [QWeather Official Website](https://www.qweather.com/)
- [API Documentation](https://dev.qweather.com/)
- [Console](https://console.qweather.com/)
