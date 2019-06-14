'use strict';

module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: { not empty: { msg: "Title is required" } }
    },
    author: {
      type: DataTypes.STRING,
      validate: { not empty: { msg: "Author is required" } }
    },
    genre: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER
    },
  });

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};