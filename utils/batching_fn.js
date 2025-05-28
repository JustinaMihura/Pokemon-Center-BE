module.exports  = (urls, size) => {

    const result = [];

    for (let i = 0; i < urls.length; i+= size) {
    result.push(urls.slice(i, i + size))

    };
    
    return result;
};


