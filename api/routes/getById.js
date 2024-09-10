// Import Supabase Instance

const supabase = require("../../supabaseInstance");

const getById = async (request, response, next) => {
  try {
    const res = await supabase.get(`/snacks?id=eq.${request.params.id}`);

    //error handling
    if (!response.data.length) {
      return response.status(404).json({ message: "Snack do not exist!" });
    }

    //Send Snack Object
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
