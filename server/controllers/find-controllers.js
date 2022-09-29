const pool = require('../settings/db')
const config = require('config')
const {validationResult, check} = require("express-validator");

const {
    REQ_USERS, REQ_ID, REQ_EMAIL, REQ_PASS,
    REQ_LOGIN, REQ_REGISTRATION, REQ_AVATAR
} = require ('dotenv').config().parsed


class FindControllers {

    async findPageAllUsers(req, res) {
        const {page:pageNumber, limit: pageSize, userId, value} = req.query
        try {
            console.log( '📌:findPageAllUsers',pageNumber,pageSize,userId, value,'🌴 🏁')

            let userValue = ''
            if (value) {userValue = value}
            
            // SELECT users.id, users.login FROM users WHERE NOT users.id LIKE userId AND users.login LIKE '%%' 
            const numberOfResults = await pool.query('SELECT ??.??, ??.?? FROM ?? WHERE NOT ??.?? LIKE ? AND ??.?? LIKE ?', [
                REQ_USERS, REQ_ID,
                REQ_USERS, REQ_LOGIN,
                REQ_USERS,
                REQ_USERS, REQ_ID,
                userId,
                REQ_USERS, REQ_LOGIN,
                '%'+ userValue + '%'
            ]).then((data) => {
                return data[0].length
            })



            const pageLimit = pageNumber * pageSize - pageSize // номер диапазона для sql-запроса

            //SELECT users.id,login,avatar FROM users WHERE NOT users.id LIKE userId AND users.login LIKE '%userValue%' LIMIT 1,10
            const usersOfResults = await pool.query('SELECT ??.??,??,?? FROM ?? WHERE NOT ??.?? LIKE ? AND ??.?? LIKE ? LIMIT ?,?', [
                REQ_USERS,REQ_ID,
                REQ_LOGIN,REQ_AVATAR,
                REQ_USERS,
                REQ_USERS,REQ_ID,
                userId,
                REQ_USERS,REQ_LOGIN,
                '%'+ userValue + '%',
                pageLimit, 
                +pageSize 
            ]).then((data) => {
                return data[0]
            })


            let newUsersOfResults =  []

            await Promise.all(usersOfResults.map(async (user) => {

                try {
                    let checkFriend = await pool.query('SELECT friends.friend_one, friends.friend_two FROM friends WHERE friend_one = ? AND friend_two = ?',[
                    userId,
                    user.id
                    ]).then((data) => {
                    if (data[0][0]) { return true } else { return  false }
                    })
                    newUsersOfResults.push({...user, friend:checkFriend})
                    return newUsersOfResults.filter( user => user.id !== userId);
                } catch(err) {
                    throw err;
                }
            }));

            let numberOfPages = Math.ceil(numberOfResults / pageSize)
            let totalUsers = numberOfResults

            let message = ''
            if (newUsersOfResults.length) {
                message = `Найдено: ${totalUsers}`
            } else {
                message = 'Совпадений не найдено...'
            }

            res.status(200).json({users:newUsersOfResults, totalUsers, totalPages: numberOfPages, message})

        } catch (error) {
            res.status(500).json({users: 0, totalUsers: 0, totalPages: 0, message: 'Ошибка на сервере. Сообщите администратору!'})
        }
    }

    async findFriends(req, res) {
        const { userId } = req.query

        try {

            const usersOfResults = await pool.query('SELECT ??.??,??,?? FROM ?? WHERE ??', [
                REQ_USERS,
                REQ_ID,
                REQ_LOGIN,
                REQ_AVATAR,
                REQ_USERS,
                REQ_ID,
            ]).then((data) => {
                return data[0]
            })


            let newUsersOfResults =  []

            await Promise.all(usersOfResults.map(async (col) => {

                try {
                    let checkFriend = await pool.query('SELECT friends.friend_one, friends.friend_two FROM friends WHERE friend_one = ? AND friend_two = ?',[
                        userId,
                        col.id
                    ]).then((data) => {
                        if (data[0][0]) { return true } else { return  false }
                    })

                    newUsersOfResults.push({...col, friend:checkFriend})
                    return newUsersOfResults;
                } catch(err) {
                    throw err;
                }
            }));

            let friends = newUsersOfResults.filter( col => col.friend === true)

            res.status(200).json({friends})

        } catch (error) {
            res.status(404).json({message: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    }
}




module.exports = new FindControllers