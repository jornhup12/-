"""
@Author: Jenkin
@Date: 2023/3/24 00:35
@Description
"""

from main import db
from sqlalchemy.exc import InvalidRequestError
from main.utils import JSONHelper
from datetime import datetime, date
from sqlalchemy import or_, and_, func, text
from main.models import QuestionnaireFill, Questionnaire
from main.dbs import common


if __name__ == '__main__':
    items = common.query(QuestionnaireFill, isList=True, condition={"user_id" : 1})
    if items:
        items = [item.to_json() for item in items]
        for item in items:
            questionnaire = common.query(Questionnaire, {"id": item["questionnaire_id"]})
            if questionnaire:
                item["questionnaire"] = questionnaire
