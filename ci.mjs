import { connect } from "@dagger.io/dagger";

connect(async (client) => {
  const ctr = client.container().from("oven/bun")
	.withDirectory("/app", client.host().directory(".", { exclude: [ "node_modules/", ".git" ]  }))
	.withWorkdir("/app")
	.withExec(["bun", "install"])
	.withExec(["bun", "test"]);

  console.log(await ctr.stdout());
  console.log(await ctr.stderr());
});

