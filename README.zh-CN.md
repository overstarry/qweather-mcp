# qweather-mcp
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/ae24a36c-f029-49b3-9c42-fc111021add0)
[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/overstarry-qweather-mcp-badge.png)](https://mseep.ai/app/overstarry-qweather-mcp)
[![smithery badge](https://smithery.ai/badge/@overstarry/qweather-mcp)](https://smithery.ai/server/@overstarry/qweather-mcp)

[English](./README.md) | 简体中文

> [和风天气](https://www.qweather.com/) API 的 MCP 服务器，通过模型上下文协议（Model Context Protocol，MCP）提供全面的天气信息查询功能。

## ✨ 特性

- 🌤️ 实时天气查询
- 📅 多天天气预报（3/7/10/15/30天）
- 🔑 简单的API密钥配置
- 🔌 自定义API基础URL支持
- 🛠️ 完整的工具集成

## 📦 安装

### 通过 Smithery 安装

推荐：使用 [Smithery](https://smithery.ai/server/@overstarry/qweather-mcp) 为 Claude Desktop 自动安装：

```bash
npx -y @smithery/cli install @overstarry/qweather-mcp --client claude
```

### 手动配置

1. 首先，从[和风天气控制台](https://console.qweather.com/)获取您的API密钥。

2. 启动服务器：

```bash
# stdio 服务器
npx -y qweather-mcp
```

3. 配置环境变量：

```bash
QWEATHER_API_BASE=https://api.qweather.com
QWEATHER_API_KEY=<your-api-key>
```

### JSON 配置

在您的配置文件中添加：

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

## 🛠️ 可用工具

### get-weather-now

获取指定位置的实时天气信息。

### get-weather-forecast

获取指定位置的天气预报信息，支持多种预报天数：
- 3天预报
- 7天预报
- 10天预报
- 15天预报
- 30天预报

预报数据包括：
- 温度范围（最低/最高）
- 日间/夜间天气状况
- 日出/日落时间
- 降水量
- 湿度
- 风况
- 紫外线指数

### get-minutely-precipitation

提供未来2小时的分钟级降水预报，包括：
- 降水类型（雨/雪）
- 每分钟降水量
- 精确的时间预测
- 实时更新的预报描述

### get-hourly-forecast

提供24小时、72小时或168小时的逐小时天气预报，包括：
- 温度变化
- 天气状况
- 风力风向
- 相对湿度
- 大气压
- 降水概率
- 云量覆盖

### get-weather-warning

提供实时天气预警信息，包括：
- 预警发布机构
- 预警级别和类型
- 预警详细内容
- 预警有效期
- 相关建议

### get-weather-indices

提供天气生活指数信息，支持多种指数类型：
- 运动指数
- 洗车指数
- 穿衣指数
- 钓鱼指数
- 紫外线指数
- 旅游指数
- 过敏指数
等16种生活指数

### get-air-quality

提供实时空气质量数据，包括：
- AQI指数
- 空气质量等级
- 主要污染物
- 健康建议
- 污染物浓度

### get-air-quality-hourly

提供未来24小时的逐小时空气质量预报：
- 每小时AQI预测
- 污染物浓度变化
- 健康影响评估
- 防护建议

### get-air-quality-daily

提供未来3天的空气质量预报：
- 每日AQI预测
- 主要污染物预测
- 空气质量等级变化
- 健康防护建议

## 🤝 贡献

欢迎提出问题和改进建议！请查看我们的贡献指南。

## 📄 许可证

MIT

## 🔗 相关链接

- [和风天气官网](https://www.qweather.com/)
- [API文档](https://dev.qweather.com/)
- [控制台](https://console.qweather.com/) 