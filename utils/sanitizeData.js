// to return specific data
exports.sanitizeUserLogin = function (user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImg: user.profileImg
    };
};

exports.sanitizeUserSignup = function (user) {
    return {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        gender: user.gender,
        phone: user.phone,
        birthday: user.birthday,
        email: user.email
    };
};