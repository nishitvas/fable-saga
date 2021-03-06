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

export const fetchAllStories = async (useStaging=false, language="en") => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const limit = configuration.cms.limit;
  const props = "slug,title,thumbnail,metadata";
  const type = language === "kn" ? "kannadas" : "stories";
  const params = `objects?type=${type}&read_key=${readKey}&limit=${limit}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}

export const fetchStory = async (storySlug: string, useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const props = "slug,title,thumbnail,content,metadata";
  const params = `object/${storySlug}?read_key=${readKey}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}

export const fetchAllMembers = async (useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const limit = configuration.cms.limit;
  const props = "slug,title,thumbnail,content";
  const params = `objects?type=members&read_key=${readKey}&limit=${limit}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}

export const fetchHomeContent = async (useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const homeSlug = "home-page";
  const props = "slug,content";
  const params = `object/${homeSlug}?read_key=${readKey}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}

export const fetchFunFactsContent = async (useStaging=false) => {
  const endpoint = getEndpoint(useStaging);
  const readKey = getReadKey(useStaging);
  const homeSlug = "fun-facts";
  const props = "slug,content,thumbnail";
  const params = `object/${homeSlug}?read_key=${readKey}&props=${props}`;
  const response = await fetch(`${endpoint}/${params}`);
  return response.json();
}
