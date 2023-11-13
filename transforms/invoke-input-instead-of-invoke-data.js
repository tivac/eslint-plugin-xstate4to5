// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = (file, api, options) => {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.Property, (node) => node.key.name === "invoke")
        .find(j.Property, (node) => node.key.name === "data")
        .forEach(path => {
            j(path).replaceWith(
                j.property(path.node.kind, j.identifier("init"), path.node.value)
            );
        })
        .toSource();
};
