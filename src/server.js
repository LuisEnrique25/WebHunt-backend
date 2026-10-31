const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.authenticate();

        console.log('Database connection successful');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Link http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to database:', error);
        process.exitCode = 1;
    }
};

main();