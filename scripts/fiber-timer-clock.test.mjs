import assert from "node:assert/strict";
import { test } from "node:test";
import * as three from "three";
import { createFiberTimerClock } from "./fiber-timer-clock.mjs";

test("uses Timer updates while preserving Fiber's Clock lifecycle", () => {
  let updates = 0;
  class Timer {
    reset() {}
    update() { updates++; }
    getDelta() { return .016; }
  }
  const clock = createFiberTimerClock({ Timer });
  assert.equal(clock.getDelta(), 0);
  assert.equal(clock.running, true);
  assert.equal(clock.getDelta(), .016);
  assert.equal(updates, 1);
  assert.equal(clock.elapsedTime, .016);
  clock.stop();
  assert.equal(clock.getDelta(), 0);
  assert.equal(clock.running, false);
  clock.start();
  assert.equal(clock.elapsedTime, 0);
  assert.equal(clock.getDelta(), .016);
  // R3F's frameloop="never" path writes these fields directly.
  clock.oldTime = clock.elapsedTime;
  clock.elapsedTime = 10;
  assert.equal(clock.elapsedTime, 10);
});

test("works with installed Three Timer without constructing deprecated Clock", () => {
  const clock = createFiberTimerClock(three);
  assert.equal(clock.getDelta(), 0);
  assert.ok(clock.getDelta() >= 0);
  clock.stop();
  clock.start();
  assert.equal(clock.elapsedTime, 0);
  assert.ok(clock.getElapsedTime() >= 0);
});
