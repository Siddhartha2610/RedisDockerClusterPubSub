#!/usr/bin/env groovy
pipeline { 
    agent any 
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build Cluster') { 
            steps { 
                sh 'docker-compose up --build -d'
            }
        }
        stage('Test Cluster Creation'){
            steps {
                sh 'docker ps'
            }
        }
        stage('Connect to Master') {
            steps {
                sh 'docker exec -it docker-redis-cluster_redis-1_1 redis-cli -c -p 7001'
            }
        }
        stage('Display Cluster Nodes') {
            steps {
                sh 'cluster nodes'
            }
        }
        stage('Display Cluster Slots') {
            steps {
                sh 'cluster slots'
            }
        }
        stage('Build JS') {
            steps {
                sh 'npm install'
            }
        }
        stage('Publisher Run') {
            agent {
                docker { image 'node:14-alpine' }
            }
            steps {
                sh 'node publisher.js'
            }
        }
        stage('Subcriber Run') {
            agent {
                docker { image 'node:14-alpine' }
            }
            steps {
                sh 'node subscriber.js'
            }
        }
    }
    post {
        always {
            mail to: 'sidz020.sd@gmail.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
        }
        unstable {
            echo 'docker-compose down'
        }
        failure {
            echo 'docker-compose down'
        }
    }
}
