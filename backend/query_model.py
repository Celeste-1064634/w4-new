import sqlite3

class QueryModel:
    def __init__(self, database_file):
        self.database_file = database_file

    def execute_query(self, sql_query):
        conn = sqlite3.connect(self.database_file)
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        cursor.execute(sql_query)
        result = cursor.fetchall()
        conn.close()
        return result
    
    def execute_query_by_id(self, sql_query):
        conn = sqlite3.connect(self.database_file)
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        cursor.execute(sql_query)
        result = cursor.fetchone()
        conn.close()
        return result

    def column_query(self, sql_query):
        conn = sqlite3.connect(self.database_file)
        cursor = conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        conn.close()
        return result

    def execute_update(self, sql_query):
        conn = sqlite3.connect(self.database_file)
        conn.execute('PRAGMA foreign_keys = ON')
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        cursor.execute(sql_query)
        conn.commit()

    def get_all_questions(self):
        query = "SELECT * FROM question_collection"
        return self.execute_query(query)
    
    def save_new_open_question_to_db(self, question):
        query = f'''INSERT INTO question_collection(question_text, archive, type)
                            VALUES("{question}", False, False)'''
        return self.execute_update(query)
    
    def commit_query(self, sql_query):
        conn = sqlite3.connect(self.database_file)
        cursor = conn.cursor()
        cursor.execute(sql_query)
        conn.commit()
        cursor.close()

    def save_new_mc_question_to_db(self, question, options):
        query = f'''INSERT INTO question_collection(question_text, archive, type)
                            VALUES("{question}", False, True)'''
        self.execute_update(query)
        id_query = self.execute_query(
                '''SELECT max (question_collection_id) FROM question_collection''')
        counter = 1
        for option in options:
            fill_multiple_choice_options = f'''INSERT INTO multiple_choice(number, answer, question_collection_id)
                                                                        VALUES ({counter}, "{option}", "{id_query[0][0]}")'''
            counter +=1
            self.execute_update(fill_multiple_choice_options)
        return "Question is saved"
    
    def get_mc_options_by_id(self, question_id):
        query = f'''SELECT answer FROM multiple_choice
                            WHERE question_collection_id IS {question_id}'''
        return self.execute_query(query)
    
    def save_new_survey(self,title, questions):
        query = f'''INSERT INTO survey(name, archive, anonymous, user_id)
                            VALUES ("{title}", False, False, 1)'''
        self.execute_update(query)
        survey_id = self.execute_query('''SELECT max (survey_id) FROM survey''')
        count = 1
        print(questions)
        for question in questions:
            q = question["question"]
            query = f'''SELECT EXISTS
                                (SELECT 1. question_collection_id
                                FROM question_collection
                                WHERE question_text IS "{question["question"]}")'''
            check = self.execute_query(query)[0][0]

            if question ["type"] ==  "open" and check == 0:
                query = f'''INSERT INTO question_collection(question_text, archive, type) VALUES("{q}", False, False)'''
                self.execute_update(query)
                question_id = self.execute_query('''SELECT max (question_collection_id) FROM question_collection''')
                print(question_id[0][0])
                query = f'''INSERT INTO question(question_collection_id, question_text, sequence, survey_id)
                                    VALUES ({question_id[0][0]}, "{q}", {count}, {survey_id[0][0]})'''
                count+=1
                self.execute_update(query)
            elif question ["type"] ==  "multiple choice" and check == 0:
                query = f'''INSERT INTO question_collection(question_text, archive, type) VALUES("{q}", False, True)'''
                self.execute_update(query)
                question_id = self.execute_query('''SELECT max (question_collection_id) FROM question_collection''')
                query = f'''INSERT INTO question(question_collection_id, question_text, sequence, survey_id)
                                    VALUES ({question_id[0][0]}, "{q}", {count}, {survey_id[0][0]})'''
                count +=1
                self.execute_update(query)
            else:
                query = f'''SELECT question_collection_id FROM question_collection
                                WHERE question_text = "{q}"'''
                question_id = self.execute_query(query)
                query = f'''INSERT INTO question(question_collection_id, question_text, sequence, survey_id)
                                    VALUES ({question_id[0][0]}, "{q}", {count}, {survey_id[0][0]})'''
                count +=1
                self.execute_update(query)