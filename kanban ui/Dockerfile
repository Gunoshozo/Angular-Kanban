FROM nginx

ADD default.conf /etc/nginx/conf.d/default.conf

COPY src/ /usr/share/nginx/html


EXPOSE 8080

RUN mkdir -p /var/cache && chmod -R 0777 /var/log/nginx /var/cache /var/run/ /usr/share/nginx/html/ \
&& find /etc/nginx -type d -exec chmod 777 {} \; \
&& find /etc/nginx -type f -exec chmod 666 {} \;