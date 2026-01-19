# Helm 常用命令以及使用示例

---

## **1. 仓库管理**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm repo add` | 添加 Chart 仓库 | `helm repo add bitnami https://charts.bitnami.com/bitnami` |
| `helm repo update` | 更新本地仓库索引 | `helm repo update` |
| `helm repo list` | 查看已配置的仓库列表 | `helm repo list` |
| `helm repo remove` | 移除仓库 | `helm repo remove bitnami` |


---

## **2. 安装/升级应用**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm install` | 部署应用 | `helm install my-nginx bitnami/nginx` |
| `helm upgrade` | 升级应用配置 | `helm upgrade my-nginx bitnami/nginx --set replicaCount=2` |
| `helm install -f` | 使用自定义 values 文件安装 | `helm install -f custom-values.yaml my-app ./my-chart` |


---

## **3. 查看信息**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm list` | 查看已部署的 Release | `helm list` 或 `helm ls` |
| `helm status` | 查看 Release 状态 | `helm status my-nginx` |
| `helm get values` | 查看 Release 的配置值 | `helm get values my-nginx` |
| `helm history` | 查看 Release 历史版本 | `helm history my-nginx` |


---

## **4. 卸载/回滚**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm uninstall` | 卸载应用 | `helm uninstall my-nginx` |
| `helm rollback` | 回滚到历史版本 | `helm rollback my-nginx 1` |


---

## **5. 搜索 Chart**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm search hub` | 从 Artifact Hub 搜索 Chart | `helm search hub nginx` |
| `helm search repo` | 从本地仓库搜索 Chart | `helm search repo bitnami/nginx` |


---

## **6. 本地 Chart 操作**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm create` | 创建新 Chart 模板 | `helm create my-chart` |
| `helm package` | 打包 Chart 为 `.tgz` 文件 | `helm package ./my-chart` |
| `helm lint` | 检查 Chart 语法 | `helm lint ./my-chart` |


---

## **7. 其他常用命令**
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `helm dependency update` | 更新 Chart 依赖 | `helm dependency update ./my-chart` |
| `helm show` | 查看 Chart 详细信息 | `helm show chart bitnami/nginx` |
| `helm env` | 查看 Helm 环境变量 | `helm env` |


---

## **示例场景**
1. **安装 MySQL 并指定密码**  

```bash
helm install my-db bitnami/mysql --set auth.rootPassword=123456
```

2. **升级时使用自定义 values 文件**  

```bash
helm upgrade my-app -f overrides.yaml ./my-chart
```

3. **回滚到指定版本**  

```bash
helm rollback my-app 2  # 回滚到历史版本 2
```

---

通过这些命令，您可以高效管理 Kubernetes 应用的生命周期。建议结合 `--help` 查看详细参数，例如 `helm install --help`。

以下是续写的 Helm 示例场景，补充更多实用操作案例：

---

## **续写示例场景**
4. **测试模板渲染（不实际安装）**  

```bash
helm install my-redis bitnami/redis --dry-run --debug
# 用于验证 Chart 模板渲染结果，常用于调试
```

5. **查看生成的 Kubernetes 清单**  

```bash
helm get manifest my-nginx  # 显示该 Release 实际生成的 YAML 配置
```

6. **从本地目录安装开发中的 Chart**  

```bash
helm install dev-app ./my-chart/  # 直接使用本地 Chart 目录部署
```

7. **添加第三方仓库并安装应用**  

```bash
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager --namespace cert-manager
```

8. **查看 Chart 的默认 values 配置**  

```bash
helm show values bitnami/nginx > default-values.yaml  # 导出默认配置供修改
```

9. **创建新 Chart 并添加依赖**  

```bash
helm create my-microservice
# 编辑 Chart.yaml 添加依赖后执行：
helm dependency update my-microservice
```

10. **强制替换已存在的 Release**  

```bash
helm install my-app --replace ./my-chart  # 当同名 Release 已存在时强制覆盖
```

---

## **高级调试场景**
1. **模拟升级并对比变化**  

```bash
helm upgrade my-app ./my-chart --dry-run --debug  # 预演升级过程
```

2. **查看 Release 历史版本差异**  

```bash
helm diff revision my-app 1 2  # 比较版本1和版本2的配置差异（需安装 diff 插件）
```

3. **快速清理测试环境**  

```bash
helm uninstall my-test --keep-history  # 保留历史记录
helm uninstall my-test --no-keep-history  # 完全删除
```

---

这些场景覆盖了 Helm 的模板调试、配置管理、本地开发和安全操作等进阶用法。实际使用时可根据需求组合参数，例如：  

```bash
helm upgrade --install -f prod-values.yaml --atomic --timeout 300s my-app ./chart
# --install：不存在则安装
# --atomic：失败自动回滚
# --timeout：设置超时时间
```

