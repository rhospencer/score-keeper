const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password, f_name, l_name} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: {text: 'Username already in use.', type: 'warning'}})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userId = await db.add_user([username, f_name, l_name])
        db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })

        req.session.user = {username, userId: userId[0].user_id}
        req.session.loggedIn = true
        res.status(201).send({message: {text: 'Registered and Logged In!', type: 'success'}, user: req.session.user, loggedIn: req.session.loggedIn})
    }
}