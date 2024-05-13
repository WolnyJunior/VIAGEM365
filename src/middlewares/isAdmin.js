async function isAdmin(req, res, next) {
    try {
        const isAdmin = req.usuario && req.usuario.isAdmin

        if (!isAdmin) {
            return res.status(403).json({ message: `Acesso negado. Esta operação requer privilégios de administrador.` })
        }
        next()
    } catch (error) {
        console.error('Erro na verificação de administrador:', error);
        res.status(500).json({ message: 'Erro na verificação de administrador.' });
    }
}

module.exports = { isAdmin }