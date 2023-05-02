from flask import Flask, jsonify, request
import datetime


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from server import conn, app, bcrypt

# from bcrypt_init import bcrypt


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


@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM user WHERE email = '{email}'")
    result = cursor.fetchone()
    cursor.close()

    # bla = bcrypt.generate_password_hash("werkplaats4").decode("utf-8")
    # cursor = conn.cursor()
    # cursor.execute(f'''UPDATE user SET password = "{bla}" WHERE id = 1;''')
    # conn.commit()
    
    if result:
        print(result[3])
        # bcrypt.check_password_hash(result[3], password) 
        
        access_token = create_access_token(identity=email)
        # print(access_token)
        # passw = bcrypt.generate_password_hash("werkplaats4").decode('utf-8')
        passw = result[3]
        test = bcrypt.check_password_hash(passw, password) 
        print(test)
        print(passw)


        return jsonify(access_token=access_token)
    
    
    else:
        print("geen gebruikers")

        print("test")
        print(email, password)
        if email != "test" or password != "test":
            return jsonify({"msg": "Bad username or password"}), 401
        return jsonify({"msg": "No users"}), 400
