module.exports.validName = (name) => {
    const nameRegex = /^[A-Za-z ]+$/;
    return nameRegex.test(name);
}

module.exports.validEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

module.exports.validPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

module.exports.validPhone = (phone) => {
    const phoneRegex =/^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}
