import cherrypy
import urllib.request
import json
import base64
import socket

"""
    Json receiving example:
        JSON_object = json.loads(cherrypy.request.body.read().decode('utf-8'))
        JSON_field = JSON_object.get("FIELD_NAME")
                
    Json sending example:
        #create json packet
        response = {
            'response': 'ok',
            }
        #send
        return json.dumps(response)
"""

class AccountApi(object):
    def __init__(self, database):
        self.database = database

    @cherrypy.expose
    def register(self):
        """Called when client requests to register, should create the user on the user table, 
            after creating a new user the client should be logged in
        
        Arguments:
            username (string): Name used for login
            password (string): Password used for login
        """
        JSON_object = json.loads(cherrypy.request.body.read().decode('utf-8'))
        username = JSON_object.get("username")
        password = JSON_object.get("password")

        try:
            isRegistered = self.database.add_user(username, password)
            cherrypy.session["username"] = username
            cherrypy.session["password"] = password
        except Exception as e:
            print(e)
        finally:
            response = {
                'success': isRegistered
            }
            return json.dumps(response)
    
    @cherrypy.expose
    def login(self):
        """Will verify user identity by checking user and password on user table
        
        Arguments:
            username (string): Name used for login
            password (string): Password used for login
        """
        JSON_object = json.loads(cherrypy.request.body.read().decode('utf-8'))
        username = JSON_object.get("username")
        password = JSON_object.get("password")

        try:
            isLoggedIn = self.database.get_password(username) == password
            cherrypy.session["username"] = username
            cherrypy.session["password"] = password
        except Exception as e:
            isLoggedIn = False
            print(e)
        finally:
            response = {
                'success': isLoggedIn
            }
            return json.dumps(response)
