# ***connection project***

>## API Rest connection module in nodejs, which allows users to
>
>* register
>* log-in
>* log-out
>* recover forgotten password
>* oauth -> log-in with google account

## RUN

```bash
docker-compose build
docker-compose up -d
```

### WARNING

Is possible that above command not work, in this case try this instruction:

```bash
docker run --name node_connection --network connection-project_net_node -p 3000:3000 -d med2bouanane/node_connection

```

> **_connection-project_net_node_** will be the network name created after execute docker-compose up -d
we will use it for execute the med2bouanane/node_connection image to link the mongodb data base
