import log4js from 'log4js';

// Configure log4js
log4js.configure({
    appenders: {
        console: { type: 'console' },
    },
    categories: {
        default: { appenders: ['console'], level: 'debug' }, // Change the level to control the logging level
    },
});

// Create a logger instance
const logger = log4js.getLogger();

// Export the logger instance
export default logger;

/////////////////////////////////////////////////////////
// logger boilerplate
// import logger from './logger';

// Log a message
// logger.info('Hello World!');
// logger.debug('Hello World!');
// logger.error('Hello World!');
// logger.warn('Hello World!');
// logger.fatal('Hello World!');
// logger.trace('Hello World!');
// logger.mark('Hello World!');
// logger.level = 'debug';

// Log an object
// logger.info({ message: 'Hello World!' });

// Log a message with a context

// logger.info({ message: 'Hello World!', context: 'MyContext' });

// Log an object with a context
// logger.info({ message: 'Hello World!', context: 'MyContext' });

// import React from 'react';
// import logger from '../logger';

// const MyComponent: React.FC = () => {
//   Use the logger in your component
//   logger.debug('MyComponent is rendering');

//   return (
//     <div>
//       <h1>Hello, MyComponent!</h1>
//     </div>
//   );
// };

// export default MyComponent;
