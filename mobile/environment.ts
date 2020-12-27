import Constants from 'expo-constants';

type EnvVariables = {
  apiUrl: string
}

const ENV = {
  dev: {
    apiUrl: 'http://192.168.100.80:4001',
  },
  prod: {
    apiUrl: 'http://127.0.0.1:4001',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel): EnvVariables => {
  if (env && env.indexOf('prod') !== -1) {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
