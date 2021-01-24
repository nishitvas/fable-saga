import { configuration } from './configuration';

const getBucketConfig = () => {
  if (configuration.cms.useProduction) {
    return configuration.cms.production;
  } else {
    return configuration.cms.staging;
  }
}

const getEndpoint = () => {
  return `${configuration.cms.baseEndpoint}${getBucketConfig().endpoint}`;
}

const getReadKey = () => {
  return getBucketConfig().readKey;
}

export const fetchAllStories = async () => {
  const endpoint = getEndpoint();
  const readKey = getReadKey();
  const limit = configuration.cms.limit;
  const props = "slug,title,thumbnail,metadata";
  const params = `objects?type=stories&read_key=${readKey}&limit=${limit}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}
