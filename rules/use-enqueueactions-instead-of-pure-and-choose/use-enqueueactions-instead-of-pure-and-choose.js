import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#use-explicit-eventless-always-transitions
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            pure : "Use `enqueueActions()` instead of `pure()`",
            choose : "Use `enqueueActions()` instead of `choose()`",
        },
    },

    create(context) {
        return {
            [inMachine(`CallExpression[callee.name="pure"]`)](node) {
                context.report({
                    node,
                    messageId : "pure",
                    fix : (fixer) => [
                        fixer.insertTextBefore(node, "// TODO: converted from pure(), double-check logic\n"),
                        fixer.replaceTextRange(
                            [ node.range[0], node.range[0] + 6 ],
                            "enqueueActions(({ context, event, enqueue }"
                        ),
                    ],
                })
            },
            
            [inMachine(`CallExpression[callee.name="choose"]`)](node) {
                context.report({
                    node,
                    messageId : "choose",
                    // fix : (fixer) => fixer.replaceText(node.key, "always"),
                })
            },
        };
    },
};
