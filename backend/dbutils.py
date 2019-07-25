import pymysql
###### https://www.db4free.net/phpMyAdmin/index.php

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='codeforPRES413!',
                             db='pymon',
                             charset='utf8',
                             autocommit=True,
                             cursorclass=pymysql.cursors.DictCursor)



def getCursor(sql):
    result = 0
    try:
        with connection.cursor() as cursor:
            result = cursor.execute(sql)
    except Exception as e:
        print(repr(e))
        pass
    return result

#Run a DB query that expects a list of results
def queryAll(sql):
    result = []
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
    except Exception as e:
        print(repr(e))
        pass
    return result

#Run a DB query that expects one result
def queryOne(sql):
    result = None
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchone()
    except Exception as e:
        print(repr(e))
        pass
    return result

def updateOrInsert(sql):
    success = False
    try:
        with connection.cursor() as cursor:
            success = cursor.execute(sql)
    except Exception as e:
        print(repr(e))
        pass
    return success

def deleteGame(sql):
    result = None
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
    except Exception as e:
        print (repr(e))
        pass
    return result

