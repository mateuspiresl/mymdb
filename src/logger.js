import { createLogger, format, transports } from 'winston';

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const formatMessage = format.printf(({ level, message, timestamp }) => {
  return `${formatTimestamp(timestamp)} ${level}: ${message}`;
});

export default createLogger({
  format: format.combine(format.splat(), format.timestamp(), formatMessage),
  transports: [new transports.Console()],
});
