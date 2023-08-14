import { connect } from "https://esm.sh/@dagger.io/dagger";

connect(async (client) => {
  const ctr = client
    .container()
    .from("oven/bun")
    .withDirectory(
      "/app",
      client.host().directory(".", { exclude: ["node_modules/", ".git"] })
    )
    .withWorkdir("/app")
    .withExec(["bun", "install"])
    .withExec(["bun", "test"]);

  await ctr.file("/app/calc.test.js").export("./calc.test.new.js");

  console.log(await ctr.stdout());
  console.log(await ctr.stderr());
});
