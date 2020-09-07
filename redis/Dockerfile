FROM redis:latest
RUN apt-get update
RUN apt-get install -y gettext-base
COPY redis.conf /etc/redis/redis.conf.template
COPY setup.sh /setup.sh
ENTRYPOINT [ "/bin/bash", "/setup.sh" ]
