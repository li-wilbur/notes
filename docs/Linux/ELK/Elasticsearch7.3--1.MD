### 1 、新建图书索引
首先建立图书索引 book

语法：put /index

结果

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308909826-20e3de60-ce17-4a11-8fbc-7878c79039eb.png)

### 2、新增图书 :新增文档
语法：PUT /index/type/id

| 1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21<br/>22<br/>23<br/>24<br/>25<br/>26<br/>27<br/>28<br/>29<br/>30 | `PUT /book/_doc/``1`<br/>`{`<br/>`"name"``: ``"Bootstrap开发"``,`<br/>`"description"``: ``"Bootstrap是由Twitter推出的一个前台页面开发css框架，是一个非常流行的开发框架，此框架集成了多种页面效果。此开发框架包含了大量的CSS、JS程序代码，可以帮助开发者（尤其是不擅长css页面开发的程序人员）轻松的实现一个css，不受浏览器限制的精美界面css效果。"``,`<br/>`"studymodel"``: ``"201002"``,`<br/>`"price"``:``38.6``,`<br/>`"timestamp"``:``"2019-08-25 19:11:35"``,`<br/>`"pic"``:``"group1/M00/00/00/wKhlQFs6RCeAY0pHAAJx5ZjNDEM428.jpg"``,`<br/>`"tags"``: [ ``"bootstrap"``, ``"dev"``]`<br/>`}`<br/>`PUT /book/_doc/``2`<br/>`{`<br/>`"name"``: ``"java编程思想"``,`<br/>`"description"``: ``"java语言是世界第一编程语言，在软件开发领域使用人数最多。"``,`<br/>`"studymodel"``: ``"201001"``,`<br/>`"price"``:``68.6``,`<br/>`"timestamp"``:``"2019-08-25 19:11:35"``,`<br/>`"pic"``:``"group1/M00/00/00/wKhlQFs6RCeAY0pHAAJx5ZjNDEM428.jpg"``,`<br/>`"tags"``: [ ``"java"``, ``"dev"``]`<br/>`}`<br/>`PUT /book/_doc/``3`<br/>`{`<br/>`"name"``: ``"spring开发基础"``,`<br/>`"description"``: ``"spring 在java领域非常流行，java程序员都在用。"``,`<br/>`"studymodel"``: ``"201001"``,`<br/>`"price"``:``88.6``,`<br/>`"timestamp"``:``"2019-08-24 19:11:35"``,`<br/>`"pic"``:``"group1/M00/00/00/wKhlQFs6RCeAY0pHAAJx5ZjNDEM428.jpg"``,`<br/>`"tags"``: [ ``"spring"``, ``"java"``]`<br/>`}` |
| --- | --- |


结果

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308909901-1e723d3e-4be6-44db-b13c-17614aa1fbee.png)

### 3、查询图书：检索文档
语法：GET /index/type/id

查看图书:

就可看到json形式的文档。方便程序解析。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308909837-d2699d25-bc77-46f9-ad0d-d1e79eb2b37c.png)

为方便查看索引中的数据，kibana可以如下操作

Kibana-discover- Create index pattern- Index pattern填book

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308909845-e91e3999-a20b-4d54-bcbb-9323b652c1be.png)

下一步，再点击discover就可看到数据。点击json还可以看到原始数据

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308909918-d0a9d665-c668-407b-b4f0-0b2ca4e274d4.png)

### 4、修改图书：替换操作
| 1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10 | `PUT /book/_doc/``1`<br/>`{`<br/>`    ``"name"``: ``"Bootstrap开发教程1"``,`<br/>`    ``"description"``: ``"Bootstrap是由Twitter推出的一个前台页面开发css框架，是一个非常流行的开发框架，此框架集成了多种页面效果。此开发框架包含了大量的CSS、JS程序代码，可以帮助开发者（尤其是不擅长css页面开发的程序人员）轻松的实现一个css，不受浏览器限制的精美界面css效果。"``,`<br/>`    ``"studymodel"``: ``"201002"``,`<br/>`    ``"price"``:``38.6``,`<br/>`    ``"timestamp"``:``"2019-08-25 19:11:35"``,`<br/>`    ``"pic"``:``"group1/M00/00/00/wKhlQFs6RCeAY0pHAAJx5ZjNDEM428.jpg"``,`<br/>`    ``"tags"``: [ ``"bootstrap"``, ``"开发"``]`<br/>`}` |
| --- | --- |


替换操作是整体覆盖，要带上所有信息。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308910094-0518badb-b931-4e46-9bde-7943af1942ca.png)

### 5、 修改图书：更新文档
语法：POST /{index}/type /{id}/_update

或者POST /{index}/_update/{id}

| 1<br/>2<br/>3<br/>4<br/>5<br/>6 | `POST /book/_update/``1``/ `<br/>`{`<br/>`  ``"doc"``: {`<br/>`   ``"name"``: ``" Bootstrap开发教程高级"`<br/>`  ``}`<br/>`}` |
| --- | --- |


返回：

### 6、删除图书：删除文档
语法：

返回：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/35325416/1741308910101-dfb52d00-cd46-4c55-bfe2-92e9249740f2.png)

