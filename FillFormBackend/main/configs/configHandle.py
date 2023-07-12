"""
@Author: Jenkin
@Date: 2022/8/6 10:14 下午
@Description
"""

CONFIG_PATH = "main/configs/config.json"

import json


def Load(path=CONFIG_PATH):
    """
    配置加载
    :param path:
    :return:
    """
    with open(path, "r") as f:
        config = json.load(f)
    return config


def Save(config, path=CONFIG_PATH):
    """
    存储配置
    :return:
    """
    with open(path, 'w', encoding='utf-8') as json_file:
        json.dump(config, json_file, ensure_ascii=False)
