pipeline {
    agent any

    stages {
        stage('Cloner le dépôt') {
            steps {
                git 'https://github.com/Ngagne-Demba-Dia/odc-projet.git'
            }
        }

        stage('Tests Django') {
            steps {
                dir('Backend/odc') {
                    sh 'pip install -r requirements.txt'
                    sh 'python manage.py test'
                }
            }
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
