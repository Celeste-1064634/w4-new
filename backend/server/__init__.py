# Import flask and datetime module for showing date and time
from flask import Flask, jsonify, request
import datetime
from flask_jwt_extended import JWTManager

from flask_bcrypt import Bcrypt

from flask_cors import CORS

x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)

CORS(app)

bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# Import module
import sqlite3
  
# Connecting to sqlite
conn = sqlite3.connect('database/database.db', check_same_thread=False)
# conn.row_factory = sqlite3.Row

from server import routes