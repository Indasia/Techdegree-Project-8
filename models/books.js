'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        not empty: {msg: "Title is required"}}
    },
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};