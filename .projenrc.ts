import { awscdk } from "projen";
// NOTE: http://projen.io/api/API.html#class-awscdktypescriptapp--
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "bela-poc",
  projenrcTs: true,
  gitignore: [
    // NOTE: https://www.toptal.com/developers/gitignore/api/macos,intellij
    // this intelliJ list generated by gitignore.io
    ".idea/",
    "cmake-build-*/",
    "*.iws",
    "out/",
    // this macOS list generated by gitignore.io
    ".DS_Store",
    ".AppleDouble",
    ".LSOverride",
  ],
  license: "MIT",
  copyrightOwner: "hohihohi",
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  /* Build dependencies for this module. */
  devDeps: [
    "git-cz",
    "husky",
    "@commitlint/config-conventional",
    "@commitlint/cli",
  ],
  dependabot: true,
  prettier: true,
  // packageName: undefined,  /* The "name" in package.json. */
});

// Adding an extra custom task
project.addScripts({
  prepare: "husky install",
  commit: "git-cz --disable-emoji",
});
project.package.addField("config", {
  commitizen: { path: "git-cz" },
});

project.synth();
