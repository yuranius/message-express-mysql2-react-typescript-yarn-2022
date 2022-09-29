const pool = require('../settings/db')
const config = require('config')
const fs = require('fs-extra')
const path = require ('path')


class FileController {
    async uploadAvatar(req, res) {

        try {

            const {userId} = req.body

            const file = req.file

            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                userId
            ]).then((data) => {
                return data[0][0]
            })


            // удаление существующей картинки из БД
            if (user.avatar) {
                fs.remove(`static/${user.avatar}`, error => {return error})
            }


            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldSixTableOne'),
                    file.filename,
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    user.id
                ]
            )

            res.status(201).json({avatar: file.filename, message:'Аватар изменен...'})
            
        } catch (error) {
            res.status(404).json({avatar: 0, message:'Ошибка обращения к базе данных ... Повторите позже'})
        }
    }

    async deleteAvatar(req, res) {
        try {

            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                req.body.userId
            ])

            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldSixTableOne'),
                    null, 
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    user.userId
                ]
            )
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)

            return res.json(user, {massage:"Аватар удален!"})
        } catch (error) {
            res.status(404).json({message:'Ошибка обращения к базе данных ... Повторите позже'})
        }
    }
}


module.exports = new FileController