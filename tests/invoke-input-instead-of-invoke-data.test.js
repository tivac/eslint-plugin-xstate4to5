const _test = require("./_test.js");
const rule = require("../transforms/invoke-input-instead-of-invoke-data.js");

_test("invoke-input-instead-of-invoke-data", rule, {
    valid : [
        `
        const machine = createMachine({
            // ...
            invoke: {
              src: 'someActor',
              input: {
                value: 42,
              },
            },
          });
        `,
    ],

    invalid : [{
        code : `
        const machine = createMachine({
            // ...
            invoke: {
              src: 'someActor',
              data: {
                value: 42,
              },
            },
          });
        `,
        output : `
        const machine = createMachine({
            // ...
            invoke: {
              src: 'someActor',
              input: {
                value: 42,
              },
            },
          });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});