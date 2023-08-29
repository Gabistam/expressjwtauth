exports.userResponseParser = (user)=>{
    return {
        id: user.id || null,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
    }
}