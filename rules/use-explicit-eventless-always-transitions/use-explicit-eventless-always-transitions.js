import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#use-explicit-eventless-always-transitions
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : `Use always instead of "" for eventless transitions`,
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.value=""]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "always"),
                })
            },
        };
    },
};
