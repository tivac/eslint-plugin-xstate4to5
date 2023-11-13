// https://stately.ai/docs/migration#use-createmachine-not-machine
module.exports = (file, api, options) => {
    const j = api.jscodeshift;

    // Update imports
    file.source = j(file.source)
    .find(j.ImportDeclaration, (node) => node.source.value === "xstate")
    .find(j.ImportSpecifier, (node) => node.imported.name === "Machine")
    .find(j.Identifier)
    .forEach(path => {
        j(path).replaceWith(
            j.identifier("createMachine")
        );
    })
    .toSource();

    // Update calls
file.source = j(file.source)
  .find(j.CallExpression)
  .find(j.Identifier, (node) => console.log(node) || node.name === "Machine")
  .forEach((path) => {
    j(path).replaceWith(j.identifier("createMachine"))
  })
  .toSource();

return file.source;

};
