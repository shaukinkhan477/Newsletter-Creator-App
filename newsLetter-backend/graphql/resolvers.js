
const Post = require('../models/post.model');
const Subscriber = require('../models/subscriber.model');
const User = require('../models/user.model');

const resolvers = {
  Query: {
    // Fetch all records
    posts: async () => await Post.find(),
    subscribers: async () => await Subscriber.find(),
    users: async () => await User.find(),

    // Fetch by id
    post: async (_, { id }) => await Post.findById(id),
    subscriber: async (_, { id }) => await Subscriber.findById(id),
    user: async (_, { id }) => await User.findById(id),
  },

  Mutation: {
    createPost: async (_, { title, subject, preheader, content }) => {
      const post = new Post({ title, subject, preheader, content });
      return await post.save();
    },
    createSubscriber: async (_, { email, name, status }) => {
      const subscriber = new Subscriber({ email, name, status });
      return await subscriber.save();
    },
    createUser: async (_, { name, email, password }) => {
      // Here you may want to hash the password before saving
      const user = new User({ name, email, password });
      return await user.save();
    },
  },
};

module.exports = resolvers;
