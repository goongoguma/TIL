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
  - `docker container run` always starts a new container
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
- 이미지는 이름이 없는대신 ID를 가지고있다. 하지만 ID는 기억하기 쉽지 않으므로 이미지를 구분하기 위해 <user>/<repo>:<tag>가 존재한다. 
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






