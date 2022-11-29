const replaceInFiles = require("replace-in-files");

const options = {
  // See more: https://www.npmjs.com/package/globby
  // Single file or glob
  files: "path/to/file",
  // Multiple files or globs
  files: ["**/node_modules/**/build.gradle"],
  optionsForFiles: {
    // default
    ignore: [],
  },
  // See more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  // Replacement
  from: `apply plugin: 'maven'`, // string or regex
  to: `apply plugin: 'maven-publish'`, // string or fn  (fn: carrying last argument - path to replaced file)
};

replaceInFiles(options)
  .then(({ changedFiles, countOfMatchesByPaths }) => {
    console.log("Modified files:", changedFiles);
    console.log("Count of matches by paths:", countOfMatchesByPaths);
    console.log("was called with:", options);

    options.from = /configurations\s*{\s*deployerJars\s*}/gm;
    options.to = ``;

    replaceInFiles(options)
      .then(({ changedFiles, countOfMatchesByPaths }) => {
        console.log("Modified files:", changedFiles);
        console.log("Count of matches by paths:", countOfMatchesByPaths);
        console.log("was called with:", options);

        options.from = `classifier = 'sources'`;
        options.to = `archiveClassifier = 'sources'`;

        replaceInFiles(options)
          .then(({ changedFiles, countOfMatchesByPaths }) => {
            console.log("Modified files:", changedFiles);
            console.log("Count of matches by paths:", countOfMatchesByPaths);
            console.log("was called with:", options);

            options.from = /artifacts\s*{\s*archives androidSourcesJar\s*}/gm;
            options.to = ``;

            replaceInFiles(options)
              .then(({ changedFiles, countOfMatchesByPaths }) => {
                console.log("Modified files:", changedFiles);
                console.log(
                  "Count of matches by paths:",
                  countOfMatchesByPaths
                );
                console.log("was called with:", options);

                options.from =
                  /uploadArchives\s*{\s*repositories\s*{\s*mavenDeployer\s*{\s*configuration\s*=\s*configurations.deployerJars\s*repository\(url:\s*mavenLocal\(\).url\)/gm;
                options.to = `publishing {
                  publications {
                    maven(MavenPublication) {
                      artifact androidSourcesJar`;
                replaceInFiles(options)
                  .then(({ changedFiles, countOfMatchesByPaths }) => {
                    console.log("Modified files:", changedFiles);
                    console.log(
                      "Count of matches by paths:",
                      countOfMatchesByPaths
                    );
                    console.log("was called with:", options);
                    console.log("finished");
                  })
                  .catch((error) => {
                    console.error("Error occurred:", error);
                  });
              })
              .catch((error) => {
                console.error("Error occurred:", error);
              });
          })
          .catch((error) => {
            console.error("Error occurred:", error);
          });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
