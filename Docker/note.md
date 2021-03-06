# Docker Mastery: The Complete Toolset From a Docker Captain by Bret Fisher

## Index

- [1. 도커 설치](#1)
- [2. 도커로 Nginx 서버 실행하기](#2)
- [3. 컨테이너의 실행](#3)
- [4. 컨테이너 vs VM](#4)
- [5. 과제: 여러개의 컨테이너 관리해보기](#5)
- [6. 컨테이너 관련 커맨드](#6)
- [7. 컨테이너 안에서 bash 사용하기](#7)
- [8. 도커 네트워크: 기본개념](#8)
- [9. 도커 네트워크: 가상 네트워크](#9)
- [10. 도커 네트워크: DNS](#10)
- [11. 과제: CLI App Testing](#11)
- [12. 과제: DNS RR Test](#12)
- [13. 이미지의 구조](#13)
- [14. 허브에서 이미지 받기](#14)
- [15. 이미지 레이어](#15)
- [16. 이미지 태그](#16)
- [17. 이미지 생성](#17)
- [18. 이미지 실행](#18)
- [19. Extending Official Images](#19)
- [20. 과제: Build Your Own Dockerfile and Run Containers From It](#20)
- [21. 과제정답: Build Your Own Dockerfile and Run Containers From It](#21)
- [22. 컨테이너와 영구적인 데이터](#22)
- [23. 영구적 데이터: 데이터 볼륨](#23)
- [24. 영구적 데이터: Bind Mounting](#24)
- [25. 과제: Database Upgrades with Named Volumes](#25)
- [26. 과제 정답: Database Upgrades with Named Volumes](#26)
- [27. 과제:  Edit Code Running In Containers With Bind Mounts](#27)
- [28. 과제 정답: Edit Code Running In Containers With Bind Mounts](#28)
- [29. 도커 컴포즈와 yml 파일](#29)
- [30. 기본적인 컴포즈 명령어 실행해보기](#30)
- [31. 과제: Build a Compose File For a Multi-Container Service](#31)
- [32. 과제 정답: Build a Compose File For a Multi-Container Service](#32)
- [33. 컴포즈 파일에 이미지 추가하기](#33)
- [34. Swarm 모드](#34)


<h2 name="1">1. Check Our Docker Install and Config</h2>

- Command Line
  - docker version : 도커 버전 체크 
  - docker info : Shows most configuration values for the engine
  - docker command line structure
    - old (still works): docker <command> (options)
    - new: docker <command> <sub-command> (options)

<h2 name="2">2. Starting a Nginx Web Server</h2>

- Image vs Container
  - An image is the application we want to run
  - A container is an instance of that image running as a process
  - You can have many containers running off the same image
  - In this lecture our image will be the Nginx web server
  - Docker's default image "registry" is called Docker Hub
- 새로운 컨테이너 생성 커맨드
  `docker container run`
- cmder에 `docker container run --publish 80:80 nginx`를 입력하면 이미지를 다운받고 localhost에 접속하면 Welcome to nginx!를 볼 수 있다.
- docker container run --publish 80:80 nginx?
  - 도커 엔진이 nginx라는 이미지를 찾는다.
  - 그리고 도커허브에서 최신 nginx 이미지를 찾아 다운받은 뒤 실행된다.
  - Opened port 80 on the host IP
  - Routes that traffic to the container IP, port 80
- 윈도우에서는 ctrl + c를 하면 커맨드 라인에서는 실행을 종료되나 백그라운드에서는 계속해서 작동된다. 도커 컨테이너의 실행을 중지시키기 위해서는 `docker stop <container id/name>` 커맨드를 사용해야 한다. 컨테이너의 아이디는 모두 적을 필요없고 앞의 고유번호 몇개만 적어주면 된다. 
- `docker container ls` 커맨드를 사용해 현재 실행되고 있는 컨테이너들의 정보를 확인할 수 있다. 
- `docker ps`으로도 현재 실행중인 도커 리스트 확인. 만일, 중지된 컨테이너까지 모두 확인하려면 -a 옵션을 추가하면 된다. (docker container ls의 옛날 버전)
- docker container run vs docker container start?
  - `docker containe r run` always starts a new container
  - use `docker container start` to start an existing stopped one
- 컨테이너의 이름을 지정해 주지 않는다면 랜덤으로 생성된다. 하지만 예를 들어 webhost nginx라는 이름의 컨테이너를 생성하고 싶다면 `docker container run --publish 80:80 --detach --name webhost nginx` 커맨드를 사용한다. 
- `docker container logs` 커맨드는 특정 컨테이너의 로그를 보여준다. 예를들어 docker container logs webhost 커맨드는 webhost 이름을 가지고 있는 컨테이너의 로그를 보여준다.
- `docker container rm <container id/name>`를 이용해 해당 아이디를 가지고 있는 컨테이너를 삭제할 수 있다. 단 현재 실행되고 있는 컨테이너는 삭제할 수 없다. 하지만 rm과 <container id>사이에 -f를 붙이면 강제적으로 삭제할 수 있다. 
- 커맨드 정리
  - docker container run : 새로운 컨테이너 생성
  - docker stop <container id/name> : 컨테이너 실행 중지
  - docker container ls : 실행되고 있는 컨테이너 정보 확인
  - docker container start : 실행 중지된 컨테이너 다시 실행
  - docker container logs <container id/name> : 특정 컨테이너 로그 확인
  - docker container rm <container id/name> : 특정 컨테이너 삭제
  - curl localhost:8080 : localhost:8080의 내용을 cmd에서 확인 가능

<h2 name="3">3. Debrief: What happens when we run a container?</h2>

- What happens in 'docker container run'?
  - Looks for that image locally in image cache, does not find anything.
  - Then looks in remote image repository (defaults to Docker Hub)
  - Downloads the latest version (nginx: latest by default)
  - Creates new container based on that image and prepares to start
  - Gives it a virtual IP on a private network inside docker engine
  - Opens up port 80 on host and forwards to port 80 in container
  - Starts container by using the CMD in the image Dockerfile

<h2 name="4">4. Container vs VM</h2>

- Containers aren't Mini-VM's
  - They are just processes
  - Limited to what resources they can access
  - Exit when process stops
- `docker run --name mongo -d mongo`커맨드로 몽고DB 실행
- `docker top <container id/name>`커맨드는 현재 실행되고 있는 특정 컨테이너의 프로세스를 보여준다.
- `ps aux` 커맨드는 현재 실행되고 있는 모든 프로세스를 보여준다. (윈도우에서는 도커vm에 연결해야된다)

<h2 name="5">5. Assignment: Manage Multiple Containers</h2>

- docs.docker.com and --help are your friend
- Run a nginx, a mysql, and a http(apched) server
- Run all of them --detach (or -d), name them with --name
- nginx should listen on 80:80, httpd on 8080:80, mysql on 3306:3306
- When running mysql, use the --env option (or -e) to pass in MYSQL_RANDOM_ROOT_PASSWORD=yes
- Clean it all up with docker container stop and docker container rm(both can accept multiple names or ID's)
- Use docker container ls to enter everyting is correct before and after cleanup

<h2 name="6">6. What's going on in containers: CLI process monitoring</h2>

- 컨테이너의 상태를 보여주는 커맨드들
  - `docker container top` : process list in one container
  - `docker container inspect` : details of one container config
  - `docker container stats` : performance stats for all containers
- 커맨드들을 테스트 해보기 위해 `docker container run -d --name nginx nginx`, `docker container run -d --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=true mysql`를 이용해 nginx와 mysql 컨테이너 만들기 
- `docker container inspect` : show metadata about the container (start up config, volumes, networking, etc).
- `docker container stats` : show live performance data for all containers.

<h2 name="7">7. Getting a shell inside containers: no need for ssh</h2>

- 컨테이너 조작 커맨드들
  - -it : https://stackoverflow.com/questions/48368411/what-is-docker-run-it-flag
  - `docker container run -it` : start new container interactively
  - `docker container exec -it` : run additional command in existing container
- `docker container run -it` 뒤에 여러 옵션을 붙일 수 있다.
- `docker container run -it -t` (or --tty)` : simulates a real terminal like what ssh does
- `docker container run -it -i` (or --interactive) : keep session open to receive terminal input
- `bash shell` : if run with -it, it will give you a terminal inside the running container. 예를들어 `docker container run -it --name proxy nginx bash`는 proxy라는 이름의 컨테이너 터미널을 제공한다. 이 터미널 안에서 해당 컨테이너의 config파일을 수정하거나 package를 다운받는등 일반적인 shell에서 할 수 있는 여러 기능들을 실행시킬 수 있다. 
- 컨테이너의 shell에서 나가고 싶다면 `exit` 커맨드를 입력하면 되고 해당 컨테이너는 작동을 멈춘다. 
- 만일 우분투 이미지를 받는다면 디폴트 cmd는 bash이기 때문에 bash를 따로 명시해줄 필요가 없다. 
- 정지된 컨테이너를 실행시킴으로써 bash를 다시 사용하기 위해서는 `docker container start -ai <container name>`입력하면 된다. 
- 실행되고 있는 컨테이너 안의 shell을 보기위해서는 `docker container exec -it`를 사용할 수 있다.
- 예를들어 mysql이라는 이름을 가진 컨테이너안에 있는 mysql에서 관리자 작업을 하고싶다면 `docker container exec -it mysql bash` 커맨드를 입력하면 된다 (커맨드 안에있는 mysql은 컨테이너의 이름).
- exec 명령어는 현재 실행되고 있는 컨테이너에서 추가적인 작업만을 해주기 때문에 deamon에 영향을 주지 않는다. 그렇기에 `exit`을 이용해 bash에서 나올수 있지만 run 커맨드와는 다르게 컨테이너의 실행이 중지되지 않는다. 

<h2 name="8">8. Docker Networks: Concepts for private and public comms in containers</h2>

- Docker Networks Defaults
  - Each container connected to a private virtual network "bridge"
  - Each virtual network routes through NAT firewall on host IP
  - All containers on a virtual network can talk to each other without -p
  - Best practice is to create a new virtual network for each app:
    - network "my_web_app" for mysql and php/apache containers
    - network "my_api" for mongo and nodejs containers
  - Batteries included but removable
    - Defaults work well in many cases but easy to swap out parts to customize it
  - Make new virtual networks
  - Attach containers to more then one virtual network (or none)
  - Skip virtual networks and use host IP (--net=host)
  - Use different Docker network drivers to gain new abilities
  - and much more...
- cmder에 `docker container run -p 80:80 --name webhost -d nginx`로 새로운 컨테이너를 생성. (Remember publishing ports is always in HOST:CONTAINER format)
- `docker container port webhost`를 입력하면 host -> 컨테이너 ip 확인 가능 (하지만 내 컴퓨터의 ip주소와는 다르다)

### Anywhere I do a docker container run <stuff> nginx , where nginx is the image you should use, replace that with nginx:alpine , which still has ping command in it.

<h2 name="9">9. Docker Networks: CLI management of virtual networks</h2>

- `docker network ls` : Show networks
- `docker network inspect` : Inspect a network
- `docker network create --driver` : Create a network 
- `docker network connect` : Attach a network to container
- `docker network disconnect` : Detach a network from container
- cmder에 docker network ls를 입력하면 만들어진 네트워크들을 보여준다.
- 만들어진 네트워크 목록에서 bridge는 Default Docker virtual network, which is NAT'ed behind the Host IP.
- `docker network inspect bridge` 커맨드로 해당 네트워크에 붙은 컨테이너들을 확인할 수 있다. 
- 네트워크 목록에서의 host는 It gains performance by skipping virtual networks but sacrifices security of container model.
- 네트워크의 목록에서 none은 removes eth0 and only leaves you with localhost interface in container.
- `docker network create <network name>`으로 네트워크 생성가능 
- 네트워크를 생성했다면 드라이버의 기본값은 bridge이고 이 뜻은 built-in or 3rd party extensions that give you virtual network features.
- 컨테이너를 새로 생성한 뒤 네트워크와 연결해줄 수 있다.
- 예를들어 `docker container run -d --name new_nginx --network my_app_net nginx` 커맨드를 입력하여 new_enginx라는 컨테이너를 my_app_net이라는 네트워크와 연결할 수 있다.  
- `docker network inspect my_app_net` 커맨드로 컨테이너에 네트워크가 연결되있는지 확인 가능
- 하지만 새로운 컨테이너를 생성할 필요 없이 `docker network connect`나 `docker network disconnect` 커맨드로 기존에 만들어진 컨테이너를 네트워크에 연결 및 해제할 수 있다. 
- `docker network connect <network name> <container name>` : Dynamically creates a NIC in a container on an existing virtual network
- `docker container inspect <container id/name>` 커맨드로 컨테이너를 살펴보면 my_app_net 네트워크가 추가된 것을 확인 가능
- `docker network disconnect <network name>`은 해당 이름을 가지고 있는 네트워크의 연결을 끊는다. 
- Docker Networks: Default Security
  - Create your apps so frontend/backend sit on same Docker network
  - Their inter-communication never leaves host
  - All externally exposed ports closed by default 
  - You must manually expose via -p which is better default security

<h2 name="10">10. Docker Networks: DNS and how containers find each other</h2>

- 컨테이너들과 가상 네트워크들이 서로 소통을 하기 위해서는 이름이 굉장히 중요한 역할을 한다.
- forget IP's : Static IP's and using IP's for talking to containers is an anti-pattern. Do your best to avoid it because we cannot assume that everytime ip addresses are the same. 
- The solution for this is DNS naming.
- Docker DNS : Docker daemon has a built-in DNS server that containers use by default
- DNS default names : Docker defaults the hostname to the container's name but you can also set aliases
- `docker container exec -it my_nginx ping new_nginx` 커맨드는 my_nginx와 new_nginx의 소통을 가능하게 한다. 
- Docker Networks: DNS
  - Containers should not rely on IP's for inter communication
  - DNS for friendly names is built-in if you use custom networks
  - recommend to use custom networks 
  - This gets way easier with Docker Compose in future section

<h2 name="11">11. Assignment: CLI App Testing</h2>
  
- Use different Linux distro containers to check curl li tool version
- Use two different terminal windows to start bash in both centos:7 and ubuntu:14.04, using -it
- Learn the `docker container --rm` option so you can save cleanup
- Ensure curl is installed and on latest version for that distro
  - ubuntu: `apt-get update && apt-get install curl`
  - centos: `yum update curl`
- Check `curl --version`
- `docker container run --rm` 커맨드는 bash에서 exit을 하게되면 자동적으로 삭제된다. 
- `docker container run --rm -it centos:7 bash`
- `docker container run --rm -it ubuntu:14.04 bash`

<h2 name="12">12. Assignment Requirements: DNS RR Test</h2>

- DNS Round Robin
  - https://www.facebook.com/dnssentry40/posts/242111185960335/
- Ever since Docker Engine 1.11, we can have multiple containers on a created network respond to the same DNS address
- Create a new virtual network (default bridge driver)
- Create two containers from elasticsearch:2 image
- Research and use `-network-alias search` when creating them to give them an additional DNS name to respond to
- Run `alpine nslookup search` with --net to see the two containers list for the same DNS name
- Run `centos curl -s search:9200` with --net multiple times until you see both "name" fields show
- `docker container run -d --net dude --net-alias search elasticsearch:2` : dude라는 네트워크 안에서 elasticsearch2 이미지를 가지고있는 컨테이너를 실행하고 give it the network alias search.
- `docker container run --rm --net dude alpine nslookup search` : 이 커맨드는 nslookup을 search DNS 엔트리에서 실행한뒤 exit을 하면 삭제된다. 참고로 nslookup은 DNS look up이다.
- `docker container run --rm --net dude centos curl -s search:9200` 실행

<h2 name="13">13. What's in an image (and what isn't)</h2>

- App binaries and dependencies
- Metadata about the image data and how to run the image
- Official definition: "An image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime."
- Not a complete OS. No kernel, kernel modules (e.g. drivers), it is just binary that my application needs because the host provides the kernel
- Small as one file (your app binary) like a golang static binary
- Big as a Ubuntu distro with apt, and Apache, PHP, and more installed is available but it will need multiple gigabytes

<h2 name="14">14. The Mighty Hub: Using docker hub registry images</h2>

- `docker image ls` : 이미지 리스트 확인
- `docker pull <image name>` : 최신버전의 이미지 다운받기
- `docker pull <image name>.version` : 해당 버전의 이미지 다운받기
- Use different base images like debian or alpine (alpine is typically smaller than debian)

<h2 name="15">15. Images and Their Layers: Discover the Image Cache</h2>

- `docker image history <image>` : Show layers of changes made in image.
- Every image starts with blank layer known as scratch.
- And every set of changes that happens after that on the file system in the image is another layer.
- 이미지들 마다 레이어가 다르다. 
- Docker never store same image data more than once in file system which means we do not need to upload and download the same layer that we already have on the other side.
- `docker image inspect <image>` : returns JSON metadata about the image. 
- Image and Their Layers: Review
  - Images are made up of file system changes and metadata
  - Each layer is uniquely identified and only stored once on a host
  - This saves storage space on host and transfer time on push/pull
  - A container is just a single read/write layer on top of image
  - `docker image history` and `inspect` commands can teach us
- 도커 이미지 참조 : https://trylhc.tistory.com/entry/Docker-image

<h2 name="16">16. Image Tagging and Push</h2>

- This is about how to upload image tag and upload in docker hub.
- `docker image tag` : assign one or more tags to an image
- 이미지는 이름이 없는대신 ID를 가지고있다. 하지만 ID는 기억하기 쉽지 않으므로 이미지를 구분하기 위해 `<user>/<repo>:<tag>`가 존재한다. 
- Official Repositories : They live at the "root namespace" of the registry, so they don't need account name in front of repo name.
- 예를들어 `docker pull mysql/mysql-server`로 mysql을 받으면 REPOSITORY에 '팀이름 or id/repo이름'으로 표시된다. 
- TAG is a pointer to a specific image commit and image id
- `docker image tag nginx:alpine goongamja/nginx:alpine` : nginx:alpine을 goongamja/nginx:alpine 이름으로 받으며 ':'은 태그의 기준이 된다. (`docker image tag --help`를 이용해 확인이 가능) 만일 태그를 지정하지 않는다면 기본으로 latest가 설정된다. 
- 중요한 점은 TARGET_IMAGE의 이름을 도커 아이디의 이름과 같게 해야한다. 그렇지 않으면 push할때 타임아웃 에러가 나온다.
- "latest" tag : It's just the default tag, but image owners should assign it to the newest stable version.
- `docker image push` : Uploads changed layers to a image registry (default is Hub)
- 새로 생성한 태그를 push 명령어로 도커허브에 업로드 시킬려고 했으나
denied: requested access to the resource is denied 메세지가 나온다. 왜냐하면 로그인을 아직 하지 않았기 때문
- `docker login` : Defaults to logging in Hub, but you can override by adding server url
- `docker logout` : always logout from shared machines or servers when done, to protect your account
- 현재 가지고있는 이미지에 태그를 붙이고 push를 했을뿐 인위적으로 레포를 만들지 않았지만 새로운 레포가 생성되었다. 
- `docker image tag goongamja/nginx:alpine goongamja/nginx:testing` 커맨드로 같은 이미지에 다른 태그를 붙여본뒤에 push해보면 도커허브 태그 메뉴에 새로운 태그가 생성된 것을 볼 수 있다. 
- Review
  - Properly tagging images
  - Tagging images for upload to Docker Hub
  - How tagging is related to image ID
  - The Latest Tag
  - Logging into Docker Hub from docker cli
  - How to create private Docker Hub images

<h2 name="17">17. Building Images: The Dockerfile Basics</h2>

- Bret의 도커 깃 레포를 클론받아 dockerfile-sample-1에 들어가면 Dockerfile 하나가 있다. 
- `vim Dockerfile`로 도커파일 살펴보기 
  ```docker
  # NOTE: this example is taken from the default Dockerfile for the official nginx Docker Hub Repo
  # https://hub.docker.com/_/nginx/
  # NOTE: This file is slightly different than the video, because nginx versions have been updated
  #       to match the latest standards from docker hub... but it's doing the same thing as the video
  #       describes
  FROM debian:stretch-slim
  # all images must have a FROM
  # usually from a minimal Linux distribution like debian or (even better) alpine
  # if you truly want to start with an empty container, use FROM scratch

  ENV NGINX_VERSION 1.13.6-1~stretch
  ENV NJS_VERSION   1.13.6.0.1.14-1~stretch
  # optional environment variable that's used in later lines and set as envvar when container is running

  RUN apt-get update \
          && apt-get install --no-install-recommends --no-install-suggests -y gnupg1 \
          && \
          NGINX_GPGKEY=45252342F62; \
          found=''; \
          for server in \
                  ha.pool.sks-keyservers.net \
                  hkp://keyserver.ubuntu.com:80 \
                  hkp://p80.pool.sks-keyservers.net:80 \
                  pgp.mit.edu \
          ; do \
                  echo "Fetching GPG key $NGINX_GPGKEY from $server"; \
                  apt-key adv --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$NGINX_GPGKEY" && found=yes && break; \
          done; \
          test -z "$found" && echo >&2 "error: failed to fetch GPG key $NGINX_GPGKEY" && exit 1; \
          apt-get remove --purge -y gnupg1 && apt-get -y --purge autoremove && rm -rf /var/lib/apt/lists/* \
          && echo "deb http://nginx.org/packages/mainline/debian/ stretch nginx" >> /etc/apt/sources.list \
          && apt-get update \
          && apt-get install --no-install-recommends --no-install-suggests -y \
                                                  nginx=${NGINX_VERSION} \
                                                  nginx-module-xslt=${NGINX_VERSION} \
                                                  nginx-module-geoip=${NGINX_VERSION} \
                                                  nginx-module-image-filter=${NGINX_VERSION} \
                                                  nginx-module-njs=${NJS_VERSION} \
                                                  gettext-base \
          && rm -rf /var/lib/apt/lists/*
  # optional commands to run at shell inside container at build time
  # this one adds package repo for nginx from nginx.org and installs it

  RUN ln -sf /dev/stdout /var/log/nginx/access.log \
          && ln -sf /dev/stderr /var/log/nginx/error.log
  # forward request and error logs to docker log collector

  EXPOSE 80 443
  # expose these ports on the docker virtual network
  ```
- package manager : pm's like apt and yum are one of the reasons to build containers FROM Debian, Ubuntu, Fedora or CentOS
- Environment Variables(ENV) : One reason they were chosen as preferred way to inject key/value is they work everywhere, on every OS and config
- RUN에 있는 &&들은 하나의 layer을 가리킨다. 
- https://subicura.com/2017/02/10/docker-guide-for-beginners-create-image-and-deploy.html

<h2 name="18">18. Building Images: Running Docker Builds</h2>

- `docker image build -t customnginx .` : customnginx 태그를 가진 도커 이미지파일을 로컬에 생성 
- 커맨드를 입력하면 폴더 안에있는 Dockerfile을 기반으로 Dockerfile 안의 순서에 맞게 실행되고있다(FROM -> ENV -> RUN -> EXPOSE -> CMD).
- 변화가 거의 없는 부분들은 파일의 상단에, 변화가 자주 있는 부분들은 파일 하단에 위치한다. 

<h2 name="19">19. Building Images: Extending Official Images</h2>

- dockerfile-sample-2에 Dockerfile과 index.html 파일이 있다.
  ```docker
  # this same shows how we can extend/change an existing official image from Docker Hub

  FROM nginx:latest
  # highly recommend you always pin versions for anything beyond dev/learn

  WORKDIR /usr/share/nginx/html
  # change working directory to root of nginx webhost
  # using WORKDIR is preferred to using 'RUN cd /some/path'

  COPY index.html index.html
  # Overwritting the file in nginx directory for the custom homepage web server
  # I don't have to specify EXPOSE or CMD because they're in my FROM
  ```
- 파일이 좀 더 복잡해지고 컨테이너를 왔다갔다 하면서 작업해야 할 경우 WORKDIR을 이용하는것이 좋다. 
- 이 경우에는 기본 nginx 경로에서 html파일로 바꾸기
- 도커 이미지를 chaining으로 만들면 하나의 이미지가 여러 이미지들에 의존적으로 만들 수 있다. 
- `docker container run -p 80:80 --rm nginx`로 nginx 컨테이너를 만들고 `docker image build -t nginx-with-html .` 이미지를 만들면 폴더에 있는 Dockerfile이 index.html을 가져와 덮어쓰고 `docker container run -p 80:80 --rm nginx-with-html`로 nginx-with-html이미지를 이용해 컨테이너를 만들고 포트 80에 접속하면 index.html의 내용이 화면에 출력된다. 
- `docker image tag nginx-with-html:latest goongamja/nginx-with-html:latest`로 태그이름 설정한 뒤 내 도커 레포에 push.

<h2 name="20">20. Assignment: Build Your Own Dockerfile and Run Containers From It</h2>

- Dockerfiles are part process workflow and part art
- Take existing Node.js app and Dockerize it
- Make Dockerfile. Build it. Test it. Push it. (rm it). Run it.
- Expect this to be iterative. Rarely do I get it right the first time.
- Details in dockerfile-assignment-1/Dockerfile
- Use the Alpine version of the official 'node' 6.x image
- Expected result is web site at http://localhost
- Tag and push to your Docker Hub account (free)
- Remove your image from local cache, run again from Hub

<h2 name="21">21. Assignment Answers: Build Your Own Dockerfile and Run Containers From It</h2>

  ```docker
  # Dockerfile in dockerfile-assignment-1
  # Instructions from the app developer
  # - you should use the 'node' official image, with the alpine 6.x branch
  FROM node:6-alpine
  # - this app listens on port 3000, but the container should launch on port 80
  #  so it will respond to http://localhost:80 on your computer
  EXPOSE 3000
  # - then it should use alpine package manager to install tini: 'apk add --update tini'
  RUN apk add --update tini
  # - then it should create directory /usr/src/app for app files with 'mkdir -p /usr/src/app'
  RUN mkdir -p /usr/src/app
  # - Node uses a "package manager", so it needs to copy in package.json file
  WORKDIR /usr/src/app
  COPY package.json package.json
  # - then it needs to run 'npm install' to install dependencies from that file
  # - to keep it clean and small, run 'npm cache clean' after above
  RUN npm install && npm cache clean
  # - then it needs to copy in all files from current directory
  COPY . .
  # - then it needs to start container with command '/sbin/tini -- node ./bin/www'
  # CMD 관련은 문서에서 확인 가능
  CMD [ "tini", "--", "node", "./bin/www"]
  # - in the end you should be using FROM, RUN, WORKDIR, COPY, EXPOSE, and CMD commands
  ```
- 이미지 생성 : `docker build -t testnode .`
- 컨테이너 생성 : `docker container run --rm -p 81:3000 testnode`
- localhost:81에서 확인 가능
- 이미지 태그 바꾸기 : `docker tag testnode goongamja/testing-node`
- 도커레포에 올리기 : `docker push goongamja/testing-node`
- 이미지 삭제 : `docker image rm goongamja/testing-node`
- 레포에서 이미지 다운받기 : `docker container run --rm -p 81:3000 goongamja/testing-node`

<h2 name="22">22. Container Lifetime & Persistent Data</h2>

- Container Lifetime & Persistent Data
  - Containers are usually immutable and ephemeral
  - "immutable infrastructure": only re-deploy containers, never change
  - This is the ideal scenario, but what about databases, or unique data?
  - Docker gives us features to ensure these "separation of concerns"
  - This is known as "persistent data"
  - Two ways: Volumes and Bind Mounts
  - Volumes: make special location outside of container UFS(Union File System)
  - Bind Mounts: link container path to host path

<h2 name="23">23. Persistent Data: Data Volumes</h2>

- 도커파일을 살펴보면 VOLUME을 확인 할 수 있다. 
- VOLUME 경로안에 있는 파일들은 컨테이너 안에서 실행되며 삭제하지 않는이상 계속해서 존재한다. 즉, 컨테이너를 삭제한다고 해서 볼륨도 삭제되지 않는다. (볼륨의 중요성)
- mysql 이미지를 만들고 `docker image inspect mysql` 명령어를 입력하면 JSON안에 Volumes를 확인 할 수 있다.
- `docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True mysql`명령어로 컨테이너를 생성하고 inspect를 이용해 살펴보면 JSON 파일 Config안에있는 Volumes과 Mounts의 Type에 volume을 확인 할 수 있다.
- Mounts is actually a running container getting its own unique location on the host to store that data and in that background, map or mounted to that location the container.
- `docker volume ls`로 볼륨을 확인 할 수 있고 inspect로 세부내용 확인가능 
- 하지만 컨테이너를 삭제해도 볼륨은 삭제되지 않으며 볼륨에 이름이 없기에 구분하기가 힘들다.
- 이 때 named volumes을 사용한다. 
- named volumes : friendly way to assign vols to containers
- named volumes는 컨테이너를 생성할 때 -v를 이용하면된다. 
- `docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql` 명령어를 실행하고 볼륨리스트를 확인하면 mysql-db 이름의 볼륨이 생성된 것을 확인 할 수 있다. 
- `docker volume create` : required to do this before "docker run" to use custom drivers and labels

<h2 name="24">24. Persistent Data: Bind Mounting</h2>

- Maps a host file or directory to a container file or directory
- Basically just two locations pointing to the same file(s)
- Again, skips UFS, and host files overwrite any in container 
- Can't use in Dockerfile, must be at container run
- `... run -v //c/Users/bret/stuff:/path/container`(windows)
- dockerfile-sample-2 폴더안에 Dockerfile과 index.html 두 파일이 있다. 
- 컨테이너 밖(호스트)에 있는 파일을 컨테이너 안에서 실행시켜보기
- `docker container run -d --name nginx -p 80:80 -v ${pwd}:/usr/share/nginx/html nginx`으로 localhost:80 만들어주기 
- pwd : print out working directory and replace command with following path.
- 호스트에서 파일을 수정한 뒤에 컨테이너에서 확인할 수 있다. 

<h2 name="25">25. Assignment: Database Upgrades with Named Volumes</h2>

- Database upgrade with containers
- Create a postgres container with named volume psql-data using version 9.6.1
- Use Docker Hub to learn VOLUME path and versions needed to run it
- Check logs, stop container
- Create a new postgres container with same named volume using 9.6.2
- Check logs to validate
- (this only works with patch versions, most SQL DB's require manual commands to upgrade DB's to major/minor versions, i.e. it's a DB limitation not a container one)

<h2 name="26">26. Assignment Answers: Database Upgrades with Named Volumes</h2>

- `docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1`
- `docker container logs psql`
- `docker container stop psql`
- `docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.2`

<h2 name="27">27. Assignment: Edit Code Running In Containers With Bind Mounts</h2>

- Use a Jekyll "Static Site Generator" to start a local web server
- Don't have to be web developer: this is example of bridging the gap between local file access and apps running in containers
- source code is in the course repo under bindmount-sample-1
- We edit files with editor on our host using native tools
- Container detects changes with host files and updates web server
- Start container with `docker run -p 80:4000 -v ${pwd}:/site bretfisher/jekyll-serve`
- Refresh our browser to see changes
- Change the file in _posts\ and refresh browser to see changes

<h2 name="28">28. Assignment Answers: Edit Code Running In Containers With Bind Mounts</h2>

- `docker run -p 80:4000 -v $(pwd):/site bretfisher/jekyll-serve
- localhost에 접속하면 jekyll 사이트를 볼 수 있음
- _posts에 있는 내용 수정 
- 내용을 수정하면 로그가 변화를 감지한다.
- 새로고침을 하면 변화된 내용을 볼 수 있다. 

<h2 name="29">29. Docker Compose and The docker-compose.yml File</h2>

- Docker Compose
  - Why: configure relationships between containers
  - Why: save our docker container run settings in easy-to-read file
  - Why: create one-liner developer environment startups
  - Comprised of 2 separate but related things
  - First part of docker compose is YAML-formatted file that describes our solution option for:
    - containers
    - networks
    - volumes
    - images
    - environment variables 
  - Second part of docker compose is a CLI tool `docker-compose` used for local dev/test automation with those YAML files to simplify docker commands. 
- docker-compose.yml
  - Compose YAML format has it's own versions: 1, 2, 2.1, 3, 3.1
  - YAML file can be used with `docker-compose` command for local docker automation or..
  - With docker directly in production with Swarm (as of v1.13)
  - `docker-compose --help`
  - `docker-compose.yml` is default filename, but any can be used with `docker-compose -f`.

<h2 name="30">30. Trying Out Basic Compose Commands</h2>

- CLI tool comes with Docker for Windows/Mac, but separate download for Linux
- Not a production-grade tool but ideal for local development and test
- Two most common commands are
  - `docker-compose up` : setup volumes/networks and start all containers
  - `docker-compose down` : stop all containers and remove cont/vol/net
- If all your projects had a Dockerfile and docker-compose.yml then "new developer onboarding" would be:
  - git clone github.com/some/software
  - docker-compose up
- compose-sample-2 경로에서 `docker-compose up` 명령어를 실행하면 아파치 서버가 실행되고 localhost에 접속해서 확인 할 수 있다. 
- `docker-compose up -d` 명령어로 백그라운드에서 실행하게 할 수도 있다. 
- `docker-compose down`으로 서버를 끄고 삭제할 수 있다. (-v를 뒤에 붙이면 볼륨도 삭제된다.)
- `docker-compose down --rmi local` 로컬의 이미지도 같이 삭제한다.

<h2 name="31">31. Assignment: Build a Compose File For a Multi-Container Service</h2>

- In compose-assignment-2 directory
- Build a basic compose file for a Drupal content management system website. Docker Hub is your friend
- Use the drupal image along with the postgres image
- Use ports to expose Drupal on 8080 so you can localhost:8080
- Be sure to set POSTGRES_PASSWORD for postgres
- Walk though Drupal setup via browser
- Tip: Drupal assumes DB is localhost, but it's service name

<h2 name="32">32. Assignment Answers: Build a Compose File For a Multi-Container Service</h2>

  ```yml
  # Drupal with PostgreSQL
  #
  # Access via "http://localhost:8080"
  #   (or "http://$(docker-machine ip):8080" if using docker-machine)
  #
  # During initial Drupal setup,
  # Database type: PostgreSQL
  # Database name: postgres
  # Database username: postgres
  # Database password: example
  # ADVANCED OPTIONS; Database host: postgres

  version: '3.1'

  services:

    drupal:
      image: drupal:8-apache
      ports:
        - 8080:80
      volumes:
        - /var/www/html/modules
        - /var/www/html/profiles
        - /var/www/html/themes
        # this takes advantage of the feature in Docker that a new anonymous
        # volume (which is what we're creating here) will be initialized with the
        # existing content of the image at the same location
        - /var/www/html/sites
      restart: always

    postgres:
      image: postgres:10
      environment:
        POSTGRES_PASSWORD: mypassword
      restart: always
  ```

<h2 name="33">33. Adding Image Building to Compose Files</h2>

- Using Compose to Build
  - Compose can also build your custom images
  - Will build them with `docker-compose up` if not found in cache
  - Also rebuild with `docker-compose build`
  - Great for complex builds that have lots of vars or build args

  ```yml
  # docker-compose.yml

  version: '2'
  # based off compose-sample-2, only we build nginx.conf into image
  # uses sample site from https://startbootstrap.com/template-overviews/agency/

  services:
    proxy:
      build:
        context: .
        dockerfile: nginx.Dockerfile
        # 먼저 image가 캐시에 있는지 확인한 후 없으면 build를 실행한 뒤 dockerfile를 찾아보고 이미지를 빌드한다
      ports:
        - '80:80'
    web:
      image: httpd
      volumes:
        - ./html:/usr/local/apache2/htdocs/
  ```
  ```docker
  # nginx.Dockerfile

  FROM nginx:1.13

  COPY nginx.conf /etc/nginx/conf.d/default.conf
  ```

<h2 name="34">34. Swarm Mode: Built-in Orchestration</h2>

- Containers Everywhere = New Problems
  - How do we automate container lifecycle?
  - How can we easily scale out/in/up/down?
  - How can we ensure our containers are re-created if they fail?
  - How can we replace containers without downtime (blue/green deploy)?
  - How can we control/track where containers get started?
  - How can we create cross-node virtual networks?
  - How can we ensure only trusted servers run our containers?
  - How can we store secrets, keys, passwords and get them to the right container (and only that container)?
- Swarm Mode: Built-In Orchestration
  - Swarm Mode is a clustering solution built inside Docker
  - Not related to Swarm "classic" for pre-1.12 versions
  - Added in 1.12 (Summer 2016) via SwarmKit toolkit
  - Enhanced in 1.13 (Jan 2017) via Stacks and Secrets
  - Not enabled by default, new commands once enabled
    - docker swarm
    - docker node
    - docker service
    - docker stack
    - docker secret