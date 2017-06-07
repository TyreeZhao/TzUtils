#!/usr/bin/env
# -*- coding:utf-8 -*-

from urllib import parse
from urllib import request
import re
while True:
    x = str(input("请输入需要搜索的关键字(输入/\q!\'退出程序):"))
    if x == 'q!':
        print('bye!')
        break
    # y = input("请输入你想搜多少条结果:")
    s = parse.quote(x)
    url = 'http://www.baidu.com/s?wd=%s&rn=%s' %(s,25)
    req = request.Request(url)
    response = request.urlopen(req)
    html = response.read().decode('utf-8')
    res = re.findall(r'(?<=\"url\"\:\").[^,]*?(?="})', html)
    for i in res:
        if i.startswith('http'):
            i = i.replace('\\', '')
            headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'} 
            req2 = request.Request(i, headers = headers)
            html_page = request.urlopen(req2)
            if html_page.geturl().find('jd.com') > 0:
                print('京东链接: ', html_page.geturl())
            if html_page.geturl().find('dangdang.com') > 0:
                print('当当链接: ', html_page.geturl())

