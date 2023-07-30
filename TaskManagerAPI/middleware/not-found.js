//const notFound = (req , res) => res.status(404).send('Route does not exists')

const notFound = (req , res) => res.status(404).json({status:'failed', msg:'Invalid Route'})

module.exports = notFound