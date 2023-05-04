import sqlite3
import random
from sqlite3 import Error
from faker import Faker
from bcrypt_init import bcrypt
from query_model import QueryModel

fake = Faker()
query_model = QueryModel('database/database.db')

# Create a database connection to a SQLite database


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
        return conn
    except Error as e:
        print(e)
    return conn

# Create database tables


def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def table_queries():
    database = 'database/database.db'
    sql_create_user_table = """CREATE TABLE IF NOT EXISTS user (
                                                    user_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                                    admin integer NOT NULL,
                                                    email text NOT NULL UNIQUE,
                                                    password text NOT NULL,
                                                    first_name text NOT NULL,
                                                    last_name text NOT NULL
                                                )"""

    sql_create_survey_table = """CREATE TABLE IF NOT EXISTS survey (
                                                                survey_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                                                name text NOT NULL,
                                                                sequence integer NOT NULL,
                                                                archive integer,
                                                                anonymous integer,
                                                                user_id integer NOT NULL,
                                                                FOREIGN KEY (user_id) REFERENCES user (user_id)
                                                            )"""

    sql_create_question_table = """CREATE TABLE IF NOT EXISTS question (
                                                        question_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                                        question_collection_id integer NOT NULL,
                                                        survey_id integer NOT NULL,
                                                        FOREIGN KEY (question_collection_id) REFERENCES  question_collection (question_collection_id),
                                                        FOREIGN KEY (survey_id) REFERENCES survey (survey_id)
                                                    )"""
    
    sql_create_question_collection_table = """CREATE TABLE IF NOT EXISTS question_collection (
                                                                        question_collection_id integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                                                        question_text text NOT NULL,
                                                                        archive integer,
                                                                        type integer
                                                                    )"""
    sql_create_multiple_choice_table = """CREATE TABLE IF NOT EXISTS multiple_choice (
                                                                multiple_choice_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                                                letter text NOT NULL,
                                                                question_collection_id integer NOT NULL,
                                                                FOREIGN KEY (question_collection_id) REFERENCES question_collection (question_collection_id)
                                                            )"""

    sql_create_answer_table = """CREATE TABLE IF NOT EXISTS answer (
                                                    answer_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                                    answer text NOT NULL,
                                                    question_id integer NOT NULL,
                                                    user_id integer NOT NULL,
                                                    FOREIGN KEY (question_id) REFERENCES question (question_id),
                                                    FOREIGN KEY (user_id) REFERENCES user (user_id)
                                                )"""

    conn = create_connection(database)

    if conn is not None:
        # Create tables
        create_table(conn, sql_create_user_table)
        create_table(conn, sql_create_survey_table)
        create_table(conn, sql_create_question_table)
        create_table(conn, sql_create_question_collection_table)
        create_table(conn, sql_create_multiple_choice_table)
        create_table(conn, sql_create_answer_table)
        conn.close()
    else:
        print("Error! Cannot create the database connection.")

# Fill database with fake data


def db_fill_user():
    try:
        name = fake.name()
        f_name = name.split()[0]
        l_name = name.split()[1]
        em = 'admin@email.com'.lower()
        passw = bcrypt.generate_password_hash("werkplaats4").decode("utf-8")
        sql_fill_user_query = f'''INSERT INTO user(first_name, last_name, email, password, admin)
                                                VALUES("{f_name}", "{l_name}", "{em}", "{passw}", True)'''
        query_model.execute_update(sql_fill_user_query)
        for i in range(10):
            name = fake.name()
            f_name = name.split()[0]
            l_name = name.split()[1]
            em = f'{f_name}{l_name}@email.com'.lower()
            passw = bcrypt.generate_password_hash("werkplaats4").decode("utf-8")
            sql_fill_user_query = f'''INSERT INTO user(first_name, last_name, email, password, admin)
                                                    VALUES("{f_name}", "{l_name}", "{em}", "{passw}", False)'''
            query_model.execute_update(sql_fill_user_query)
    except Error as e:
        print(e)
    finally: 
        print('Database is gevuld.')




if __name__ == '__main__':
    create_connection('database/database.db')
    table_queries()
    db_fill_user()
