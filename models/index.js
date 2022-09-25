// import models
const Event = require("./Event");
const User = require("./User");
const Item = require("./Item");

// user and event association
User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

// event and vote association
Item.belongsTo(Event, {
  foreignKey: "event_id",
});

Event.hasMany(Item, {
  foreignKey: "event_id",
});

Item.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Item, {
    foreignKey: "user_id",
});

module.exports = {
  Event,
  User,
  Item,
};
