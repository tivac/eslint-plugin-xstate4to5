// https://stately.ai/docs/migration#use-createmachine-not-machine
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : "Use `createMachine()` not `Machine()`"
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

            [`ImportSpecifier[imported.name="Machine"]`](node) {
                if(!xstateImport) {
                    return;
                }

                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.imported, "createMachine"),
                });
            },

            // TODO: can this be safer?
            [`CallExpression[callee.name="Machine"]`](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.callee, "createMachine"),
                });
            },
        };
    },
};
