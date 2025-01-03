# eslint-plugin-xstate5

This repository contains a collection of eslint rules with fixers to convert xstate v4 machines to xstate v5

## Rules

| Status | Rule | xstate docs | Description |
| :----: | --------- | -- |----------- |
| ✅ | [`createmachine-instead-of-machine`](./rules/createmachine-instead-of-machine/createmachine-instead-of-machine.js) | [🔗](https://stately.ai/docs/migration#use-createmachine-not-machine) | Use `createMachine({ ... })` instead of `Machine({ ... })` |
| ✅ | [`createactor-instead-of-interpret`](./rules/createactor-instead-of-interpret/createactor-instead-of-interpret.js) | [🔗](https://stately.ai/docs/migration#use-createactor-not-interpret) | Use `createActor(...)` instead of `interpret(...)` |
| ❔ | `provide-instead-of-withconfig` | [🔗](https://stately.ai/docs/migration#use-machineprovide-not-machinewithconfig) | Use `machine.provide(...)` instead of `machine.withConfig(...)` |
| ❔ | `input-instead-of-withcontext` | [🔗](https://stately.ai/docs/migration#set-context-with-input-not-machinewithcontext) | Use `{ input : { ... } }` instead of `machine.withContext({ ... })` |
| ✅ | [`remove-predictableactionarguments`](./rules/remove-predictableactionarguments/remove-predictableactionarguments.js) | [🔗](https://stately.ai/docs/migration#actions-ordered-by-default-predictableactionarguments-no-longer-needed) | Actions ordered, don't need `predictableActionArguments` |
| ✅ | [`implementation-arguments`](./rules/implementation-arguments/implementation-arguments.js) | [🔗](https://stately.ai/docs/migration#implementation-functions-receive-a-single-argument) | `entry`/`exit`/etc receive `{ context, event }` |
| ❔ | `raise-or-sendto` | [🔗](https://stately.ai/docs/migration#use-either-raise-or-sendto-not-send) | Use `raise()` or `sendTo()`, not `send()` |
| ✅ | [`send-objects`](./rules/send-objects/send-objects.js) | [🔗](https://stately.ai/docs/migration#actorsend-no-longer-accepts-string-types) | Use `{ type : "..." }` to send an event |
| ❔ | `can-objects` | [🔗](https://stately.ai/docs/migration#statecan-no-longer-accepts-string-types) | Use `.can({ type : "..." })` to check if a transition is valid |
| ✅ | [`guard-not-cond`](./rules/guard-not-cond/guard-not-cond.js) | [🔗](https://stately.ai/docs/migration#guarded-transitions-use-guard-not-cond) | Guarded transitions use `guard` as the property instead of `cond` |
| ❔ | `event-data-via-params` | [🔗](https://stately.ai/docs/migration#use-params-to-pass-custom-event-data) | Use `{ type : "...", parmas : { ... } }` to pass custom data with events |
| ❔ | `strict-mode-removed` | [🔗](https://stately.ai/docs/migration#use-wildcard--transitions-not-strict-mode) | Strict mode is removed, use a wildcard `*` transtion instead |
| ✅ | [`eventless-use-always`](./rules/eventless-use-always/eventless-use-always.js) | [🔗](https://stately.ai/docs/migration#use-explicit-eventless-always-transitions) | Eventless transitions use `always`, not `""` |
| ❔ | `reenter-instead-of-internal` | [🔗](https://stately.ai/docs/migration#use-reenter-true-not-internal-false) | Use `renter: true` instead of `internal: false` |
| ❔ | `statein-instead-of-in` | [🔗](https://stately.ai/docs/migration#use-statein-to-validate-state-transitions-not-in) | Use `guard: stateIn({ ... })` instead of `in` |
| ✅ | [`invoke-input-instead-of-invoke-data`](./rules/invoke-input-instead-of-invoke-data/invoke-input-instead-of-invoke-data.js) | [🔗](https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata) | Use `invoke : { ..., input : { ... } }` instead of `data` |
| ✅ | [`output-in-final-states`](./rules/output-in-final-states/output-in-final-states.js) | [🔗](https://stately.ai/docs/migration#use-output-in-final-states-instead-of-data) | Use `{ type : "final", output : { ... } }` instead of `data` |
| ❔ | `function-instead-of-property-wrapper` | [🔗](https://stately.ai/docs/migration#dont-use-property-mappers-in-input-or-output) | Use a function for `input`/`output` instead of individually mapping fields |
| ❔ | `actors-property-replaces-services` | [🔗](https://stately.ai/docs/migration#use-actors-property-on-options-object-instead-of-services) | Use the `actors` property with `machine.provide()` instead of `services` |
| ✅ | [`subscribe-instead-of-ontransition`](./rules/subscribe-instead-of-ontransition/subscribe-instead-of-ontransition.js) | [🔗](https://stately.ai/docs/migration#use-subscribe-for-changes-not-ontransition) | Use `actor.subscribe(...)` instead of `actor.onTransition(...)` |
| ❔ | `actor-batch-removed` | [🔗](https://stately.ai/docs/migration#loop-over-events-instead-of-using-actorbatch) | `actor.batch(...)` was removed, use a loop instead |
| ❔ | `snapshot-status-for-done` | [🔗](https://stately.ai/docs/migration#use-snapshotstatus--done-instead-of-snapshotdone) | Use `snapshot.status === "done"` instead of `snapshot.done` |
