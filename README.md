# qweather-mcp

[![smithery badge](https://smithery.ai/badge/@overstarry/qweather-mcp)](https://smithery.ai/server/@overstarry/qweather-mcp)
MCP server for [QWeather](https://www.qweather.com/) API.

This project provides weather information query capabilities through Model Context Protocol (MCP).

## Usage

Get your API Key [here](https://console.qweather.com/).

### Installing via Smithery

To install qweather-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@overstarry/qweather-mcp):

```bash
npx -y @smithery/cli install @overstarry/qweather-mcp --client claude
```

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
