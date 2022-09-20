const verifyRoles = (...allowedRoles) => {
    //req.role = TeamLead
    //allowedRoles = [team Lead]
    return (req, res, next) => {

        
        if (!req?.Role) return res.sendStatus(401);
        
        const rolesArray = [...allowedRoles];

        if (rolesArray.includes(req.Role)) {
            
            next();
        }

        else  return res.sendStatus(401);
        
    }
}

module.exports = verifyRoles