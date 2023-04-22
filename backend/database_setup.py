import sqlite3
import random
from sqlite3 import Error
from faker import Faker

fake = Faker()

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
                                                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL ,
                                                    admin integer NOT NULL,
                                                    email text NOT NULL UNIQUE,
                                                    password text NOT NULL,
                                                    first_name text NOT NULL,
                                                    last_name text NOT NULL
                                                )"""
    
    sql_create_question_list_table = """CREATE TABLE IF NOT EXISTS question_list (
                                                                id integer PRIMARY KEY AUTOINCREMENT NOT NULL ,
                                                                name text NOT NULL,
                                                                archive integer,
                                                                anonymous integer
                                                            )"""
    
    sql_create_question_table = """CREATE TABLE IF NOT EXISTS question (
                                                        id integer PRIMARY KEY AUTOINCREMENT NOT NULL ,
                                                        question text NOT NULL,
                                                        question_list_id integer NOT NULL,
                                                        sequence integer NOT NULL,
                                                        archive integer,
                                                        FOREIGN KEY (question_list_id) REFERENCES question_list (id)
                                                    )"""
    sql_create_multiple_choice_table = """CREATE TABLE IF NOT EXISTS multiple_choice (
                                                                id integer PRIMARY KEY AUTOINCREMENT NOT NULL ,
                                                                question_id integer NOT NULL,
                                                                letter text NOT NULL,
                                                                FOREIGN KEY (question_id) REFERENCES question (id)
                                                            )"""
    
    sql_create_answer_table = """CREATE TABLE IF NOT EXISTS answer (
                                                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL ,
                                                    answer text NOT NULL,
                                                    question_id integer NOT NULL,
                                                    FOREIGN KEY (question_id) REFERENCES question (id)
                                                )"""
    
    conn = create_connection(database)

    if conn is not None: 
        # Create tables
        create_table(conn, sql_create_user_table)
        create_table(conn, sql_create_question_list_table)
        create_table(conn, sql_create_question_table)
        create_table(conn, sql_create_multiple_choice_table)
        create_table(conn, sql_create_answer_table)
        conn.close()
    else: 
        print("Error! Cannot create the database connection.")

# Fill database with fake data
def db_fill_user(database):
    for i in range(10):
        random_admin = random.randint(0, 1)
        name = fake.name()
        f_name = name.split()[0]
        l_name = name.split()[1]
        em = f'{f_name}@email.com'.lower()
        passw = 'werkplaats4'
        sql_fill_user_query = f"""INSERT INTO user(first_name, last_name, email, password, admin)
                                                VALUES('{f_name}', '{l_name}', '{em}', '{passw}', {random_admin})"""
        conn = create_connection(database)
        cur = conn.cursor()
        cur.execute(sql_fill_user_query)
        conn.commit()
    return print('Database is gevuld.')



if __name__ == '__main__':
    create_connection('database/database.db')
    table_queries()
    db_fill_user('database/database.db')