const validateProfile = (data: any) => {
    const errors: any = {};
    if (!data.fullName) {
        errors.fullName = 'Full name is required';
    }
    return errors;
};