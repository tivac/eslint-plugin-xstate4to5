import { RuleTester } from "eslint";
import { suite } from "uvu";
import globals from "globals";

export default (name, rule, tests) => {
    const test = suite(name);

    RuleTester.it = test;
    RuleTester.itOnly = test.only;

    const ruleTester = new RuleTester({
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    });

    ruleTester.run(name, rule, tests);

    test.run();
};