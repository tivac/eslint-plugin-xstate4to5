# eslint-plugin-xstate5

This repository contains a collection of eslint rules with fixers to convert xstate v4 machines to xstate v5

## Rules

### Machines & Actors

| Status | Rule | xstate docs | Description |
| :----: | --------- | -- |----------- |
| ✅ | [`use-createmachine-not-machine`](./rules/use-createmachine-not-machine/use-createmachine-not-machine.js) | [🔗](https://stately.ai/docs/migration#use-createmachine-not-machine) | Use `createMachine()`, not `Machine()` |
| ✅ | [`use-createactor-not-interpret`](./rules/use-createactor-not-interpret/use-createactor-not-interpret.js) | [🔗](https://stately.ai/docs/migration#use-createactor-not-interpret) | Use `createActor()`, not `interpret()` |
| ❔ | [`use-machineprovide-not-machinewithconfig`](./rules/use-machineprovide-not-machinewithconfig/use-machineprovide-not-machinewithconfig.js) | [🔗](https://stately.ai/docs/migration#use-machineprovide-not-machinewithconfig) | Use `machine.provide()`, not `machine.withConfig()` |
| ❔ | [`set-context-with-input-not-machinewithcontext`](./rules/set-context-with-input-not-machinewithcontext/set-context-with-input-not-machinewithcontext.js) | [🔗](https://stately.ai/docs/migration#set-context-with-input-not-machinewithcontext) | Set context with `input`, not `machine.withContext()` |
| ✅ | [`actions-ordered-by-default-predictableactionarguments-no-longer-needed`](./rules/actions-ordered-by-default-predictableactionarguments-no-longer-needed/actions-ordered-by-default-predictableactionarguments-no-longer-needed.js) | [🔗](https://stately.ai/docs/migration#actions-ordered-by-default-predictableactionarguments-no-longer-needed) | Actions ordered by default, `predictableActionArguments` no longer needed |
| ❔ | [`the-spawn-function-has-been-removed`](./rules/the-spawn-function-has-been-removed/the-spawn-function-has-been-removed.js) | [🔗](https://stately.ai/docs/migration#the-spawn-function-has-been-removed) | The `spawn()` function has been removed |
| ❔ | [`use-getnextsnapshot-instead-of-machinetransition`](./rules/use-getnextsnapshot-instead-of-machinetransition/use-getnextsnapshot-instead-of-machinetransition.js) | [🔗](https://stately.ai/docs/migration#use-getnextsnapshot-instead-of-machinetransition) | Use `getNextSnapshot(…)` instead of `machine.transition(…)` |
| ❔ | [`send-events-explictly-instead-of-using-autoforward`](./rules/send-events-explictly-instead-of-using-autoforward/send-events-explictly-instead-of-using-autoforward.js) | [🔗](https://stately.ai/docs/migration#send-events-explictly-instead-of-using-autoforward) | Send events explictly instead of using `autoForward` |

### States

| Status | Rule | xstate docs | Description |
| :----: | --------- | -- |----------- |
| ❔ | [`use-stategetmeta-instead-of-statemeta`](./rules/use-stategetmeta-instead-of-statemeta/use-stategetmeta-instead-of-statemeta.js) | [🔗](https://stately.ai/docs/migration#use-stategetmeta-instead-of-statemeta) | Use `state.getMeta()` instead of `state.meta` |
| ❔ | [`the-statetostrings-method-has-been-removed`](./rules/the-statetostrings-method-has-been-removed/the-statetostrings-method-has-been-removed.js) | [🔗](https://stately.ai/docs/migration#the-statetostrings-method-has-been-removed) | The `state.toStrings()` method has been removed |
| ❔ | [`use-state_nodes-instead-of-stateconfiguration`](./rules/use-state_nodes-instead-of-stateconfiguration/use-state_nodes-instead-of-stateconfiguration.js) | [🔗](https://stately.ai/docs/migration#use-state_nodes-instead-of-stateconfiguration) | Use `state._nodes` instead of `state.configuration` |
| ❔ | [`read-events-from-inspection-api-instead-of-stateevents`](./rules/read-events-from-inspection-api-instead-of-stateevents/read-events-from-inspection-api-instead-of-stateevents.js) | [🔗](https://stately.ai/docs/migration#read-events-from-inspection-api-instead-of-stateevents) | Read events from inspection API instead of `state.events` |

### Events and Transitions

| Status | Rule | xstate docs | Description |
| :----: | --------- | -- |----------- |
| ✅ | [`implementation-functions-receive-a-single-argument`](./rules/implementation-functions-receive-a-single-argument/implementation-functions-receive-a-single-argument.js) | [🔗](https://stately.ai/docs/migration#implementation-functions-receive-a-single-argument) | Implementation functions receive a single argument |
| ❔ | [`send-is-removed-use-raise-or-sendto`](./rules/send-is-removed-use-raise-or-sendto/send-is-removed-use-raise-or-sendto.js) | [🔗](https://stately.ai/docs/migration#send-is-removed-use-raise-or-sendto) | `send()` is removed; use `raise()` or `sendTo()` |
| ❔ | [`use-enqueueactions-instead-of-pure-and-choose`](./rules/use-enqueueactions-instead-of-pure-and-choose/use-enqueueactions-instead-of-pure-and-choose.js) | [🔗](https://stately.ai/docs/migration#use-enqueueactions-instead-of-pure-and-choose) | Use `enqueueActions()` instead of `pure()` and `choose()` |
| ✅ | [`actorsend-no-longer-accepts-string-types`](./rules/actorsend-no-longer-accepts-string-types/actorsend-no-longer-accepts-string-types.js) | [🔗](https://stately.ai/docs/migration#actorsend-no-longer-accepts-string-types) | `actor.send()` no longer accepts string types |
| ❔ | [`statecan-no-longer-accepts-string-types`](./rules/statecan-no-longer-accepts-string-types/statecan-no-longer-accepts-string-types.js) | [🔗](https://stately.ai/docs/migration#statecan-no-longer-accepts-string-types) | `state.can()` no longer accepts string types |
| ✅ | [`guarded-transitions-use-guard-not-cond`](./rules/guarded-transitions-use-guard-not-cond/guarded-transitions-use-guard-not-cond.js) | [🔗](https://stately.ai/docs/migration#guarded-transitions-use-guard-not-cond) | Guarded transitions use `guard`, not `cond` |
| ❔ | [`use-params-to-pass-params-to-actions--guards`](./rules/use-params-to-pass-params-to-actions--guards/use-params-to-pass-params-to-actions--guards.js) | [🔗](https://stately.ai/docs/migration#use-params-to-pass-params-to-actions--guards) | Use `params` to pass params to actions & guards |
| ❔ | [`use-wildcard--transitions-not-strict-mode`](./rules/use-wildcard--transitions-not-strict-mode/use-wildcard--transitions-not-strict-mode.js) | [🔗](https://stately.ai/docs/migration#use-wildcard--transitions-not-strict-mode) | Use wildcard `*` transitions, not strict mode |
| ✅ | [`use-explicit-eventless-always-transitions`](./rules/use-explicit-eventless-always-transitions/use-explicit-eventless-always-transitions.js) | [🔗](https://stately.ai/docs/migration#use-explicit-eventless-always-transitions) | Use explicit eventless (`always`) transitions |
| ❔ | [`use-reenter-true-not-internal-false`](./rules/use-reenter-true-not-internal-false/use-reenter-true-not-internal-false.js) | [🔗](https://stately.ai/docs/migration#use-reenter-true-not-internal-false) | Use `reenter: true`, not `internal: false` |
| ❔ | [`transitions-are-internal-by-default-not-external`](./rules/transitions-are-internal-by-default-not-external/transitions-are-internal-by-default-not-external.js) | [🔗](https://stately.ai/docs/migration#transitions-are-internal-by-default-not-external) | Transitions are internal by default, not external |
| ❔ | [`child-state-nodes-are-always-re-entered`](./rules/child-state-nodes-are-always-re-entered/child-state-nodes-are-always-re-entered.js) | [🔗](https://stately.ai/docs/migration#child-state-nodes-are-always-re-entered) | Child state nodes are always re-entered |
| ❔ | [`use-statein-to-validate-state-transitions-not-in`](./rules/use-statein-to-validate-state-transitions-not-in/use-statein-to-validate-state-transitions-not-in.js) | [🔗](https://stately.ai/docs/migration#use-statein-to-validate-state-transitions-not-in) | Use `stateIn()` to validate state transitions, not `in` |
| ❔ | [`use-actorsubscribe-instead-of-statehistory`](./rules/use-actorsubscribe-instead-of-statehistory/use-actorsubscribe-instead-of-statehistory.js) | [🔗](https://stately.ai/docs/migration#use-actorsubscribe-instead-of-statehistory) | Use `actor.subscribe()` instead of `state.history` |
| ❔ | [`actions-can-throw-errors-without-escalate`](./rules/actions-can-throw-errors-without-escalate/actions-can-throw-errors-without-escalate.js) | [🔗](https://stately.ai/docs/migration#actions-can-throw-errors-without-escalate) | Actions can throw errors without `escalate` |

### Actors

| Status | Rule | xstate docs | Description |
| :----: | --------- | -- |----------- |
| ❔ | [`use-actor-logic-creators-for-invokesrc-instead-of-functions`](./rules/use-actor-logic-creators-for-invokesrc-instead-of-functions/use-actor-logic-creators-for-invokesrc-instead-of-functions.js) | [🔗](https://stately.ai/docs/migration#use-actor-logic-creators-for-invokesrc-instead-of-functions) | Use actor logic creators for `invoke.src` instead of functions |
| ✅ | [`use-invokeinput-instead-of-invokedata`](./rules/use-invokeinput-instead-of-invokedata/use-invokeinput-instead-of-invokedata.js) | [🔗](https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata) | Use `invoke.input` instead of `invoke.data` |
| ✅ | [`use-output-in-final-states-instead-of-data`](./rules/use-output-in-final-states-instead-of-data/use-output-in-final-states-instead-of-data.js) | [🔗](https://stately.ai/docs/migration#use-output-in-final-states-instead-of-data) | Use `output` in final states instead of `data` |
| ❔ | [`dont-use-property-mappers-in-input-or-output`](./rules/dont-use-property-mappers-in-input-or-output/dont-use-property-mappers-in-input-or-output.js) | [🔗](https://stately.ai/docs/migration#dont-use-property-mappers-in-input-or-output) | Don't use property mappers in `input` or `output` |
| ❔ | [`use-actors-property-on-options-object-instead-of-services`](./rules/use-actors-property-on-options-object-instead-of-services/use-actors-property-on-options-object-instead-of-services.js) | [🔗](https://stately.ai/docs/migration#use-actors-property-on-options-object-instead-of-services) | Use `actors` property on `options` object instead of `services` |
| ✅ | [`use-subscribe-for-changes-not-ontransition`](./rules/use-subscribe-for-changes-not-ontransition/use-subscribe-for-changes-not-ontransition.js) | [🔗](https://stately.ai/docs/migration#use-subscribe-for-changes-not-ontransition) | Use `subscribe()` for changes, not `onTransition()` |
| ❔ | [`createactor-formerly-interpret-accepts-a-second-argument-to-restore-state`](./rules/createactor-formerly-interpret-accepts-a-second-argument-to-restore-state/createactor-formerly-interpret-accepts-a-second-argument-to-restore-state.js) | [🔗](https://stately.ai/docs/migration#createactor-formerly-interpret-accepts-a-second-argument-to-restore-state) | `createActor()` (formerly `interpret()`) accepts a second argument to restore state |
| ❔ | [`use-actorgetsnapshot-to-get-actors-state`](./rules/use-actorgetsnapshot-to-get-actors-state/use-actorgetsnapshot-to-get-actors-state.js) | [🔗](https://stately.ai/docs/migration#use-actorgetsnapshot-to-get-actors-state) | Use `actor.getSnapshot()` to get actor’s state |
| ❔ | [`loop-over-events-instead-of-using-actorbatch`](./rules/loop-over-events-instead-of-using-actorbatch/loop-over-events-instead-of-using-actorbatch.js) | [🔗](https://stately.ai/docs/migration#loop-over-events-instead-of-using-actorbatch) | Loop over events instead of using `actor.batch()` |
| ❔ | [`use-snapshotstatus--done-instead-of-snapshotdone`](./rules/use-snapshotstatus--done-instead-of-snapshotdone/use-snapshotstatus--done-instead-of-snapshotdone.js) | [🔗](https://stately.ai/docs/migration#use-snapshotstatus--done-instead-of-snapshotdone) | Use `snapshot.status === 'done'` instead of `snapshot.done` |
| ❔ | [`statenextevents-has-been-removed`](./rules/statenextevents-has-been-removed/statenextevents-has-been-removed.js) | [🔗](https://stately.ai/docs/migration#statenextevents-has-been-removed) | `state.nextEvents` has been removed |
