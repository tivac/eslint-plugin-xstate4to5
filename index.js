import path from "node:path";

import glob from "fast-glob";

import json from "./package.json" with { type: 'json' };

const rules = {};
const files = await glob([ "./rules/**/*.js", "!**/*.test.js" ]);

const configs = {
    all : {},
};

for await (const file of files) {
    const { name } = path.parse(file);
    const module = await import(`./${file}`);

    rules[name] = module;

    configs.all[name] = "error";
}

export default {
    meta : {
        name : json.name,
        version : json.version,
    },

    configs,

    rules,
};
