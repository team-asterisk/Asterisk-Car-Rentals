const convert = (string) => {
    if (typeof(string) === 'undefined') {
        // validator will cath it
        return string;
    }

    return string
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

module.exports = { convert };
