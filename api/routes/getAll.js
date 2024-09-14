// Import supabase instance
const supabase = require("../../supabaseInstance");

const cache = {};

const getAll = async (request, response, next) => {
  try {
    if (cache["snacks"]) {
      console.log("CACHE HIT");
      return response.json(cache["snacks"]);
    }

    const res = await supabase.get("/snacks");

    // Add the response data to our cache
    cache["snacks"] = res.data;

    console.log("DATA CACHED");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
