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