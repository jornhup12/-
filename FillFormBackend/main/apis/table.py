"""
@Author: Jenkin
@Date: 2023/3/24 02:48
@Description
"""
import os
import platform
import time
from datetime import datetime, timedelta
from flask import request, make_response, session
from flask_restplus import Resource, fields
from werkzeug.datastructures import FileStorage

from main import basedir
from main import redis_client
from main.code import *
from main.dbs.common import *
from main.dbs.user import *
from main.dbs.table import *
from main.utils import RequestHelper, FileHelper, snowflake, JSONHelper
from main.configs import configHandle
from . import api, check_cookie, set_session, check_admin_cookie

# 定义命名空间
ns = api.namespace('table', description='Table api')


@ns.route('/questionnaire')
class QuestionnaireApi(Resource):
    """问卷API"""

    def post(self):
        """
        新增问卷
        :return:
        """
        user_id = check_cookie()
        parameters = RequestHelper.formToDict(request)
        item = JSONHelper.dictToObj(parameters, Questionnaire)
        if item:
            item.user_id = user_id
            if insert(item):
                return success(item.id)
        return fail()

    @ns.param("id", "id")
    def get(self):
        """
        获取问卷
        :return:
        """
        parameters = RequestHelper.formToDict(request)
        item = query(Questionnaire, condition=parameters)
        if item:
            return success(item.to_json())
        return fail()

    @ns.param("id", "id")
    def delete(self):
        """
        删除问卷
        :return:
        """
        parameters = RequestHelper.formToDict(request)
        item = query(Questionnaire, condition=parameters)
        if item:
            item.status = False
            if update(item):
                return success()
        return fail()


@ns.route("/questionnaire/list")
class QuestionnaireListApi(Resource):

    @ns.param("user_id")
    @ns.param("page")
    @ns.param("limit")
    def get(self):
        """
        获取问卷列表
        :return:
        """
        parameters = RequestHelper.formToDict(request)
        items = query(Questionnaire, isList=True, condition=parameters)
        if items:
            items = [item.to_json() for item in items]
            for item in items:
                fill_count = count(QuestionnaireFill, {"questionnaire_id": item["id"]})
                item["fill_count"] = fill_count
            return success(items)
        return fail()

@ns.route('/questionnaire/fill/list')
class QuestionnaireFillListApi(Resource):
    """问卷填充列表API"""

    @ns.param("questionnaire_id", "问卷id")
    @ns.param("page", "页码")
    @ns.param("limit", "每页数量")
    def get(self):
        """
        获取问卷填充列表
        :return:
        """
        user_id = check_cookie()
        parameters = RequestHelper.formToDict(request)
        parameters["user_id"] = user_id
        items = query(QuestionnaireFill, isList=True, condition=parameters)
        if items:
            items = [item.to_json() for item in items]
            # 查询所有的再转
            for item in items:
                questionnaire = query(Questionnaire, condition={"id": item["questionnaire_id"]})
                item["questionnaire"] = questionnaire
            for item in items:
                if item["questionnaire"]:
                    item["questionnaire"] = item["questionnaire"].to_json()
        return success(items)


@ns.route('/questionnaire/fill')
class FillQuestionnaireApi(Resource):
    """填写问卷API"""

    def post(self):
        """
        填写问卷
        :return:
        """
        user_id = check_cookie()
        parameters = RequestHelper.formToDict(request)
        item = JSONHelper.dictToObj(parameters, QuestionnaireFill)
        if item:
            item.user_id = user_id
            if insert(item):
                return success(item.id)
        return fail()

    @ns.param("id", "id")
    def delete(self):
        """
        删除填写的问卷
        :return:
        """
        parameters = RequestHelper.formToDict(request)
        item = query(QuestionnaireFill, condition=parameters)
        if item:
            item.status = False
            if update(item):
                return success()
        return fail()
