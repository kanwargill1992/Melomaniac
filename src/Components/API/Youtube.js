import youtubeSearch from "simple-youtube-api";

const API_KEY = process.env.YOU_TUBE_API;

export const getTechnoList = async () => {
  const ob = new youtubeSearch(API_KEY);

  const data = await ob.searchVideos("techno+house", 5).catch((e) => {
    console.log(e);
  });

  return await data;
};

export const getEricSongs = async () => {
  const ob = new youtubeSearch(API_KEY);

  const data = await ob.searchVideos("eric+prydz", 5).catch((e) => {
    console.log(e);
  });

  return await data;
};

export const getBorisSongs = async () => {
  const ob = new youtubeSearch(API_KEY);

  const data = await ob.searchVideos("boris+brejha", 5).catch((e) => {
    console.log(e);
  });

  return await data;
};

export const getHouseList = async () => {
  const ob = new youtubeSearch(API_KEY);

  const data = await ob.searchVideos("tech+house", 5).catch((e) => {
    console.log(e);
  });

  return await data;
};

export const getSearchData = async (query) => {
  const ob = new youtubeSearch(API_KEY);

  const data = await ob.searchVideos(query + " song", 3).catch((e) => {
    console.log(e);
  });

  return await data;
};
