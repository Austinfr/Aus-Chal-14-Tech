const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let now = new Date();

  for(let post of postData){
    let person = await User.findByPk(post.user_id);
    post.postStamp = `Created by ${person.name} on ${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`;
  }

  await Post.bulkCreate(postData);

  process.exit(0);
};

seedDatabase();