"use strict";

const base = {
    plugins : [ "xstate4to5" ],
};

module.exports = {
    rules : {
        "createactor-instead-of-interpret" 		  : require("./transforms/createactor-instead-of-interpret.js"),
        "createmachine-instead-of-machine" 		  : require("./transforms/createmachine-instead-of-machine.js"),
        "eventless-use-always" 					        : require("./transforms/eventless-use-always.js"),
        "guard-not-cond" 						            : require("./transforms/guard-not-cond.js"),
        "implementation-arguments" 			  	    : require("./transforms/implementation-arguments.js"),
        "invoke-input-instead-of-invoke-data" 	: require("./transforms/invoke-input-instead-of-invoke-data.js"),
        "output-in-final-states" 				        : require("./transforms/output-in-final-states.js"),
        "remove-predictableactionarguments" 	  : require("./transforms/remove-predictableactionarguments.js"),
        "send-objects" 							            : require("./transforms/send-objects.js"),
        "subscribe-instead-of-ontransition" 	  : require("./transforms/subscribe-instead-of-ontransition.js"),
    },

    configs : {
        base,

        recommended : {
            ...base,
            rules : {
                "xstate4to5/createactor-instead-of-interpret" : "warn",
                "xstate4to5/createmachine-instead-of-machine" : "warn",
                "xstate4to5/eventless-use-always" : "warn",
                "xstate4to5/guard-not-cond" : "warn",
                "xstate4to5/implementation-arguments" : "warn",
                "xstate4to5/invoke-input-instead-of-invoke-data" : "warn",
                "xstate4to5/output-in-final-states" : "warn",
                "xstate4to5/remove-predictableactionarguments" : "warn",
                "xstate4to5/send-objects" : "warn",
                "xstate4to5/subscribe-instead-of-ontransition" : "warn",
            },
        },
    },
};
