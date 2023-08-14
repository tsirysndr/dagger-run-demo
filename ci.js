import { connect } from "https://esm.sh/@dagger.io/dagger";

connect(async (client) => {
  const ctr = client
    .container()
    .from("denoland/deno")
    .withDirectory("/app", client.host().directory(".", { exclude: [".git"] }))
    .withWorkdir("/app")
    .withExec(["deno", "test", "-A", "--coverage=coverage", "--lock-write"])
    .withExec(["sh", "-c", "deno coverage ./coverage --lcov > coverage.lcov"]);

  await ctr.file("/app/coverage.lcov").export("./coverage.lcov");

  console.log(await ctr.stdout());
  console.log(await ctr.stderr());
});
