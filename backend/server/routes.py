from flask import jsonify, request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import current_user

from server import conn, app, bcrypt, jwt
from query_model import QueryModel

query_model = QueryModel('database/database.db')

# Route for getting all surveys
@app.route('/surveys', methods=['GET'])
@jwt_required()
def get_surveys():
    surveys = query_model.execute_query('SELECT survey_id, name FROM survey')
    # Convert the surveys into a list of dictionaries to be converted into JSON
    surveys_list = [{'survey_id': survey[0], 'name': survey[1]}
                    for survey in surveys]

    return jsonify(surveys_list)

@app.route('/save_new_survey', methods=['POST'])
@jwt_required()
def save_new_survey():
    data = request.get_json()
    title = data["title"]
    query_model.save_new_survey(title)
    return {
        "status": "ok"
    }



# Route for getting questions and title by survey id
@app.route('/survey/data/<id>', methods=['GET'])
@jwt_required()
def get_questions_for_survey(id=None):
    print(current_user)
    # Fetch survey name
    survey_name = query_model.execute_query_by_id(f"SELECT name FROM survey WHERE survey_id = {id}")['name']
    # Fetch all questions with survey_id
    data = query_model.execute_query(f"SELECT * FROM question WHERE survey_id = {id}")
    
    questions = []
    for question in data:
        item = query_model.execute_query_by_id(f"SELECT * FROM question_collection WHERE question_collection_id = {question['question_collection_id']}")
        answers_data = query_model.execute_query(f"SELECT * FROM answer WHERE question_id = {question['question_id']}")
        # Check if the question is multiple choice 
        if item['type'] != None and item['type'] != "" :
            if item['type'] == 1:
                choices = []
                choices_data = query_model.execute_query(f"SELECT * FROM multiple_choice WHERE question_collection_id = {question['question_collection_id']}")
                for choice in choices_data:
                    choices.append({
                    'multiple_choice_id': choice['multiple_choice_id'],
                    'number': choice['number'],
                    'answer': choice['answer'],
                    'question_collection_id': choice['question_collection_id']})
            else:
                choices = None

            answers = []
            for answer in answers_data:
                user_item = query_model.execute_query_by_id(f"SELECT user_id, email, first_name, last_name FROM user WHERE user_id = {answer['user_id']}")
                user = {
                    "user_id": user_item['user_id'],
                    "email": user_item['email'],
                    "first_name": user_item['first_name'],
                    "last_name": user_item['last_name']
                }

                answers.append({
                    'answer_id': answer['answer_id'],
                    'answer': answer['answer'],
                    'question_id': answer['question_id'],
                    'user': user})

            questions.append({
                'question_id': question['question_id'],
                'question_collection_id': question['question_collection_id'],
                'sequence': question['sequence'],
                'survey_id': question['survey_id'],
                'question_text': question['question_text'],
                'type': item['type'],
                'answers': answers,
                'choices': choices
            })

    return jsonify({ 'questions': questions, 
                    'name': survey_name})


# for creating token for user
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # get user by email
    result = query_model.execute_query_by_id(f"SELECT * FROM user WHERE email = '{email}'")

    if result:
        # creates a token binded to the email
        access_token = create_access_token(identity=email)

        # check if password is correct
        saved_password = result[3]
        is_correct = bcrypt.check_password_hash(saved_password, password)
        if is_correct:
            print("juiste wachtwoord")
            return jsonify(access_token=access_token,
                           full_name=f'{result["first_name"]} {result["last_name"]}',
                           first_name=result['first_name'],
                           last_name=result['last_name'],
                           email=result['email'],
                           )

    print("geen gebruiker / ongeldige wachtwoord, email")
    print(email, password)
    return jsonify({"msg": "E-mail of wachtwoord niet correct"}), 400


# used for returning user data
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    result = query_model.execute_query_by_id(f"SELECT * FROM user WHERE email = '{identity}'")
    
    return {
        "firstName": result['first_name'],
        "lastName": result['last_name'],
        "fullName": f'{result["first_name"]} {result["last_name"]}',
        "email": result['email']
    }

# used for sending user data by jwt token to frontend
@app.route('/who_am_i', methods=["GET"])
@jwt_required()
def authenticate():
    return jsonify(current_user)

@app.route('/question/edit/<id>', methods=["POST"])
@jwt_required()
def edit_question(id=None):
    question = request.json["question"]
    query_model.commit_query(f"UPDATE question SET question_text = '{question}' WHERE question_id = '{id}'")
    return jsonify("function_ended")

@app.route('/question/delete/<id>', methods=["DELETE"])
@jwt_required()
def delete_question(id=None):
    query_model.commit_query(f"DELETE FROM question WHERE question_id = '{id}'")
    return jsonify("function_ended")


@app.route('/question', methods=["GET"])
@jwt_required()
def all_questions():
    questions = query_model.get_all_questions()
    question_array = []
    for question in questions:
        if question[3] == False:
            question_array.append({
                "id": question[0],
                "question": question[1],
                "type": question[3]
                })
        if question[3] == True:
            options = query_model.get_mc_options_by_id(question[0])
            option_array = []
            for option in options:
                option_array.append(option[0])
            question_array.append({
                "id": question[0],
                "question": question[1],
                "type": question[3],
                "options": option_array
                })
    return question_array


@app.route('/save_open_question_to_db', methods=["POST"])
@jwt_required()
def save_open_question_to_db():
    data = request.get_json()
    question = data["question"]
    query_model.save_new_open_question_to_db(question)
    return {
        "status": "ok"
    }

@app.route('/save_mc_question_to_db', methods=["POST"])
@jwt_required()
def save_mc_question_to_db():
    data = request.get_json()
    question = data["question"]
    options = data["options"]
    query_model.save_new_mc_question_to_db(question, options)
    return {
        "status": "ok"
    }