// Import supabase instance
const Supabase = require("../../supabaseInstance");

const updateById = async (request, response, next) => {
  try {
    // Destructure our request.body object
    const { name, description, price, category, InStock } = request.body;

    // Error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !InStock) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    // Update object to be sent to Supabase
    const updatedSnack = {
      name,
      description,
      price,
      category,
      inStock: InStock, // Correct case for inStock field
    };

    // Make sure to use the correct Supabase method to update a record
    const { data, error } = await Supabase.from("snacks") // Make sure 'snacks' is the correct table name
      .update(updatedSnack)
      .eq("id", request.params.id); // Match by id in the URL

    // Handle potential errors from Supabase
    if (error) {
      return response.status(500).json({ error: error.message });
    }

    // If no data is returned, it means the snack with the given id was not found
    if (!data.length) {
      return response.status(404).json({ error: "Snack not found" });
    }

    // Send updated snack data in response
    return response.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
