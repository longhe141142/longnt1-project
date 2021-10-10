const dotenv = require("dotenv");
const path = require("path");
// Load environment constiables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
const env = process.env.NODE_ENV;

const configs = {
  base: {
    env,
    // Application
    name: process.env.APP_NAME || "SEQUELIZE_REMASTER",
    host: process.env.HTTP_HOST || "0.0.0.0",
    port: process.env.HTTP_PORT || 3000,
    // Database
    db_host: process.env.DB_HOST || "localhost",
    db_port: process.env.DB_PORT || 3306,
    db_dialect: process.env.DB_DIALECT || "mysql",
    db_username: process.env.DB_USERNAME || "root",
    db_password: process.env.DB_PASSWORD || "1222",
    db_database: process.env.DB_DATABASE || "nodejsmysql",
    db_recreate: process.env.DB_RECREATE == "true", // False as default
    db_run_migration: process.env.DB_RUN_MIGRATION != "false", // True as default
    force_reset: false,
    // Security
    token_secret: process.env.TOKEN_SECRET || "TEST-DEV-SECRET",
    token_expiry: process.env.TOKEN_EXPIRY || 60 * 60 * 24 * 3, // Expiry day for 3 days.
    max_auth_failed_attempts: process.env.MAX_AUTH_FAILED_ATTEMPTS || 5,
    unlock_time: process.env.UNLOCK_TIME || 60, // Lock in 60 seconds
    // Query
    query_default_sort: process.env.QUERY_DEFAULT_SORT || "createdAt",
    query_default_order: process.env.QUERY_DEFAULT_ORDER || "DESC",
    query_page_limit: process.env.QUERY_PAGE_SIZE || 5,
    // Elastic APM
    elastic_active: process.env.ELASTIC_ACTIVE == "true", // False as default
    elastic_server_url: process.env.ELASTIC_SERVER_URL || "",
    elastic_secret_token: process.env.ELASTIC_SECRET_TOKEN || "",
    // Cache
    cache_time: process.env.CACHE_TIME || 10, // Keeps cache in 10 seconds
    // Redis
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    // Logger
    log_file_name: process.env.LOG_FILENAME,
    log_directory: process.env.LOG_DIRECTORY,
    // JWT_TOKEN = process.env.secrete || "jwt",
  },
};

const config = Object.assign(configs.base, configs[env]);

module.exports = config;
