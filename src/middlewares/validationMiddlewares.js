const validation = (schema) => async (req, res, next) => {
    const resource = req.body

    try {
        await schema.validate(resource)
        next()
       
    } catch (error) {
        return res.status(400).json({ error })
    }

}

export default validation