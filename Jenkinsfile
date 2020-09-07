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
