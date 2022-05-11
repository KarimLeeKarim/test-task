import client from "./client";

export const fetchingData = async (dataOffset, setData, setPageCount, perPage) => {
  try {
    const endOffset = dataOffset + perPage;
    const result = await client.get("/groups", { limit: 0, offset: 0 });
    setData(result.data.slice(dataOffset, endOffset));
    setPageCount(Math.ceil(result.pagination.count / perPage));
  } catch (error) {
    console.log(error);
  }
};
