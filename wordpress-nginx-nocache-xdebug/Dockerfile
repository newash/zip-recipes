FROM kdelfour/supervisor-docker
MAINTAINER Gezim Hoxha <hgezim@gmail.com>

RUN apt-get update && apt-get install -y nginx php5-dev php5-mysql php5-fpm php5-xdebug ccze vim links

# Set up fpm error logging
RUN sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php5/fpm/php.ini
RUN sed -i 's/;php_admin_flag\[log_errors\] = on/;php_admin_flag\[log_errors\] = on/' /etc/php5/fpm/pool.d/www.conf
RUN sed -i 's!;php_admin_value\[error_log\] = /var/log/fpm-php\.www\.log!php_admin_value\[error_log\] = /var/log/fpm-php\.www\.log!' /etc/php5/fpm/pool.d/www.conf

# Create file for fpm logging
RUN touch /var/log/fpm-php.www.log
RUN chown www-data.www-data /var/log/fpm-php.www.log

# Fix xdebug settings
RUN { \
  echo 'zend_extension="/usr/lib/php5/20121212/xdebug.so"'; \
  echo 'xdebug.remote_enable = on'; \
  echo 'xdebug.remote_connect_back = on'; \
  echo 'xdebug.idekey = "vagrant"'; \
  } >> /etc/php5/mods-available/xdebug.ini

WORKDIR /root/
RUN curl https://wordpress.org/latest.tar.gz -O

RUN tar xzf latest.tar.gz
RUN rm -rf latest.tar.gz
RUN cp -r wordpress/* /usr/share/nginx/html/

EXPOSE 8080

RUN sudo chown -R www-data:www-data /usr/share/nginx/html

ADD ./nginx_wordpress /etc/nginx/sites-enabled/

COPY ./supervisor_nginx.conf /etc/supervisor/conf.d/
COPY ./supervisor_fpm.conf /etc/supervisor/conf.d/ 


# create wordpress db if it doesn't exist - actually, let's let this be created by mysql image
# update config file 
# that's it!

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

