import path from "node:path";

import glob from "fast-glob";

import json from "./package.json" with { type: 'json' };

const rules = {};
const files = await glob([ "./rules/**/*.js", "!**/*.test.js" ], { cwd : import.meta.dirname });

const configs = {
    all : {
        name : `${json.name}:all`,
        rules : {},
    },
};

for await (const file of files) {
    const { name } = path.parse(file);
    const { default : rule } = await import(`./${file}`);

    const rulename = `${json.name}/${name}`;

    rules[name] = rule;

    configs.all.rules[rulename] = "error";
}

export default {
    meta : {
        name : json.name,
        version : json.version,
    },

    configs,

    rules,
};
