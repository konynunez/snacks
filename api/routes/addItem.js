const addItem = async (request, response, next) => {
  try {
    //destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;

    //Error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    //Create a new object with a new ID
    const newSnack = {
      //id: SNACKS.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };

    //Send the new snack object to our SQL database
    const res = await supabase.post("/snacks", newSnack);

    response.status(201).json(newSnack);
  } catch (error) {
    next(error);
  }
};

module.exports = addItem;
