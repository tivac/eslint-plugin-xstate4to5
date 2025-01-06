// https://stately.ai/docs/migration#use-createmachine-not-machine
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : "Use `createActor()`, not `interpret()`"
        },
    },

    create(context) {
        let xstateImport = false;

        return {
            [`ImportDeclaration[source.value="xstate"]`]() {
                xstateImport = true;
            },
            
            [`ImportDeclaration[source.value="xstate"]:exit`]() {
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
