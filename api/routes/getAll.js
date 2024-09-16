// Import supabase instance
const supabase = require("../../supabaseInstance");

const cache = {};

const getAll = async (request, response, next) => {
  try {
    if (cache["snacks"]) {
      console.log("CACHE MONEY!!!");
      return response.json(cache["snacks"]);
    }

    const res = await supabase.get("/snacks");

    // Add the response data to our cache
    cache["snacks"] = res.data;

    console.log("ADDED TO CACHE");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
