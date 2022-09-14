const verifyRoles = (...allowedRoles) => {
    //req.role = TeamLead
    //allowedRoles = [team Lead]
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        
        const rolesArray = [...allowedRoles];


       
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true); //searching in allowed parameters
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles