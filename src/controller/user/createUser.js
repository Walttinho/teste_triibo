const userService = require("../../service/user");
const create = async (req, res) => {

   try {
   const user = req.body

    const response = await userService.create(user)

    return res.status(201).json(response)
    
   } catch (error) {

    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
    
   }
   



}

module.exports = create

