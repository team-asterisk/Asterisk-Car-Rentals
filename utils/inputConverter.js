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
        .replace(/"/g, '&quot;');
};

module.exports = { convert };
