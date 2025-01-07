import { inMachine } from "../../util/in-machine.js";

const propertySelector = `Property[key.name=/entry|exit|actions|guard/]`;
const functionSelector = `:function:has(ObjectPattern):not(:has(ObjectPattern > :matches(Property[key.name="context"], Property[key.name="event"])))`;

// https://stately.ai/docs/migration#implementation-functions-receive-a-single-argument
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : `Implementation functions receive a single argument`,
        },
    },

    create(context) {
        const { sourceCode } = context;

        return {
            // entry : (context) => {},
            // entry : (context, event) => {},
            [inMachine(`:function[params.0.name="context"]`)](node) {
                const [ c, e ] = node.params;

                return context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceTextRange(
                        [ node.params[0].range[0], node.params.at(-1).range[1] ],
                        `{ context${e ? `, event : ${sourceCode.getText(e)}` : ""} }`,
                    ),
                });
            },

            // entry : ({ foo }) => {}
            [`${inMachine(`${propertySelector} > ${functionSelector}`)}, ${inMachine(`${propertySelector} > ArrayExpression > ${functionSelector}`)}`](node) {
                if(node.params.length === 0) {
                    return;
                }

                return context.report({
                    node,
                    messageId : "wrong",
                });
            },
      
            

            // entry : ({ foo }, { bar }) => {}
            // actions : ({ foo }, { bar }) => {}
            // [inMachine(`Property[key.name=/entry||exit|actions/] > :function[params.length=2]`)](node) {
            //     return context.report({
            //         node,
            //         messageId : "wrong",
            //     });
            // }
        };
    },
};
