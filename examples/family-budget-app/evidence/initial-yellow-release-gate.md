# Initial Release Gate: YELLOW

The Supabase CLI could not start the local stack because the process lacks permission to connect to `/var/run/docker.sock`.

```text
LegacyDockerLifecycleInspectError
permission denied while trying to connect to the docker API
```

Database lint and migration listing then correctly failed because Postgres was unavailable at port 54322. Schema and policy presence can be checked statically, but migration execution and adversarial RLS behavior cannot be marked green here.
