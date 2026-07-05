---
name: worker-idempotency-validation
description: Validate worker retry and idempotency behavior. Use when reviewing background jobs, webhooks, queues, cron tasks, export jobs, import jobs, payment-like flows, or any process that may run twice or fail midway.
---

# Worker Idempotency Validation

Use this skill for jobs where duplicate execution or retry behavior matters.

## State Check

```bash
rg -n "worker|queue|job|retry|idempot|webhook|cron|claim|complete|fail|status" .
rg --files | rg "worker|queue|job|webhook|cron"
```

## Checklist

- Job has a stable idempotency key or unique constraint.
- Claim/lock step prevents double processing.
- Retry count is bounded.
- Failure state records useful error.
- Success state records artifact/result.
- Replay is safe.
- Webhook handlers verify signatures when applicable.
- Partial failure can resume or fail cleanly.

## Validation Ideas

- Submit the same payload twice.
- Retry after a simulated failure.
- Run two workers against the same pending job.
- Re-run a completed job.
- Inspect final state and artifacts.

## Output

Return:

- workflow reviewed,
- idempotency mechanism,
- retry mechanism,
- tests or validation performed,
- duplicate/replay risk,
- required fixes.

## Rules

- Do not call a worker production-ready without replay evidence.
- Do not ignore partial failure states.
- Do not test destructive external side effects without explicit approval.

