# qweather-mcp

MCP server for [QWeather](https://www.qweather.com/) API.

This project provides weather information query capabilities through Model Context Protocol (MCP).

## Usage

Get your API Key [here](https://console.qweather.com/).

### Configure manually

```bash
# stdio server
npx -y qweather-mcp

```

Environment variables:

```
QWEATHER_API_BASE=https://api.qweather.com
QWEATHER_API_KEY=<your-api-key>
```

### JSON config

```json
{
  "mcpServers": {
    "qweather": {
      "command": "npx",
      "args": ["-y", "qweather-mcp"],
      "env": {
        "QWEATHER_API_BASE": "https://api.qweather.com",
        "QWEATHER_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

### Available Tools

- `lookup-city`: Look up city information by name
- `get-weather-now`: Get current weather for a location

## License

MIT.
