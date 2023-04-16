# Import flask and datetime module for showing date and time
from flask import Flask, jsonify
import datetime
  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)
  
# Import module
import sqlite3
  
# Connecting to sqlite
conn = sqlite3.connect('instance/feedbacktool.db', check_same_thread=False)  



# data = cursor.execute('''SELECT * FROM STUDENT''')
# for row in data:
#     print(row)

# Route for seeing a data
@app.route('/data')
def get_students():
    cursor = conn.cursor()

    cursor.execute('''SELECT * FROM STUDENT''')
    students = cursor.fetchall()
    cursor.close()
    print(students)
    # Returning an api for showing in  reactjs
    return jsonify(students)
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)