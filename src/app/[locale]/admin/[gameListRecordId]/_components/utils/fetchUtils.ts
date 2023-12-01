import { parseBggXmlApi2SearchResponse, parseBggXmlApi2ThingResponse } from '@code-bucket/board-game-geek';

export const fetchSearchData = async (parsedName: string) => {
  const res = await fetch(`https://api.geekdo.com/xmlapi2/search?query=${parsedName}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data', { cause: res.status });
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2SearchResponse(data);
  const results = bggResponse?.items;

  return results;
};

export const fetchThingData = async (thingId: number) => {
  const res = await fetch(`https://api.geekdo.com/xmlapi2/thing?id=${thingId}&versions=1&stats=1`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data', { cause: res.status });
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2ThingResponse(data);
  const thing = bggResponse?.item;

  return thing;
};
