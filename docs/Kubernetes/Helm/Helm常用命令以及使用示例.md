# Helm 常用命令以及使用示例

Helm 是 Kubernetes 的包管理器，类似于 Linux 下的 apt/yum 或 Python 的 pip。它将 Kubernetes 资源（Deployment, Service, Ingress 等）打包成 Charts，极大简化了应用的部署和管理。

## 1. 仓库管理 (Repo Management)

Helm 使用仓库来存储 Charts。

*   **添加仓库**
    ```bash
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm repo add azure https://mirror.azure.cn/kubernetes/charts/
    ```

*   **更新仓库缓存**
    ```bash
    helm repo update
    ```

*   **列出所有仓库**
    ```bash
    helm repo list
    ```

*   **搜索 Charts**
    ```bash
    # 搜索 mysql 相关的 chart
    helm search repo mysql
    ```

## 2. 安装与卸载 (Install & Uninstall)

*   **安装 Chart**
    ```bash
    # 基本安装
    helm install my-release bitnami/mysql

    # 指定 namespace
    helm install my-release bitnami/mysql -n dev --create-namespace

    # 使用自定义 values.yaml 安装
    helm install my-release bitnami/mysql -f values.yaml
    ```

*   **查看已安装的 Release**
    ```bash
    # 查看当前 namespace
    helm list

    # 查看所有 namespace
    helm list -A
    ```

*   **卸载 Release**
    ```bash
    helm uninstall my-release
    ```

## 3. 升级与回滚 (Upgrade & Rollback)

*   **升级 Release**
    ```bash
    # 修改配置后升级
    helm upgrade my-release bitnami/mysql -f new-values.yaml

    # 仅修改某个值
    helm upgrade my-release bitnami/mysql --set auth.rootPassword=secretpassword
    ```

*   **查看历史版本**
    ```bash
    helm history my-release
    ```

*   **回滚到指定版本**
    ```bash
    # 回滚到版本 1
    helm rollback my-release 1
    ```

## 4. Chart 开发与调试

*   **创建新的 Chart**
    ```bash
    helm create my-chart
    ```

*   **检查 Chart 语法**
    ```bash
    helm lint ./my-chart
    ```

*   **渲染模板（Dry Run）**
    常用于调试，查看生成的 YAML 内容而不实际部署。
    ```bash
    helm install my-release ./my-chart --debug --dry-run
    
    # 或者直接使用 template 命令
    helm template my-release ./my-chart
    ```

*   **打包 Chart**
    ```bash
    helm package ./my-chart
    ```

## 5. 常用参数说明

| 参数 | 说明 |
| :--- | :--- |
| `-n, --namespace` | 指定 Kubernetes 命名空间 |
| `--create-namespace` | 如果命名空间不存在则自动创建 |
| `-f, --values` | 指定自定义配置文件 (values.yaml) |
| `--set` | 在命令行中直接设置值（优先级高于 values.yaml） |
| `--wait` | 等待所有 Pod 就绪后再返回成功 |
| `--debug` | 开启详细日志输出 |
