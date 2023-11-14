// https://stately.ai/docs/migration#use-createmachine-not-machine
module.exports = {
    meta : {
        fixable : true,
        schema : [],
    },

    create(context) {
        let xstateImport = false;

        return {
            [`ImportDeclaration[source="xstate"]`](node) {
                xstateImport = true;
            },
            
            [`ImportDeclaration[source="xstate"]:exit`](node) {
                xstateImport = false;
            },

            [`ImportSpecifier[imported.name="Machine"]`](node) {
                if(!xstateImport) {
                    return;
                }

                context.report({
                    node,
                    message : "Use createMachine instead of Machine",
                    fix : (fixer) => fixer.replaceText(node.imported.name, "createMachine"),
                });
            },

            // TODO: can this be safer?
            [`CallExpression[callee.name="Machine"]`](node) {
                context.report({
                    node,
                    message : "Use createMachine instead of Machine",
                    fix : (fixer) => fixer.replaceText(node.callee, "createMachine"),
                });
            },
        };
    },
};
