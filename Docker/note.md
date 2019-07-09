# Docker Mastery: The Complete Toolset From a Docker Captain by Bret Fisher

## Index

- [1. 도커 설치](#1)
- [2. 도커로 Nginx 서버 실행하기](#2)
- [3. 컨테이너의 실행](#3)
- [4. 컨테이너 vs VM](#4)
- [5. 과제: 여러개의 컨테이너 관리해보기](#5)


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
- docker container run vs docker container start?
  - `docker container run` always starts a new container
  - use `docker container start` to start an existing stopped one
- 컨테이너의 이름을 지정해 주지 않는다면 랜덤으로 생성된다. 하지만 예를 들어 webhost nginx라는 이름의 컨테이너를 생성하고 싶다면 `docker container run --publish 80:80 --detach --name webhost nginx` 커맨드를 사용한다. 
- `docker container logs` 커맨드는 특정 컨테이너의 로그를 보여준다. 예를들어 docker container logs webhost 커맨드는 webhost 이름을 가지고 있는 컨테이너의 로그를 보여준다.
- `docker container rm <container id>`를 이용해 해당 아이디를 가지고 있는 컨테이너를 삭제할 수 있다. 단 현재 실행되고 있는 컨테이너는 삭제할 수 없다. 하지만 rm과 <container id>사이에 -f를 붙이면 강제적으로 삭제할 수 있다. 
- 커맨드 정리
  - docker container run : 새로운 컨테이너 생성
  - docker stop <container id/name> : 컨테이너 실행 중지
  - docker container ls : 실행되고 있는 컨테이너 정보 확인
  - docker container start : 실행 중지된 컨테이너 다시 실행
  - docker container logs <container id/name> : 특정 컨테이너 로그 확인
  - docker container rm <container id/name> : 특정 컨테이너 삭제

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

<h2 name="5">Assignment: Manage Multiple Containers</h2>

- docs.docker.com and --help are your friend
- Run a nginx, a mysql, and a httpd(apched) server
- Run all of them --detach (or -d), name them with --name
- nginx should listen on 80:80, httpd on 8080:80, mysql on 3306:3306
- When running mysql, use the --env option (or -e) to pass in MYSQL_RANDOM_ROOT_PASSWORD=yes
- Clean it all up with docker container stop and docker container rm(both can accept multiple names or ID's)
- Use docker container ls to enter everyting is correct before and after cleanup
