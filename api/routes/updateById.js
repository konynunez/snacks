const supabase = require("../../supabaseInstance");

const updateById = async (request, response, next) => {
  try {
    // Destructure our request.body object
    const { name, description, price, category, inStock } = request.body;

    // Error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || inStock === undefined) {
      return response.status(400).json({ message: "Missing required fields!" });
    }

    const updatedSnack = {
      name,
      description,
      price,
      category,
      inStock, // Ensure this field matches your table's column name
    };

    // Use PATCH method to update the snack in Supabase
    const { data, error } = await supabase
      .from("snacks")
      .update(updatedSnack)
      .eq("id", request.params.id);

    // Handle potential errors from Supabase
    if (error) {
      return response.status(500).json({ error: error.message });
    }

    // If no data is returned, it means the snack with the given id was not found
    if (data.length === 0) {
      return response.status(404).json({ message: "Snack not found" });
    }

    // Send updated snack data in response
    return response.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
