#!/usr/bin/env
# -*- coding:utf-8 -*-

from urllib import parse
from urllib import request
import re

kws = []
def search_Loop(arr):
    print('正在为您检索书单:', arr)
    for x in arr:
        kwJD = x + '京东' + '书'
        s = parse.quote(kwJD)
        url = 'http://www.baidu.com/s?wd=%s&rn=%s' %(s,25)
        req = request.Request(url)
        response = request.urlopen(req)
        html = response.read().decode('utf-8')
        res = re.findall(r'(?<=\"url\"\:\").[^,]*?(?="})', html)
        print(x, "的京东链接")
        for i in res:
            if i.startswith('http'):
                i = i.replace('\\', '')
                headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'} 
                req2 = request.Request(i, headers = headers)
                html_page = request.urlopen(req2)
                if html_page.geturl().find('item.jd.com') > 0:
                    print('京东链接: ', html_page.geturl())
                # if html_page.geturl().find('product.dangdang.com') > 0:
                #     print('当当链接: ', html_page.geturl())


        kwDD = x + '当当' + '书'
        s = parse.quote(kwDD)
        urlDD = 'http://www.baidu.com/s?wd=%s&rn=%s' %(s,25)
        req = request.Request(urlDD)
        response = request.urlopen(req)
        html = response.read().decode('utf-8')
        res = re.findall(r'(?<=\"url\"\:\").[^,]*?(?="})', html)
        print(x, "的当当链接")
        for i in res:
            if i.startswith('http'):
                i = i.replace('\\', '')
                headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'} 
                req2 = request.Request(i, headers = headers)
                try:
                    html_page = request.urlopen(req2)
                except:
                    continue
                # if html_page.geturl().find('item.jd.com') > 0:
                #     print('京东链接: ', html_page.geturl())
                if html_page.geturl().find('product.dangdang.com') > 0:
                    print('当当链接: ', html_page.geturl())


while True:
    x = str(input("请输入需要搜索的书名(输入\'q!\'退出程序, 输入'go\'开始检索):"))
    if x == 'q!':
        print('bye!')
        break
    if x == 'go':
        search_Loop(kws)
        break
    kws.append(x)


