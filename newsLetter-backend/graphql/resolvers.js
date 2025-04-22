// graphql/resolvers.js
const Post = require('../models/post.model');
const Subscriber = require('../models/subscriber.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server-express');

module.exports = {
  Query: {
    // only return posts owned by logged-in user
    posts: (_, __, { userId }) => Post.find({ user: userId }).sort({ createdAt: -1 }),
    subscribers: (_, __, { userId }) =>
      Subscriber.find({ user: userId }).sort({ createdAt: -1 }),

    post: (_, { id }, { userId }) =>
      Post.findOne({ _id: id, user: userId }),

    subscriber: (_, { id }, { userId }) =>
      Subscriber.findOne({ _id: id, user: userId }),

    me: (_, __, { userId }) => {
      const u = User.findById(userId);
      if (!u) throw new AuthenticationError('User not found');
      return u;
    },
  },

  Mutation: {
    async signup(_, { name, email, password }) {
      const existing = await User.findOne({ email });
      if (existing) throw new UserInputError('Email already in use');
      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({ name, email, password: hash });
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },

    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) throw new AuthenticationError('Invalid credentials');
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },

    async createPost(_, args, { userId }) {
      const data = { ...args, user: userId };
      const post = await Post.create(data);
      return post;
    },

    async updatePost(_, { id, ...updates }, { userId }) {
      const post = await Post.findOneAndUpdate(
        { _id: id, user: userId },
        updates,
        { new: true }
      );
      if (!post) throw new UserInputError('Post not found or not authorized');
      return post;
    },

    async deletePost(_, { id }, { userId }) {
      const res = await Post.deleteOne({ _id: id, user: userId });
      return res.deletedCount === 1;
    },

    async createSubscriber(_, { email, name, status }, { userId }) {
      const exists = await Subscriber.findOne({ email, user: userId });
      if (exists) throw new UserInputError('Subscriber already exists');
      const sub = await Subscriber.create({ email, name, status, user: userId });
      return sub;
    },

    async deleteSubscriber(_, { id }, { userId }) {
      const res = await Subscriber.deleteOne({ _id: id, user: userId });
      return res.deletedCount === 1;
    },
  },

  // if you want you can wire up createdBy -> User type resolution here
};
