import { Schema } from "effect";
import { TrimmedNonEmptyString, TrimmedString } from "./baseSchemas";

export const GatewayChannelId = Schema.Literals([
  "deepseek",
  "siliconflow",
  "volcano",
  "tongyi",
  "kimi",
  "minimax",
  "custom",
]);
export type GatewayChannelId = typeof GatewayChannelId.Type;

export const GatewayChannelConfig = Schema.Struct({
  id: GatewayChannelId,
  name: TrimmedNonEmptyString,
  baseUrl: TrimmedString,
  model: TrimmedString,
  enabled: Schema.Boolean,
});
export type GatewayChannelConfig = typeof GatewayChannelConfig.Type;

export const DEFAULT_GATEWAY_CHANNELS: ReadonlyArray<GatewayChannelConfig> = [
  {
    id: "deepseek",
    name: "DeepSeek",
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
    enabled: true,
  },
  {
    id: "siliconflow",
    name: "硅基流动",
    baseUrl: "https://api.siliconflow.cn/v1",
    model: "",
    enabled: false,
  },
  {
    id: "volcano",
    name: "火山方舟",
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    model: "",
    enabled: false,
  },
  {
    id: "tongyi",
    name: "通义千问",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    model: "",
    enabled: false,
  },
  {
    id: "kimi",
    name: "Kimi",
    baseUrl: "https://api.moonshot.cn/v1",
    model: "",
    enabled: false,
  },
  {
    id: "minimax",
    name: "MiniMax",
    baseUrl: "https://api.minimaxi.com/v1",
    model: "",
    enabled: false,
  },
];

export const GatewayConfig = Schema.Struct({
  enabled: Schema.Boolean,
  activeChannelId: GatewayChannelId,
  channels: Schema.Array(GatewayChannelConfig),
});
export type GatewayConfig = typeof GatewayConfig.Type;

export const GatewayChannelPatch = Schema.Struct({
  id: GatewayChannelId,
  name: Schema.optionalKey(TrimmedNonEmptyString),
  baseUrl: Schema.optionalKey(TrimmedString),
  model: Schema.optionalKey(TrimmedString),
  enabled: Schema.optionalKey(Schema.Boolean),
});
export type GatewayChannelPatch = typeof GatewayChannelPatch.Type;

export const GatewayConfigPatch = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Boolean),
  activeChannelId: Schema.optionalKey(GatewayChannelId),
  channels: Schema.optionalKey(Schema.Array(GatewayChannelPatch)),
});
export type GatewayConfigPatch = typeof GatewayConfigPatch.Type;

export const GatewaySetApiKeyInput = Schema.Struct({
  channelId: GatewayChannelId,
  apiKey: TrimmedNonEmptyString,
});
export type GatewaySetApiKeyInput = typeof GatewaySetApiKeyInput.Type;

export const GatewayRemoveApiKeyInput = Schema.Struct({
  channelId: GatewayChannelId,
});
export type GatewayRemoveApiKeyInput = typeof GatewayRemoveApiKeyInput.Type;

export const GatewaySecretStatus = Schema.Struct({
  channelId: GatewayChannelId,
  hasApiKey: Schema.Boolean,
});
export type GatewaySecretStatus = typeof GatewaySecretStatus.Type;

export const GatewaySecretStatusResult = Schema.Struct({
  secrets: Schema.Array(GatewaySecretStatus),
});
export type GatewaySecretStatusResult = typeof GatewaySecretStatusResult.Type;
