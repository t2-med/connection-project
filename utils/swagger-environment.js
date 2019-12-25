
const replaceSwaggerEnvironmentVariable = (jsonSwaggerDocument, env) => {
    let swaggerDocStr = JSON.stringify(jsonSwaggerDocument);
    const keys = Object.keys(env.parsed);
    for(let key in keys) {
        let regex = new RegExp('\\${'+keys[key]+'}','g');
        swaggerDocStr = swaggerDocStr.replace(regex,env.parsed[keys[key]]);
    }
    return JSON.parse(swaggerDocStr);
};

module.exports = replaceSwaggerEnvironmentVariable;