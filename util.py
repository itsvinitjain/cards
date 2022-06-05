from ctypes import util
import config as c 
import mysql.connector
import time
import datetime
import sqlite3


def get_db_connection():
    conn = sqlite3.connect('db.sqlite3')
    conn.row_factory = sqlite3.Row
    return conn



def dbconnect(flag=c.env):
    if flag == 'local':
        conn =  get_db_connection()
        return conn 
    db_creds = c.DATABASES

    try: 

        con = mysql.connector.connect(**db_creds)   # connect with dict params above 

        #con.autocommit = autocommit 
 

        return con                                              # return the DB connection object to caller 

                                                                                # so they can close it as required whenever they want 

    except Exception as e:
            print("Error while connecting to MySQL", e)


def insert_data(data):
    db_creds = c.DATABASES
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    data["datetime"]=str(timestamp)
    print(data)
    try:
        if c.env == "local":
            print("sdfg")
            connection = get_db_connection()
        else:
            print("sdfsdfdf")
            connection = mysql.connector.connect(**db_creds)
            if connection.is_connected():
                db_Info = connection.get_server_info()  
                print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        placeholders = ', '.join(['?'] * len(data)) if c.env == "local" else ', '.join(['%s'] * len(data))
        columns = ', '.join(data.keys())
        sql = "INSERT INTO %s ( %s ) VALUES ( %s )" % ("card", columns, placeholders)
        cursor.execute(sql, list(data.values()))
        query="""Select * from card LIMIT 5"""
        cursor.execute(query)
        res=cursor.fetchall()
        connection.commit()
    except Exception as e:
        print("Error while connecting to MySQL", e)
        res=None
    finally:
        if c.env == "local":
            cursor.close()
            connection.close()
        elif connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
    if res:
        if c.env == "local":
            res = [tuple(i) for i in res]
        return {"data":res}
    return {"error":f"Duplicate entry exists"}
    
def rows_to_dict_list(cursor): 
     columns = [i[0] for i in cursor.description] 
     if c.env == "local":
        cursor = [tuple(i) for i in cursor]
     r = [dict(zip(columns, row)) for row in cursor] 


     return r 



      


