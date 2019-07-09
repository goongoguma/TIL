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
- exec 명령어는 현재 실행되고 있는 컨테이너에서 추가적인 작업만을 해주기 때문에 mysql deamon에 영향을 주지 않는다. 그렇기에 `exit`을 이용해 bash에서 나올수 있지만 run 커맨드와는 다르게 컨테이너의 실행이 중지되지 않는다. 

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

### Anywhere I do a docker container run <stuff> nginx , where nginx  is the image you should use, replace that with nginx:alpine , which still has ping command in it.

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

  

