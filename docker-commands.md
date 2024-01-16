# Building the image

- Make `cd /path/to/learn-node` directory.
- Run `docker build -t learn-node .`
  - The `docker build` command uses the `Dockerfile` to build a new image.
  - `-t` flag tags image with learn-node name.
  - The `.` at the end of the docker build command tells Docker that it should look for the `Dockerfile` in the current directory.

## Running multiple containers
- Because I have backend and DB, I need to run `docker compose up -d`
  - `-d` means "detached", so it returns me an acces to the terminal.


## Running one container
If you need to re-start specific container:
- `docker run -dp 127.0.0.1:3001:3001 <container-name>`


## Other commands
- `docker ps` to see a list of all running containers.
    - `-a` to show all containers with their statuses.
- `docker stop <the-container-id>` - to stop specific container.
- `docker rm <the-container-id>` - to remove specific container.
- `docker exec <container-id> {sh commands}`
    - `-it` means interactive terminal
- `docker run -it --mount type=bind,src="$(pwd)",target=/src <container-name> bash` 
    - The `--mount` option tells Docker to create a bind mount, where `src` is the current working directory on your host machine (`learn-node`), and `target` is where that directory should appear inside the container (`/src`).

## Running MySQL
To run MySQL inside the container run `docker compose up -d`, then `docker ps` and copy the MySQL id. Then run `docker exec -it <mysql-container-id> mysql -u root -p` where `-u` is the username, and `-p` is a password.
