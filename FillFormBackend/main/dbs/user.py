from main import db
from sqlalchemy.exc import InvalidRequestError
from main.utils import JSONHelper
from datetime import datetime, date
from sqlalchemy import or_, and_, func, text
from main.models import User, Feedback


# user
def query_user(page=0, limit=0, isList=False, condition=None):
    qs = User.query.filter(User.status == True)
    if 'id' in condition:
        qs = qs.filter(User.id == condition['id'])
    return qs.paginate(page, limit, False).items if isList else qs.first()


def query_user_by_openid(openid):
    return User.query.filter(User.openid == openid).first()


def query_user_by_wxOpenid(wx_openid):
    return User.query.filter(User.wx_openid == wx_openid).first()


def query_user_by_unionid(unionid):
    return User.query.filter(User.unionid == unionid).first()


def query_user_by_phone(phone):
    return User.query.filter(User.phone == phone).first()


def query_user_by_unionid(unionid):
    return db.session.query(User).filter(User.unionid == unionid).first()


def query_userList_by_accessRight(page, limit, access_right):
    return db.session.query(User).filter(User.access_right == access_right) \
        .filter(User.status == True).order_by(User.create_time.desc()) \
        .paginate(page, limit, False).items


def query_userList(page, limit, condition=None):
    qs = User.query.filter(User.status == True)
    if 'user_id' in condition:
        qs = qs.filter(User.id == condition['user_id'])
    if 'userKeyword' in condition:
        qs = qs.filter(
            or_(User.nick.like('%' + condition['userKeyword'] + '%'),
                User.id == condition['userKeyword']))

    return qs.order_by(User.create_time.desc()).paginate(page, limit, False).items


def query_user_by_brick(page, limit):
    '''获取排行榜'''
    return User.query.filter(User.status == True) \
        .order_by(User.brick.desc()) \
        .paginate(page, limit, False).items


if __name__ == '__main__':
    print()
