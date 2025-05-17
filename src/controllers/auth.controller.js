import { pool } from "../db.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const { rowCount, rows } = await pool.query('SELECT * FROM users WHERE username=$1 and password=$2', [username, password])

        if(rowCount>0){
            const accessToken = jwt.sign(
                { user: username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            )

            const refreshToken = jwt.sign(
                { user: username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            )

            // Saving the refresh token in a cookie
            res.cookie('jwt', refreshToken, { http_only: true, maxAge: 24 * 60 * 60 * 1000 })

            return res.status(200).json({
                message: "Showing user.",
                token: accessToken,
                data: rows[0]
            })
        }
        return res.status(404).json({message: "User not found."})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error})
    }
}

const logout = (req, res) => {
    try {
        const cookie = req.cookies

        if(!cookie?.jwt) return res.sendStatus(204)
        res.clearCookie('jwt',{ http_only: true })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error})
    }
}

const refreshToken = (req, res) => {
    try {
        const cookie = req.cookies

        if(!cookie?.jwt) return res.status(401).json({message: 'Unauthorized.'})
        // console.log(cookie)
        const refreshToken = cookie.jwt

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if(error) return res.status(403).json({message: 'Invalid Token.'})
            const newToken = jwt.sign({user: decoded.user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})

            return res.status(200).json({message: 'New token generated.', token: newToken})
        })
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error})
    }
}

export {
    login,
    logout,
    refreshToken
}
