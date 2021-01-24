import { configuration } from './configuration';

const getBucketConfig = (useStaging=false) => {
  if (useStaging) {
    return configuration.cms.staging;
  }
  if (configuration.cms.useProduction) {
    return configuration.cms.production;
  } else {
    return configuration.cms.staging;
  }
}

const getEndpoint = (useStaging=false) => {
  return `${configuration.cms.baseEndpoint}${getBucketConfig(useStaging).endpoint}`;
}

const getReadKey = (useStaging=false) => {
  return getBucketConfig(useStaging).readKey;
}

export const fetchAllStories = async (useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const limit = configuration.cms.limit;
  const props = "slug,title,thumbnail,metadata";
  const params = `objects?type=stories&read_key=${readKey}&limit=${limit}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}

export const fetchStory = async (storySlug: string, useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const props = "slug,title,thumbnail,content,metadata";
  const params = `object/${storySlug}?read_key=${readKey}&&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}
