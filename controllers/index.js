const User = require("../models/user")
const Post = require('../models/post');
const passport = require('passport')
const util = require('util');
const { cloudinary } = require('../cloudinary/index')
const { deleteProfileImage } = require('../middleware/index')
module.exports = {
    async landingPage(req, res, next) {
        // find all posts to populate into map
        const posts = await Post.find({});
        // render home page and pass in posts
        res.render('index', { posts, mapBoxToken: process.env.MAPBOX_TOKEN, title: 'Surf Shop - Home' });
    },

    getRegister(req, res, next) {
        res.render('register', { title: 'Register', username: '', email: '' })
    },

    async postRegister(req, res, next) {
        try {
            if (req.file) {
                const { secure_url, public_id } = req.file
                req.body.image = {
                    secure_url, public_id  
                }
            }
            let user = await User.register(new User(req.body), req.body.password)
            req.login(user, function (err) {
                if (err) return next(err)
                req.session.success = `Welcome to surf shop ${user.username}!`
                res.redirect('/')
            })
        } catch (err) {
            deleteProfileImage(req)
            const { username, email } = req.body
            let error = err.message
            if (error.includes('index: email_1 dup key')) {
                error = 'This email is already taken'
            }
            res.render('register', { title: 'Register', error, username, email })
        }
    },

    getLogin(req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/')
        if (req.query.returnTo) req.session.redirectTo = req.headers.referer
        res.render('login', { title: 'Login' })
    },

    async postLogin(req, res, next) {
        const { username, password } = req.body
        const { user, error } = await User.authenticate()(username, password)
        if (!user && error) return next(error)
        req.login(user, function (err) {
            if (err) return next(err)
            req.session.success = `Welcome back ${username}`
            const redirectUrl = req.session.redirectTo || '/'
            delete req.session.redirectTo
            res.redirect(redirectUrl)
        })
    },

    getLogout(req, res, next) {
        req.logout()
        res.redirect("/")
    },

    async getProfile(req, res, next) {
        const posts = await Post.find().where('author').equals(req.user._id).limit(10).exec()
        res.render('profile', { posts })
    },

    async updateProfile(req, res, next) {
        // destructure username and email from req.body
        const {
            username,
            email
        } = req.body;
        // destructure user object from res.locals
        const { user } = res.locals;
        // check if username or email need to be updated
        if (username) user.username = username;
        if (email) user.email = email;
        if (req.file) {
            if(user.image.public_id) await cloudinary.v2.uploader.destroy(user.image.public_id)
            const {secure_url, public_id} = req.file
            user.image = {secure_url, public_id}
        }
        // save the updated user to the database
        await user.save();
        // promsify req.login
        const login = util.promisify(req.login.bind(req));
        // log the user back in with new info
        await login(user);
        // redirect to /profile with a success flash message
        req.session.success = 'Profile successfully updated!';
        res.redirect('/profile');
    }
}