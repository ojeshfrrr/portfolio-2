// R3F 9.8.1's store still expects the Clock interface. Keep that interface while
// advancing Three r186's supported Timer once per getDelta() call. No DOM
// connection is needed: this adapter owns no visibility listeners to dispose.
export function createFiberTimerClock(three) {
  const timer = new three.Timer();
  return {
    autoStart: true,
    running: false,
    startTime: 0,
    oldTime: 0,
    elapsedTime: 0,
    start() {
      timer.reset();
      this.startTime = this.oldTime = performance.now();
      this.elapsedTime = 0;
      this.running = true;
    },
    stop() {
      this.getElapsedTime();
      this.running = false;
      this.autoStart = false;
    },
    getDelta() {
      if (this.autoStart && !this.running) { this.start(); return 0; }
      if (!this.running) return 0;
      timer.update();
      const delta = timer.getDelta();
      this.oldTime = performance.now();
      this.elapsedTime += delta;
      return delta;
    },
    getElapsedTime() { this.getDelta(); return this.elapsedTime; },
  };
}
