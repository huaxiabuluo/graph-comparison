// development | daily | production
let buildEnv = 'development';

exports.setEnv = env => /^development|daily|production$/.test(env) && (buildEnv = env);

exports.getEnv = () => buildEnv;
