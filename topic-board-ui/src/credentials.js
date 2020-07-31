const credentials = {
    save: (token) => {
        sessionStorage.setItem('credential', token);
    },
    get: () => {
        return sessionStorage.getItem('credential');
    },
    remove: () => {
        sessionStorage.removeItem('credential');
    }
};

export default credentials;
