module.exports = (sequelize, DataTypes) => sequelize.define(
  'users',
  {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'users'
  }
)
