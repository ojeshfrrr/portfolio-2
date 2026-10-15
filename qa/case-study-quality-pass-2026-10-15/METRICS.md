# Final production measurements

Installed Chrome, localhost production build, 1440 × 900, DPR 1. One sample per cache mode, server image optimizer potentially warm. These are not controlled benchmark improvements or physical-device results. Image transfers include link-initiated responsive cover preloads.

| Route | Browser cache | Last LCP ms / element | CLS | Long tasks observed | Image transfer bytes | Image preloads |
| --- | --- | --- | --- | --- | --- | --- |
| /work | disabled | 1140 / H1 | 0.001352 | 0 | 73058 | 1 |
| /work | warm | 28 / H1 | 0.000000 | 0 | 0 | 1 |
| /work/lane | disabled | 100 / IMG | 0.001850 | 0 | 46412 | 1 |
| /work/lane | warm | 24 / IMG | 0.000000 | 0 | 0 | 1 |
| /work/arcus | disabled | 96 / IMG | 0.001848 | 0 | 33556 | 1 |
| /work/arcus | warm | 28 / IMG | 0.000000 | 0 | 0 | 1 |
| /work/teen-fiesta | disabled | 1020 / H1 | 0.002887 | 0 | 48950 | 1 |
| /work/teen-fiesta | warm | 32 / IMG | 0.000000 | 0 | 0 | 1 |
| /work/rewatch | disabled | 92 / IMG | 0.005363 | 0 | 41946 | 1 |
| /work/rewatch | warm | 36 / IMG | 0.000000 | 0 | 0 | 1 |

No long tasks were observed in these short initial-load windows; that does not establish performance under sustained usage. Warm image transfers were zero because the browser cache was primed. Raw requests, timings, byte counts, dimensions and source hashes are in performance.json.

## Mobile scroll profile

Chrome CDP Performance metrics; 4x CPU throttle; dispatchTouchEvent touchStart/Move/End across canvas; software WebGL; emulation, not physical hardware. Input.synthesizeScrollGesture did not produce scrolling in this environment; direct dispatched touch did.

| Metric | Before | After | Delta |
| --- | --- | --- | --- |
| TaskDuration | 0.000103 | 0.758169 | 0.758066 |
| ScriptDuration | 0 | 0.225323 | 0.225323 |
| LayoutDuration | 0 | 0 | 0 |
| RecalcStyleDuration | 0 | 0.112254 | 0.112254 |
| JSHeapUsedSize | 9635532 | 10217292 | 581760 |
| Nodes | 255 | 255 | 0 |
| JSEventListeners | 451 | 451 | 0 |

Touch gesture result: scrollY 561; pins 0; horizontal overflow false. Duration metrics are seconds; heap is bytes. Aggregate task duration is not an FPS or per-frame latency measurement.
