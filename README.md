# Under Assumption: A linux system with docker is installed

** To create Automated Set up of a poor man cluster with redis docker containers **

### Deploy cluster in multi nodes or Remote Server Deployment:
- Create a Jenkins pipeline job with Provided Jenkinsfile. This job can be integrated with Other      jenkins jobs in CICD manner to provision Redis cluster.

![alt text](https://github.com/Sidzure/RedisDockerClusterPubSub/blob/master/clusterTest.png?raw=true)

# OR

### Deploy all in one Node:
It is currently configured to start 6 redis containers -( 3 Master and 3 Slaves). Latest redis image is used, without redis-sentinel. sentinel can be used for master-slave leader election and quorum.

#### To get the clusters up and running: 
```
docker-compose up --build -d
```

#### Verify redis cluster:
```
$ docker exec -it {NAME}-redis-cluster_redis-1_1 redis-cli -c -p 7001
10.1.0.11:7002> cluster nodes
```

#### To Destroy cluster from node:
```
docker-compose down
```

#### NodeJs Config:
publisher and subscriber are written in "publisher.js" and "subscriber.js" respectively.

#### Open a terminal window and fire up the publisher script : node publisher.js
![alt text](https://github.com/Sidzure/RedisDockerClusterPubSub/blob/master/PubTest.png?raw=true)

#### Launch a second terminal window and fire up the subscriber script : node subscriber.js
![alt text](https://github.com/Sidzure/RedisDockerClusterPubSub/blob/master/SubTest.png?raw=true)
