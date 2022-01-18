module.exports = (sequelize, DataTypes) => {
    const { isEmail } = require('validator');
    const User = sequelize.define("user", {
      
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    })

    return User

}

