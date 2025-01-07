import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#send-is-removed-use-raise-or-sendto
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            promise : `Use fromPromise()`,
            callback : `Use fromCallback() & input if necessary`,
        },
    },

    create(context) {
        return {
            /**
             * invoke : {
             *     src : async () => { ... },
             * }
             */
            [inMachine(`Property[key.name="invoke"] Property[key.name="src"] > :function[async="true"]`)](node) {
                context.report({
                    node,
                    messageId : "promise",
                    fix : (fixer) => [
                        fixer.insertTextBefore(node, "fromPromise("),
                        fixer.insertTextAfter(node, ")"),
                    ],
                })
            },

            [inMachine(`Property[key.name="invoke"] Property[key.name="src"] > :function > :function`)](node) {
                context.report({
                    node,
                    messageId : "callback",
                })
            }
        };
    },
};
