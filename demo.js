const command = new Deno.Command(Deno.execPath(), {
  args: ["run", "-A", "ci.js"],
});

const { stdout, stderr, success } = await command.output();

if (!success) {
  console.log(new TextDecoder().decode(stdout));
  Deno.exit(1);
}

console.log("Success!");
