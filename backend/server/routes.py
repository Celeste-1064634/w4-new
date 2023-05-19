from flask import jsonify, request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import current_user

from server import conn, app, bcrypt, jwt


# Route for getting surveys
@app.route('/surveys', methods=['GET'])
def get_surveys():
    cursor = conn.cursor()
    cursor.execute('SELECT survey_id, name FROM survey')
    surveys = cursor.fetchall()
    cursor.close()

    # Convert the surveys into a list of dictionaries to be converted into JSON
    surveys_list = [{'survey_id': survey[0], 'name': survey[1]}
                    for survey in surveys]

    return jsonify(surveys_list)



# Route for getting questions by survey id
@app.route('/survey/data/<id>', methods=['GET'])
@jwt_required()
def get_questions_for_survey(id=None):
    print(current_user)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM question WHERE survey_id = {id}")
    data = cursor.fetchall()
    questions = []
    for question in data:

        cursor.execute(
            f"SELECT * FROM question_collection WHERE question_collection_id = {question[1]}")
        item = cursor.fetchone()

        cursor.execute(
            f"SELECT * FROM answer WHERE question_id = {question[0]}")
        answers_data = cursor.fetchall()

        # Check if the question is multiple choice 
        if item[3] == 1:
            choices = []
            cursor.execute(f"SELECT * FROM multiple_choice WHERE question_collection_id = {question[1]}")
            choices_data = cursor.fetchall()
            for choice in choices_data:
                choices.append({
                'multiple_choice_id': choice[0],
                'letter': choice[1],
                'answer': choice[2],
                'question_collection_id': choice[3]})
        else:
            choices = None

        answers = []
        for answer in answers_data:
            cursor.execute(
            f"SELECT user_id, email, first_name, last_name FROM user WHERE user_id = {answer[3]}")
            user_item = cursor.fetchone()
            user = {
                "user_id": user_item[0],
                "email": user_item[1],
                "first_name": user_item[2],
                "last_name": user_item[3]
            }

            answers.append({
                'answer_id': answer[0],
                'answer': answer[1],
                'question_id': answer[2],
                'user': user})

        questions.append({
            'question_id': question[0],
            'question_collection_id': question[1],
            'sequence': question[2],
            'survey_id': question[3],
            'question_text': item[1],
            'type': item[3],
            'answers': answers,
            'choices': choices
        })

    cursor.close()
    return jsonify(questions)

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

# for creating token for user


@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # get users by email
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM user WHERE email = '{email}'")
    result = cursor.fetchone()
    cursor.close()

    # bla = bcrypt.generate_password_hash("werkplaats4").decode("utf-8")
    # cursor = conn.cursor()
    # cursor.execute(f'''UPDATE user SET password = "{bla}" WHERE id = 1;''')
    # conn.commit()

    if result:
        # creates a token binded to the email
        access_token = create_access_token(identity=email)

        # check if password is correct
        saved_password = result[3]
        is_correct = bcrypt.check_password_hash(saved_password, password)
        if is_correct:
            print("juiste wachtwoord")
            return jsonify(access_token=access_token,
                           full_name=f'{result[4]} {result[5]}',
                           first_name=result[4],
                           last_name=result[5],
                           email=result[2],
                           )
        # else:
        #     return jsonify({"msg": "E-mail of wachtwoord niet correct"}), 400

    print("geen gebruiker / ongeldige wachtwoord, email")
    print(email, password)
    return jsonify({"msg": "E-mail of wachtwoord niet correct"}), 400


# used for returning user data
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM user WHERE email = '{identity}'")
    result = cursor.fetchone()
    cursor.close()
    return {
        "firstName": result[4],
        "lastName": result[5],
        "fullName": f'{result[4]} {result[5]}',
        "email": result[2]
    }

# used for sending user data by jwt token to frontend


@app.route('/who_am_i', methods=["GET"])
@jwt_required()
def authenticate():
    return jsonify(current_user)

@app.route('/question/edit/<id>', methods=["POST"])
def edit_question(id=None):
    question = request.json["question"]
    cursor = conn.cursor()
    cursor.execute(f"UPDATE question_collection SET question_text = '{question}' WHERE question_collection_id = '{id}'")
    conn.commit()
    cursor.close()
    return jsonify("function_ended")

@app.route('/question/delete/<id>', methods=["DELETE"])
def delete_question(id=None):
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM question_collection WHERE question_collection_id = '{id}'")
    conn.commit()
    cursor.close()
    return jsonify("function_ended")