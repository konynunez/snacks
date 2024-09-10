const updateById = async (request, response, next) => {
  try {
    //Destructure our request.body object
    const { name, description, price, category, InStock } = request.body;

    //Error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !InStock) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    const updateBeverage = {
      //id: SNACKS.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };

    const res = await Supabase.patch(
      `/snacks?id=eq.${request.params.id}`,
      updateSnack
    );
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
