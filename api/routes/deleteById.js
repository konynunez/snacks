//Import supabase Instance
const supabase = require("../../supabaseInstance");

const deleteById = async (request, response, next) => {
  try {
    const res = await supabase.delete(`/snacks?id=eq.${request.params.id}`);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
