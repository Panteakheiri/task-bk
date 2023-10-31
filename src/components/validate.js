const validate = (data) => {

    const errors = {};
    
    if (!data.username) {
        errors.username = "username is required"
    } 
     else (
        delete errors.username
    )

    if(!data.password) {
        errors.password = "password is required"
    } else if (data.password.length < 6) {
        errors.password = "password needs to be at least 6 characters"
    } else {
        delete errors.password
    }

    return errors;
    }


export default validate;