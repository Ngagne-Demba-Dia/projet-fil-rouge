pipeline {
    agent any

    stages {
        stage('Cloner le dépôt') {
            steps {
                git 'https://github.com/Ngagne-Demba-Dia/odc-projet.git'
            }
        
        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Lancement des services') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
