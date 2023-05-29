import sqlite3

class QueryModel:
    def __init__(self, database_file):
        self.database_file = database_file

    def execute_query(self, sql_query, is_select=True):
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

    def column_query(self, sql_query, is_select=True):
        conn = sqlite3.connect(self.database_file)
        cursor = conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        conn.close()
        return result

    def execute_update(self, sql_query, is_select=True):
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



