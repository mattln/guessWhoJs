# -*- mode: ruby -*-
# vi: set ft=ruby :

NUMBER_OF_BOXES_TO_CREATE = 1
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(2) do |config|

  (1..NUMBER_OF_BOXES_TO_CREATE).each do |machineNumber|
     config.vm.define "mattln-#{machineNumber}" do |machine|
      machine.vm.box = "bento/centos-7.1"
      machine.vm.hostname = "mattln-#{machineNumber}.vagrant.local"
      machine.vm.network "private_network", ip: "172.16.20.#{10 + machineNumber}"
      machine.vm.synced_folder "./", "/var/www/project"

      machine.vm.provider "virtualbox" do |vb|
         vb.memory = "1024"
      end

      machine.vm.provision "shell", inline: <<-SHELL
        sudo su
        echo 'Adding `sudo su` to the `.bashrc` for `vagrant` user...'
        echo 'cd /var/www/project' >> /home/vagrant/.bashrc
        echo 'sudo su' >> /home/vagrant/.bashrc
        echo 'export PATH=$PATH:/usr/local/bin' >> /root/.bashrc
        . ~/.bashrc
        echo "Installing nginx..."
        rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
        rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
        yum install vim nginx -y
        echo "Adding services to chkconfig..."
        chkconfig nginx on
        echo "Changing nginx settings..."
        mkdir /etc/nginx/sites-available
        mkdir /var/nginx
        cat /vagrant/vagrant-init/nginx.conf > /etc/nginx/nginx.conf
        cat /vagrant/vagrant-init/mattln-local.conf > /etc/nginx/sites-available/mattln-local.conf
        cat /vagrant/vagrant-init/fastcgi_params > /etc/nginx/fastcgi_params
        echo "Restarting nginx and php..."
        service nginx start

        echo "Installing git, npm, grunt and bower..."
        curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
        yum -y install nodejs git
        npm install -g grunt-cli
        npm install -g bower
        echo "Install npm packages..."
        cd /var/www/project
        npm install
        bower install
        echo "Done.."
      SHELL

    end
  end
end
