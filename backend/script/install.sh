#!/bin/bash

apt update && apt upgrade -y

apt install zsh curl git nano -y

function install_node {
  echo ">>>>>>>>>>>>>>> Instalando nvm"
  curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
  bash nodesource_setup.sh

  echo ">>>>>>>>>>>>>>> Instalando node 18"
  apt install nodejs
}

function install_zsh_plugins {
  echo ">>>>>>>>>>>>>>> Instalando plugins zsh"
  sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" -y

  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

  mv /script/add-plugins.txt /root

  cd ~
  echo "zsh" >> .bashrc
  cat add-plugins.txt > .zshrc
}

install_node
install_zsh_plugins