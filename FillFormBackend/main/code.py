from flask_restplus import abort


def success(data=None, message='success'):
    response = dict()
    response['message'] = message
    response['data'] = data
    response['code'] = 200
    return response, 200


def fail(message='fail'):
    response = dict()
    response['message'] = message
    response['code'] = 400
    return response, 200


def user_card_not_exist():
    """用户名片不存在"""
    response = dict()
    response['message'] = 'user card not exist!'
    response['code'] = 400
    response['errCode'] = 40001
    return response, 200


def user_not_login():
    abort(400, 'user not login')


def admin_not_login():
    abort(400, 'admin not login')


def get_param_invalid():
    abort(400, 'get param invalid')


def get_type_invalid():
    abort(400, 'get type invalid')


def get_data_fail():
    abort(400, 'get data invalid')


def get_file_fail():
    abort(400, 'get file invalid')


def check_name_fail():
    abort(400, 'check name fail')


def bad_request():
    abort(400, 'bad request')


def unauthorized():
    abort(400, 'unauthorized')


def forbidden():
    abort(400, 'forbidden')
