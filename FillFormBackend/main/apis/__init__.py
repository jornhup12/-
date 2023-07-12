from flask_restplus import Resource, Api
from flask import Blueprint, request, session
from main.code import user_not_login, admin_not_login

api_blueprint = Blueprint("open_api", __name__, url_prefix="/v1")
api = Api(api_blueprint, version='1.0', title='WaterPlan API',
          description='WaterPlan API v1.0', )


def get_cookie():
    c = session.get("userId")
    if not c:
        return None
    else:
        return int(c)


def check_cookie():
    c = session.get("userId")
    if not c:
        user_not_login()
    else:
        return int(c)


def check_admin_cookie():
    c = session.get("adminId")
    if not c:
        admin_not_login()
    else:
        return int(c)


def set_session(user_id):
    session['userId'] = user_id


def set_admin_session(user_id):
    session['adminId'] = user_id
