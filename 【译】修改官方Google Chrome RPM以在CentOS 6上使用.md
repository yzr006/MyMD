# 译者前言
最近在学习爬虫，涉及到google的headless chrome，和puppeteer，在把爬虫部署到vps的时候，由于vps安装的是centos6，所以安装puppeteer老是出错，查了很多资料，不好解决，即将放弃之前，发现了这篇文章，虽然最终没有使用文中的方式解决问题，但是感觉文章还是不错的，应该会帮到一些遇到同样问题的同学，故翻译了一下。

译者刚接触Linux不久，也是第一次翻译文章，才疏学浅，不通的地方，或者看不懂的地方，欢迎指点，或者直接观摩原文：
[原文](https://intoli.com/blog/installing-google-chrome-on-centos/)

另外由于太菜，最终我选择了重新安装centos7，来解决问题。。哈哈哈。。。

## 以下为正文：

# 修改官方Google Chrome RPM以在Amazon Linux和CentOS 6上运行

CentOS，Amazon Linux AMI和Red Hat Enterprise Linux是三个紧密相关的发行版Linux，很多服务器端都流行安装这几个货。它们有不错的性能和稳定性，但是通常缺少一些有用的软件包。Extra Packages for Enterprise Linux (EPEL)，是一个社区维护的软件扩展包仓库，显著改善了缺包的情况，但里边却没有Google Chrome / Chromium和许多其他软件。如果你想在Cloud（或者说VPS）中运行Headless Chrome，用来做网页自动化测试或爬虫，就可能会遇到坑。

Google维护了一个RPM仓库，包含Chrome RPM包，但只能在RHEL / CentOS 7.X版本上使用。然而，Amazon Linux目前只有6.X版本。并且，RHEL / CentOS的6.X版本使用还是相当普遍的（部分原因在于7.X版本从upstart转到了systemd）（译注：upstart和systemd是linux的两种init进程，很多linux用户比较讨厌后者）。如果你正在使用这些6.X版本的linux之一，那你就得自给自足了。由于RHEL 6.X上缺少GTK 3，所以安装依赖包的过程，相当复杂。

我们在Intoli的Amazon Linux上使用Headless Chrome进行网页抓取，因此我们维护了自己的软件包，这些软件包捆绑了缺少的依赖关系。在本文中，我们将向您展示，如何通过修改Chrome RPM，尽快运行起来Chrome，并解释如何修改RPM包，以包含其他库。如果你一直在寻找如何在亚马逊Linux（或其他类似的6.X版本的Linux）上运行Chrome，那么希望本文能帮到你！

# 简单的方法

首先，你需要确定你使用的Linux是6.X，还是7.X版本。如果你正在使用Amazon Linux AMI，那么，你肯定用的是6.X。在RHEL或CentOS上可以运行

```bash
cat /etc/redhat-release
```
检查输出的版本号。例如，如果您使用的是RHEL 7.0，那么你可能会看到如下输出：

```bash
Red Hat Enterprise Linux Server release 7.0 (Maipo)
```
确定版本号后，您可以继续阅读下一节，了解如何安装Google Chrome。

## RHEL / CentOS7.X

如果你用的是7.X版本的Linux，那么你可以使用Google官方的仓库。如果要添加Google官方仓库到系统中，只需使用以下内容创建一个文件：`/etc/yum.repos.d/google-chrome.repo`。

```bash
[google-chrome] name = google-chrome baseurl = http：//dl.google.com/linux/chrome/rpm/stable/$basearch enabled = 1 gpgcheck = 1 gpgkey = https：//dl-ssl.google。 COM / LINUX / linux_signing_key.pub
```
然后运行

```bash
sudo yum install google-chrome-stable
```
于是你安装好了Chrome，并在`/usr/bin/`目录添加了google-chrome-stable脚本。

## Amazon Linux/RHEL/CentOS 6.X

运行以下命令，即可安装我们修改好的Google Chrome RPM。

```bash
sudo yum --nogpgcheck localinstall https://intoli.com/blog/installing-google-chrome-on-centos/google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
除了`google-chrome-stable`脚本之外，我们还提供了缺失的依赖包。

# 痛苦的方法

如果你只是想在6.X版本Linux上安装Google Chrome，强烈建议你使用上一节中简单的方法。同时，我也将介绍我们修改Chrome RPM的过程，因为一些技术能力较强的读者，可能会感兴趣。基本的想法是，使用7.X系统下的Chrome RPM包，作基础，另外还需要一些能让它在6.X系统下工作的依赖包。

## 获取RPM

首先，我们要拿到7.X系统下的官方RPM文件。虽然并不能在6.X系统下使用，但它不失为一个很好的基础包。我们可以通过创建`/etc/yum.repos.d/google-chrome.repo`文件，来下载7.X系统下的Chrome。

```bash
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
```
然后运行：

```bash
# install the yum utilities
sudo yum install yum-utils

# download the google-chrome-stable package
yumdownloader google-chrome-stable
```
第二个命令会将RPM文件下载到当前工作目录。当前版本（译注：作者写此文时，下载到的文件版本）的文件名为`google-chrome-stable-60.0.3112.113-1.x86_64.rpm`，但是随着新版本的发布，这个文件名可能会变。

## 剥离缺失的依赖关系

首先，我们要尽可能多的安装`google-chrome-stable`的依赖关系。可以通过使用`yum-utils`提供的另一个工具`repoquery`来找到依赖，然后使用`xargs`将这些作为参数传递给`yum`，进而完成安装。

```bash
repoquery --requires --resolve google-chrome-stable | xargs sudo yum -y install
```
上边这些完成后，就可以开始安装下载的RPM了。

```bash
sudo rpm -i google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
安装的时候，系统会报错，并输出一个在系统上不可用的依赖关系列表。

```bash
error: Failed dependencies:
	xdg-utils is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libatk-1.0.so.0()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libgconf-2.so.4()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libgdk-3.so.0()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libgdk_pixbuf-2.0.so.0()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libgtk-3.so.0()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
	libXss.so.1()(64bit) is needed by google-chrome-stable-60.0.3112.113-1.x86_64
```
我们修改RPM的第一步，就是去除这些依赖关系。这样的话，在安装的时候就不会报错了，但也会导致安装包有未处理的依赖关系。不管三七二十一，先装上再说，稍后，我们会回头处理这些依赖。

我们将使用一个名为`rpmrebuild`的工具来修改RPM文件。运行如下命令来安装这个工具：

```bash
# install rpmrebuild
sudo yum install rpmrebuild
```
然后运行：

```bash
sudo rpmrebuild -e -d output -p google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
于是我们用`vi`打开了RPM spec文件。现在，我们要逐个删除上边报错列表中，涉及到的7个依赖信息。例如，要删除`libgconf`依赖，我们需要从spec文件中删除：

```
Requires:      libgconf-2.so.4()(64bit)
```

同时，我们也要删除所有使用`xdg-icon-resource`的代码。这些代码通常是由我们删除的`xdg-utils`依赖项产生的，但是它们只在(un)installation脚本中使用。如果我们现在不删除这些代码，那么这个包以后将无法卸载干净。当然，不这样做的话，以后你也可以这样强制卸载：

```bash
sudo yum --setopt=tsflags=noscripts remove google-chrome-stable
```
除非已经来不及了，否则，还是建议从一开始就删除那些代码比较好。

删除那些代码，大概要这样做：

```bash
# Add icons to the system icons
XDG_ICON_RESOURCE="`which xdg-icon-resource 2> /dev/null || true`"
if [ ! -x "$XDG_ICON_RESOURCE" ]; then
  echo "Error: Could not find xdg-icon-resource" >&2
  exit 1
fi
for icon in "/opt/google/chrome/product_logo_"*.png; do
  size="${icon##*/product_logo_}"
  "$XDG_ICON_RESOURCE" install --size "${size%%.png}" "$icon" "google-chrome"
done
```
然后卸载的时候，这样做：

```bash
# Remove icons from the system icons
XDG_ICON_RESOURCE="`which xdg-icon-resource 2> /dev/null || true`"
if [ ! -x "$XDG_ICON_RESOURCE" ]; then
  echo "Error: Could not find xdg-icon-resource" >&2
  exit 1
fi
for icon in "/opt/google/chrome/product_logo_"*.png; do
  size="${icon##*/product_logo_}"
  "$XDG_ICON_RESOURCE" uninstall --size "${size%%.png}" "google-chrome"
done
```
所有的问题依赖和`xdg-icon-resource`相关行被删除之后，就可以保存文件，关闭编辑器了。这时，一个新的RPM包已经产生在`output/`目录。新的RPM包这样安装：

```bash
sudo rpm -i output/x86_64/google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
但是，毫无意外，运行`google-chrome-stable`仍然会报错：

```bash
google-chrome-stable: error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file: No such file or directory
```
毕竟，被我们删除的依赖，仍然是需要提供的，这样Chrome才能够真正运行。

## 提供缺失的依赖关系

我们可以使用`ldd`命令，来查看`google-chrome-stable`缺失的依赖。

```bash
ldd /opt/google/chrome/chrome | grep "not found"
```
这个命令会输出缺失的依赖列表，全都是我们刚刚删除的依赖信息。

```
	libgconf-2.so.4 => not found
	libXss.so.1 => not found
	libatk-1.0.so.0 => not found
	libgtk-3.so.0 => not found
	libgdk-3.so.0 => not found
	libgdk_pixbuf-2.0.so.0 => not found
```
我们可以尝试自己构建这些依赖，甚至为它们创建新的包，但这样会产生大量的工作，因为每个库都有各自的依赖关系。更简单的解决方案，是从安装了相同版本的Google Chrome的另一个Linux系统中，获取这些文件。这大概是一个hack，但这是快速解决问题的最简单的方法。

考虑到六个直接依赖关系的二级依赖关系，最终，我们需要复制25个共14MB的依赖文件。为了加快速度，我编写了一个简单的脚本，它将循环复制本地文件到远程机器上的`/tmp/lib/`直到所有依赖关系都搞定为止。

```bash
#! /bin/bash
set -e

SERVER=sangaline@intoli.com

# move to the directory where the libraries will be
cd /usr/lib/

# create the remote directory
ssh $SERVER "mkdir -p /tmp/lib/"

while true
do
    FINISHED=true
    # loop through each of the missing libraries
    while read -r LINE
    do
        if [[ $LINE == *"/"* ]]; then
            # extract the filename when a path is present (e.g. /lib64/)
            FILE=`echo $LINE | sed 's>.*/\([^/:]*\):.*>\1>'`
        else
            # extract the filename for missing libraries without a path
            FILE=`echo $LINE | awk '{print $1;}'`
        fi
        # copy the local version to the server
        scp $FILE $SERVER:/tmp/lib/
        FINISHED=false
    done < <(ssh $SERVER ' \
        export LD_LIBRARY_PATH=/tmp/lib/:$LD_LIBRARY_PATH && \
        ldd /opt/google/chrome/chrome 2>&1 | \
        grep -e "no version information" -e "not found"  \
    ')

    # break once no new files have been copied in a loop
    if [ "$FINISHED" = true ]; then
        break
    fi
done
```
这里有个重要提示，在使用`ldd`检查依赖之前， `$LD_LIBRARY_PATH`被设置为包含`/tmp/lib/`目录。我们需要将这些依赖移到更加固定的目录中，以确保linker可以找到它们。很明显，我们应该选择`/usr/lib64/` ，但实际上，我们的这些依赖库，有一些与现有系统库会发生冲突。如果我们查看`/usr/bin/google-chrome-stable`脚本，就可以看到，它在启动Chrome之前，实际上会将它自己的几个目录`/usr/bin/google-chrome-stable`加载到`LD_LIBRARY_PATH`。（译注：这一段看的不是太明白，不懂的话，请看原文。。）

```bash
# Always use our versions of ffmpeg libs.
# This also makes RPMs find the compatibly-named library symlinks.
if [[ -n "$LD_LIBRARY_PATH" ]]; then
  LD_LIBRARY_PATH="$HERE:$HERE/lib:$LD_LIBRARY_PATH"
else
  LD_LIBRARY_PATH="$HERE:$HERE/lib"
fi
export LD_LIBRARY_PATH
```
在标准的Chrome安装路径下，额外的库的路径是`/opt/google/chrome/`和`/opt/google/chrome/lib/`。`/opt/google/chrome/lib/`目录在我们的包中实际上是不存在的，但这里放置所有库文件，却是一个不错的位置。

```bash
sudo mkdir /opt/google/chrome/lib/
sudo cp /tmp/lib/* /opt/google/chrome/lib/
```
至此，命令行运行Chrome应该可以工作了！

```bash
google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 https://intoli.com
```
只要在运行该命令后，没有出现任何错误，就意味着Chrome的所有的依赖，都被成功找到了。如果你只是想安装一个能用的Chrome，那么至此，你的目的已经达到。但是本文仍将继续，解释如何构建一个包含依赖的新RPM文件。

我们可以通过运行`rpmrebuild`，再次打开我们已经安装的RPM

```bash
sudo rpmrebuild -e -d final-output -p output/x86_64/google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
文件将在`vi`中打开。现在我们可以找到以`%files`开头的文件部分，并添加`/opt/google/chrome/lib`目录。

```bash
%dir %attr(0755, root, root) "/opt/google/chrome/lib"
```
然后我把上边这一行，放在刚加了`/opt/google/chrome`目录的行的下面，但是确切地说，这并不重要。

我们还需要添加所有单个的依赖库文件。运行：

```bash
find /opt/google/chrome/lib/ -type f | sed 's/\(.*\)/%attr(0644, root, root) "\1"/g'
```
该命令会输出一个列表，可以直接把结果复制到spec文件中使用。输出结果如下：

```bash
%attr(0644, root, root) "/opt/google/chrome/lib/libwayland-egl.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libwayland-client.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libatk-bridge-2.0.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libwayland-cursor.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libdbus-1.so.3"
%attr(0644, root, root) "/opt/google/chrome/lib/libXss.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libcairo-gobject.so.2"
%attr(0644, root, root) "/opt/google/chrome/lib/libxkbcommon.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libgdk-3.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libEGL.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libXinerama.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libgtk-3.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libgconf-2.so.4"
%attr(0644, root, root) "/opt/google/chrome/lib/libdbus-glib-1.so.2"
%attr(0644, root, root) "/opt/google/chrome/lib/libgcrypt.so.20"
%attr(0644, root, root) "/opt/google/chrome/lib/libatk-1.0.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libpng16.so.16"
%attr(0644, root, root) "/opt/google/chrome/lib/libepoxy.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libz.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libgdk_pixbuf-2.0.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libgpg-error.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libGLdispatch.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/liblz4.so.1"
%attr(0644, root, root) "/opt/google/chrome/lib/libsystemd.so.0"
%attr(0644, root, root) "/opt/google/chrome/lib/libatspi.so.0"
```
上边的结果是我这边的输出，但是随着Chrome版本更迭，这个结果可能会变化。我们可以把这个结果，直接添加到刚刚加了`/opt/google/chrome/lib`目录的行的下边。

最后，其实我们还需要自己添加库文件。如果你看一下spec文件的开头，应该看到那里指定了一个`BuildRoot`。

```bash
# rpmrebuild autogenerated specfile

BuildRoot: /root/.tmp/rpmrebuild.7254/work/root
```
这是提取RPM内部文件的一个临时目录，我们可以在重新打包之前，修改它。例如，要复制我们所有的库文件，可以运行以下命令：

```bash
sudo mkdir -p /root/.tmp/rpmrebuild.7254/work/root/opt/google/chrome/lib/
sudo cp /opt/google/chrome/lib/* /root/.tmp/rpmrebuild.7254/work/root/opt/google/chrome/lib/
```
现在我们只需要保存文件并关闭编辑器，以便`rpmrebuild`继续进行构建。于是，一个新的RPM文件在`final-output/x86_64/`中生成了，我们可以使用这个文件进行安装：

```bash
# 卸载之前的版本
sudo yum remove google-chrome-stable

# 安装新版本
sudo rpm -i final-output/x86_64/google-chrome-stable-60.0.3112.113-1.x86_64.rpm
```
这个包可以安装在其他RHEL 6.X机器上。并且包括了我们捆绑的所有依赖包。这些依赖包将被隔离在`/opt/google/chrome/`目录中，如果将来卸载该软件包，它们将被一起删除。

# 最后

我们已经完成了修改标准Google Chrome RPM软件包，以便它在CentOS，RHEL和Amazon Linux 6.X上运行的工作。如果你正在使用这些操作系统之一，并试图安装Google Chrome浏览器，那么希望本文能帮到你。即使你只是对修改RPM包来捆绑依赖比较感兴趣，才关注本文，那么，也祝你在网页抓取和自动化测试的工作中，一切顺利！