import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : `Use cond instead of guard`,
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.name="cond"]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "guard"),
                })
            },
        };
    },
};
