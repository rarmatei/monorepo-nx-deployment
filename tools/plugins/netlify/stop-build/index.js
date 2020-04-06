module.exports = {
  onInit: ({ utils }) => {
    const currentProject = process.env.PROJECT_NAME;
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const projectHasChanged = projectChanged(
      currentProject,
      lastDeployedCommit,
      latestCommit
    );
    if (!projectHasChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected by the latest changes`
      );
    }
  }
};

function projectChanged(projectName, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `yarn --silent exec nx print-affected -- --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();
  const changedProjects = JSON.parse(output).projects;
  if (changedProjects.find(proj => proj === projectName)) {
    return true;
  } else {
    return false;
  }
}
