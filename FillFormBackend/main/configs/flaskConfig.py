# db config
HOST = "139.196.243.228"
PORT = "3306"
DB = "FillForm"
USER = "gbf"
PASS = "admin123"
CHARSET = "utf8mb4"
DB_URI = "mysql+pymysql://{}:{}@{}:{}/{}?charset={}".format(USER, PASS, HOST, PORT, DB, CHARSET)
SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_COMMIT_TEARDOWN = True
JSON_AS_ASCII = False

REDIS_URL = "redis://localhost:6379/0"

# flask config
SECRET_KEY = 'FillForm'
MAX_CONTENT_LENGTH = 50 * 1024 * 1024


