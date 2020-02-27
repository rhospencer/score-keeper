const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password, f_name, l_name} = req.body

        console.log(req.body)

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: {text: 'Username already in use.', icon: 'warning'}})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userId = await db.add_user([username, f_name, l_name])
        db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })

        req.session.user = {username, user_id: userId[0].user_id}
        req.session.loggedIn = true
        res.status(201).send({message: {text: 'Registered and Logged In!', icon: 'success'}, user: req.session.user, loggedIn: req.session.loggedIn})
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_user(username)
        if (!user[0]) return res.status(200).send({message: {text: 'Username does not exist.', icon: 'error'}})

        const result = bcrypt.compareSync(password, user[0].hash)

        if (!result) return res.status(200).send({message: {text: 'Incorrect Username or Password', icon: 'error'}})
        req.session.user = {username, user_id: user[0].user_id}
        req.session.loggedIn = true
        res.status(200).send({message: {text: 'Logged In!', icon: 'success'}, user: req.session.user, loggedIn: req.session.loggedIn})
    },
    
    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: {text: 'Logged Out!', icon: 'success'}, loggedIn: false})
    },

    async userInfo(req, res) {
        return res.status(200).send({user: req.session.user, loggedIn: req.session.loggedIn})
    }
}