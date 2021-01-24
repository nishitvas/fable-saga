interface BucketConfigurationType {
  endpoint: string,
  readKey: string
}

interface CMSType {
  baseEndpoint: string,
  useProduction: boolean,
  limit: number,
  staging: BucketConfigurationType,
  production: BucketConfigurationType
}

interface ConfigurationType {
  cms: CMSType
}

export const configuration: ConfigurationType = {
  cms: {
    baseEndpoint: "https://api.cosmicjs.com",
    useProduction: false,
    limit: 20,
    staging: {
      endpoint: "/v1/fable-saga-staging",
      readKey: "DoO04aYDKqvsanyL54ElpUDPQCbG3HBzqGsHIp7tQ0N6UHJqy5"
    },
    production: {
      endpoint: "/v1/fable-saga-production",
      readKey: "WPy98KpvZrXT6cIT46FGJxsFqzQLUVLiFDrCCbFzJqKHplUNPV"
    }
  }
}
