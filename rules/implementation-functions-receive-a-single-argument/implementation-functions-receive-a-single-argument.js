import { inMachine } from "../../util/in-machine.js";

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
            [inMachine(`:function[params.length=1][params.0.name="context"]`)](node) {
                return context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(
                        node.params[0],
                        `{ context : ${sourceCode.getText(node.params[0])} }`
                    ),
                });
            },
            
            // entry : ({ foo }) => {}
            // actions : ({ foo }) => {}
            [inMachine(`Property[key.name=/entry|exit|actions/] :function[params.length=1]`)](node) {
                const [ first ] = node.params;

                // Ignore entry : ({ ... }) => {}, because it might be fine
                if(first.type === "ObjectPattern" && first.properties[0].key.name === "context") {
                    return;
                }
                
                return context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(
                        node.params[0],
                        `{ context : ${sourceCode.getText(node.params[0])} }`
                    ),
                });
            },
      
            // entry : (context, events) => {},
            [inMachine(`:function[params.length=2][params.0.name="context"][params.1.name="event"]`)](node) {
                const [ param1, param2 ] = node.params;
        
                return context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceTextRange(
                        [node.params[0].range[0], node.params[1].range[1] ],
                        `{ context : ${sourceCode.getText(param1)}, event : ${sourceCode.getText(param2)} }`
                    ),
                });
            },

            // entry : ({ foo }. { bar }) => {}
            // actions : ({ foo }, { bar }) => {}
            [inMachine(`Property[key.name=/entry||exit|actions/] :function[params.length=2]`)](node) {
                const [ param1, param2 ] = node.params;
        
                return context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceTextRange(
                        [node.params[0].range[0], node.params[1].range[1] ],
                        `{ context : ${sourceCode.getText(param1)}, event : ${sourceCode.getText(param2)} }`
                    ),
                });
            }
        };
    },
};
