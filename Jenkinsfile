pipeline {
    agent any

    tools {
        jdk 'jdk21'
        nodejs 'node21'
    }

    environment {
        APP_NAME = "chat-app"
        RELEASE = "1.0.0"
        DOCKER_USER = "sachin1818"
        DOCKER_PASS = "dockerhub"
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}.${BUILD_NUMBER}"
    }

    stages {
        stage('Clean workspace') {
    steps {
        deleteDir()
    }
}


        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/sachinaggarwal18/appliedTemp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
    }
}
