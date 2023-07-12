"""
@Author: Jenkin
@Date: 2021/6/18 11:33 下午
@Description
"""
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
DEBUG = True
HOST = "127.0.0.1"  if DEBUG else "122.152.221.118"
PORT = 9000
