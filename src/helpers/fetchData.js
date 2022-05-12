import client from "./client";

export const fetchingData = async (offset, perPage, setData, setPageCount) => {
  try {
    const endOffset = offset === 0 ? offset : offset * perPage;
    const result = await client.get("/groups", {
      limit: perPage,
      offset: endOffset,
    });
    setData(result.data);
    setPageCount(Math.ceil(result.pagination.count / perPage));
  } catch (error) {
    console.log(error);
  }
};
