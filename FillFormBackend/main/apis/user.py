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
from main.utils import RequestHelper, FileHelper, snowflake, ImageHelper
from main.configs import configHandle
from . import api, check_cookie, set_session, check_admin_cookie

# 定义命名空间
ns = api.namespace('user', description='User api')

user_model = api.model('UserModel', {
    'id': fields.Integer(readOnly=True, description='用户id'),
    # 'openid': fields.String(description='获取的微信openid'),
    'name': fields.String(description='姓名'),
    'sex': fields.Integer(description='性别 0-未知 1-男 2-女'),
    'nick': fields.String(description='昵称'),
    'avatar': fields.String(description='头像地址'),
    'birthday': fields.Date(description='生日'),
    'wechat': fields.String(description='微信'),
    'phone': fields.String(description='手机'),
    'region': fields.String(description='地址'),
    'brick': fields.String(description='砖头'),
    'introduction': fields.String(description='介绍'),
    'access_right': fields.Boolean(description='访问权限'),
    'status': fields.Integer(description='状态'),
    # 'create_time': fields.DateTime(description='时间')
})

business_model = api.model('BusinessModel', {
    'id': fields.Integer(readOnly=True, description='用户id'),
    'user_id': fields.Integer(description=''),
    'name': fields.String(description='姓名'),
    'wechat': fields.String(description='微信'),
    'phone': fields.String(description='手机'),
    'status': fields.Integer(description='状态'),
    # 'create_time': fields.DateTime(description='时间')
})

advertising_model = api.model('AdvertisingModel', {
    'id': fields.Integer(readOnly=True, description='id'),
    'url': fields.String(),
    'status': fields.Integer(description='状态'),
    # 'create_time': fields.DateTime(description='时间')
})

card_model = api.model('CardModel', {
    'id': fields.Integer(readOnly=True, description='id'),
    'user_id': fields.Integer(),
    'region': fields.String(),
    'city': fields.String(),
    'province': fields.String(),
    'wechat': fields.String(),
    'weight': fields.Integer(),
    'height': fields.Integer(),
    'type': fields.String(),
    'introduce': fields.String(),
    'image': fields.String(),
    'image1': fields.String(),
    'life_image': fields.String(),
    'video': fields.String(),
    'popularity': fields.Integer(description="人气"),
    'occupation': fields.String(description="职业"),
    'lib_image': fields.String(description="艺库照片"),
    'lib_video': fields.String(description="艺库视频"),
    'lib_mocard': fields.String(description="摩卡"),
    'name': fields.String(description="姓名"),
    'cover': fields.String(description="封面照"),
    'age': fields.Integer(),
    'sex': fields.Integer(),
    'isMocard': fields.Boolean(),
    'isVideo': fields.Boolean(),
    'audit_status': fields.Integer(description='审核状态 0-待审核 1-审核通告 2-审核拒绝'),
    'status': fields.Integer(description='状态'),
    # 'create_time': fields.DateTime(description='时间')
})

userMoment_model = api.model('AnnunciateModel', {
    'id': fields.Integer(readOnly=True, description='id'),
    'user_id': fields.Integer(),
    'content': fields.Date(description='内容'),
    'video': fields.String(description='视频'),
    'image': fields.String(description='图片'),
    'audit_status': fields.Integer(description="审核状态 0-待审核 1-审核通告 2-审核拒绝"),
    # 'status': fields.Integer(description='状态'),
    # 'create_time': fields.DateTime(description='时间')
})


@ns.route('/login/<string:code>')
class UserLogin(Resource):
    """用户登陆接口"""

    @ns.doc('user_login')
    # @ns.marshal_with(user_model)
    def post(self, code):
        """用户登录"""
        info = InterfaceHelper.get_openid(code)
        openid = info['openid']
        # update unionid
        unionid = info['unionid'] if 'unionid' in info else ''
        session_key = info['session_key']
        user = query_user_by_openid(openid)
        if not user:
            user = User(openid=openid, unionid=unionid)
            insert(user)
        else:
            if not user.access_right:
                return fail('拒绝访问')
            if not user.unionid:
                user.unionid = unionid
            user.official_status = True if user.wx_openid else False
            update(user)
        #if platform.system() != u'Darwin':
            #redis_client.set(str(user.id), session_key, 60 * 60 * 24 * 5)
        set_session(user.id)
        return success(user.id, "用户登录成功")


@ns.route('/test/login')
class UserTestLogin(Resource):
    @ns.param('user_id', 'user_id')
    def post(self):
        """测试用户登录"""
        parameters = RequestHelper.formToDict(request)
        user = query_user(condition={"id": parameters['user_id']})
        if not user:
            get_data_fail()
        else:
            if not user.access_right:
                return fail('拒绝访问')
        set_session(user.id)
        return success(user.id, "用户登录成功")


@ns.route('')
class UserInfoApi(Resource):
    """用户信息"""

    @ns.doc('get_user_info')
    @ns.param('user_id')
    def get(self):
        """获取用户信息"""
        user_id = check_cookie()
        parameters = RequestHelper.formToDict(request)
        user = query_user(condition={"id": user_id})
        # 获取用户问卷和填写问卷数量
        user_questionnaire_count = count(Questionnaire, condition={"user_id": user_id})
        user_fill_questionnaire_count = count(QuestionnaireFill, condition={"user_id": user_id})
        user_info = user.to_json()
        user_info['user_questionnaire_count'] = user_questionnaire_count
        user_info['user_fill_questionnaire_count'] = user_fill_questionnaire_count

        if user is None:
            return fail('无该用户')
        return success(data=user_info, message='获取用户用户信息成功')

    @ns.doc('put_user_info')
    @ns.expect(user_model)
    def put(self):
        """用户信息修改"""
        user_id = check_cookie()
        user = query_user(condition={"id": user_id})
        parameters = RequestHelper.formToDict(request)
        user = JSONHelper.modifyDictToObj(parameters, user)
        # url image transfer to local
        if "https" in user.avatar or "http" in user.avatar:
            #new_avatar = str(snowflake.MySnow(dataID="").get_code()) + '.png'
            #if not os.path.exists(os.path.join(basedir, "static", "image")):
            #    os.makedirs(os.path.join(basedir, "static", "image"))
            #url = ImageHelper.down_image_from_url(user.avatar, os.path.join("image", new_avatar))
            user.avatar = user.avatar #url
        user.update_time = datetime.now()
        if update(user):
            return success(message='修改成功')
        else:
            return fail(message='修改失败')

    @ns.expect(user_model)
    def post(self):
        """用户信息上传"""
        user_id = check_cookie()
        user = query_user(condition={"id": user_id})
        parameters = RequestHelper.formToDict(request)
        user = JSONHelper.modifyDictToObj(parameters, user)
        if update(user):
            return success(message='上传成功')
        else:
            return fail(message='上传失败失败')

    def delete(self):
        """
        删除user
        :return:
        """
        user_id = check_cookie()
        user = query_user(condition={"id": user_id})
        user.name = ""
        user.openid = user.openid[:-2]
        user.status = False
        user.wx_openid = ""
        user.brick = 0
        user.avatar = ""
        user.phone = ""
        if update(user):
            return success()
        return fail()


@ns.route('/img')
class ImgApi(Resource):
    """图片"""
    parser = api.parser()
    parser.add_argument('img', type=FileStorage, location='files')

    @ns.doc('post_img')
    @ns.param('type', 'image or video')
    @ns.expect(parser)
    def post(self):
        """图片上传"""
        filename = None
        parameters = RequestHelper.formToDict(request)
        if 'type' not in parameters:
            get_param_invalid()
        if not parameters['type'] in ['image', 'video']:
            get_type_invalid()
        file = request.files['img']
        if not file:
            get_file_fail()
        if not FileHelper.allowed_file(file.filename):  # 判断是否是允许上传的文件类型
            check_name_fail()
        ext = file.filename.rsplit('.', 1)[1]  # 获取文件后缀
        new_filename = str(snowflake.MySnow(dataID="").get_code()) + '.' + ext
        if not os.path.exists(os.path.join(basedir, "static", parameters['type'])):
            os.makedirs(os.path.join(basedir, "static", parameters['type']))
        filename = os.path.join(parameters['type'], new_filename)
        file_path = os.path.join(basedir, "static", parameters['type'], new_filename)
        file.save(file_path)  # 保存文件到upload目录
        if parameters['type'] == 'image':
            ImageHelper.gen_thumbnail(file_path, new_filename)
        if filename:
            return success({"url": filename}, "图片上传成功")
        return fail('图片上传失败')

    @ns.doc('get_img')
    @ns.param('url')
    @ns.param('watermark', '1-image with watermark')
    @ns.param('quality', '压缩率 1-9')
    @ns.param('joint_url', '拼接图片地址')
    def get(self):
        """获取图片"""
        parameters = RequestHelper.formToDict(request)
        image_path = os.path.join(basedir, 'static', parameters['url'])
        if 'url' not in parameters:
            get_param_invalid()
        try:
            image_data = open(image_path, "rb").read()
        except Exception as e:
            print(e)
            return False

        if 'quality' in parameters:
            if 'image' in parameters['url']:
                thumb_path = os.path.join(basedir, 'static', 'thumb')
                image_filename, ext = os.path.basename(parameters['url']).split('.')
                image_filename += '_%s.' % parameters['quality'] + ext
                thumb_image_path = os.path.join(thumb_path, image_filename)
                if not os.path.exists(thumb_image_path):
                    ImageHelper.gen_image_by_ration(image_path, int(parameters['quality']))
                image_data = open(thumb_image_path, "rb").read()

        response = make_response(image_data)
        if 'image' in parameters['url']:
            response.headers['Content-Type'] = 'image/png'
        elif 'thumb' in parameters['url']:
            response.headers['Content-Type'] = 'image/png'
        elif 'video' in parameters['url']:
            response.headers['Content-Type'] = 'video/mp4'
        return response


@ns.route("/feedback")
class FeedbackApi(Resource):

    def post(self):
        """
        提交意见
        :return:
        """
        user_id = check_cookie()
        parameters = RequestHelper.formToDict(request)
        item = JSONHelper.dictToObj(parameters, Feedback)
        if item:
            item.user_id = user_id
            if insert(item):
                return success(item.id)
        return fail()
