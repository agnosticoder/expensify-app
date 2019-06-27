// import moment from 'moment'; // This will not work becuase it will try to access the mocked version of moment not the original one, jest give us way to access the original module by require.requireActual(moduleName);

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};