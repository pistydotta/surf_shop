const User = require("../models/user")
const Post = require('../models/post');
const passport = require('passport')
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
            let user = await User.register(new User(req.body), req.body.password)
            req.login(user, function (err) {
                if (err) return next(err)
                req.session.success = `Welcome to surf shop ${user.username}!`
                res.redirect('/')
            })
        } catch (err) {
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
    }
}