# Docker and Kubernetes: The Complete Guide by Stephen Grider

<h2 name="1">1. Why we use Docker?</h2>

- Docker makes it really easy to install and run software without worrying about setup or dependencies

<h2 name="2">2. What is Docker?</h2>

- Docker is a platform or ecosystem around creating and running containers
- When I run the command, something called docker cli reach out to something called docker hub and downloaded single file called image, it is a single file with all the deps and config required to run a program.
- At some point of time, it creates something called container.
- Container is an instance of an image. It is a program with own isolated resources. 

<h2 name="3">3. Docker for Mac/Windows</h2>

- Docker for Windows/Mac
 - Docker Client(Docker CLI) : Tool that we are going to issue commands to.
 - Docker Server(Docker Daemon) : Tool that is responsible for creating images, running containers, etc.
- 도커 cli에 docker run hello-world 명령어를 입력하면 도커서버(도커데몬)가 로컬에서 허브로부터 다운받은 이미지들이 저장되어있는 이미지 캐시를 살펴보고 이미지가 없으면 도커 허브에서 hello-world 이미지를 찾고 다운받아 내 컴퓨터 이미지 캐시에 저장을 해놓는다. 같은 이미지가 필요할 경우 다시 다운받는것이 아닌 이미지 캐시에 저장되어있는 이미지를 사용한다.
- 그런 뒤, 도커서버는 메모리에 저장되어있는 이미지를 가지고 컨테이너를 생성한 뒤 프로그램을 실행한다. 
    ```docker
    To generate this message, Docker took the following steps:
    1. The Docker client contacted the Docker daemon.
    2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
    3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
    4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.
    ```
<h2 name="4">4. What is a container?</h2>

- 컴퓨터에서 실행되고있는 프로그램들(Chrome, Terminal, NodeJS etc) -> System Call(Running program issues request to kernel to interact with a piece of hardware) -> Kernel(it is a running software process that governs access between programs running on a computer and all the physical hardware that is connected to a computer as well) -> CPU, Memory, Hard Disk