const userModel = require("../../model/user");

const findAll = async () => {
  
        const response = await userModel.findAll();

        if (response.length === 0) {
            throw new Error("Users not found");
        }
                
        return response;
    
};  

module.exports = findAll;

