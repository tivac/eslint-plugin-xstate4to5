// https://stately.ai/docs/migration#use-createmachine-not-machine
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : "Use `createActor()`, not `interpret()`"
        },
    },

    create(context) {
        let xstateImport = false;

        return {
            [`ImportDeclaration[source.value="xstate"]`](node) {
                xstateImport = true;
            },
            
            [`ImportDeclaration[source.value="xstate"]:exit`](node) {
                xstateImport = false;
            },

            [`ImportSpecifier[imported.name="interpret"]`](node) {
                if(!xstateImport) {
                    return;
                }

                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.imported, "createActor"),
                });
            },

            // TODO: can this be safer?
            [`CallExpression[callee.name="interpret"]`](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.callee, "createActor"),
                });
            },
        };
    },
};
