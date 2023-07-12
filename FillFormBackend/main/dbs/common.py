from main import db
from sqlalchemy.exc import InvalidRequestError
from main.utils import JSONHelper, InterfaceHelper
from datetime import datetime
from sqlalchemy import or_, and_, func
import logging


def insert(object):
    try:
        if type(object) == list:
            for i in object:
                i.create_time = datetime.now()
                db.session.add(i)
        else:
            object.create_time = datetime.now()
            db.session.add(object)
        db.session.commit()
        return True
    # except InvalidRequestError as e:
    #     print(e)
    #     db.session.rollback()
    except Exception as e:
        logging.error(e)
        return False


def update(obj, time_update=False):
    try:
        if time_update:
            obj.update_time = datetime.now()
        db.session.commit()
        return True
    except InvalidRequestError:
        db.session.rollback()
    except Exception as e:
        logging.error(e)
        return False


def query(model: db.Model, page=0, limit=100, isList=False, condition=None):
    try:
        if condition is None:
            condition = {}
        qs = model.query.filter(model.status == True)
        for key in condition.keys():
            if key in model.__dict__.keys():
                print(key)
                qs = qs.filter(getattr(model, key) == condition[key])
        return qs.paginate(page, limit, False).items if isList else qs.first()
    except Exception as e:
        logging.error(e)


def count(model: db.Model, condition=None):
    try:
        if condition is None:
            condition = {}
        qs = model.query.filter(model.status == True)
        for key in condition.keys():
            if key in model.__dict__.keys():
                qs = qs.filter(getattr(model, key) == condition[key])
        return qs.count()
    except Exception as e:
        logging.error(e)
