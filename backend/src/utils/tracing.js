import tracer from 'dd-trace';

tracer.init({
  service: 'frostsight-backend',
  env: process.env.NODE_ENV || 'development',
  logInjection: true,
  runtimeMetrics: true
});

export default tracer;
