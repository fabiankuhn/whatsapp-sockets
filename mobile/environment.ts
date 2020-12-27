import Constants from 'expo-constants';

type EnvVariables = {
  apiUrl: string
}

const ENV = {
  dev: {
    apiUrl: Constants.manifest.debuggerHost
      ? `http://${Constants.manifest.debuggerHost?.split(':')[0]}:4001`
      : 'http://localhost:4001',
  },
  prod: {
    apiUrl: '',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel): EnvVariables => {
  if (env && env.indexOf('prod') !== -1) {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
