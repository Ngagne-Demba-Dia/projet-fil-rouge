pipeline {
    agent any

    environment {
        DOCKER_USER = 'angevirus'
        BACKEND_IMAGE = "${DOCKER_USER}/backend"
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend"
        MIGRATE_IMAGE = "${DOCKER_USER}/git-backend"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ngagne-Demba-Dia/projet-fil-rouge.git'
            }
        }

        stage('Build des images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:latest ./Backend/odc'
                sh 'docker build -t $FRONTEND_IMAGE:latest ./Frontend'
                sh 'docker build -t $MIGRATE_IMAGE:latest ./Backend/odc'
            }
        }

        stage('Push des images sur Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'moncredential', url: '']) {
                    sh 'docker push $BACKEND_IMAGE:latest'
                    sh 'docker push $FRONTEND_IMAGE:latest'
                    sh 'docker push $MIGRATE_IMAGE:latest'
                }
            }
        }

        stage('Déploiement local avec Docker Compose') {
    steps {
        dir('./git') {
            sh '''
                docker-compose down --remove-orphans || true
                docker-compose pull
                docker-compose up -d --build
            '''
        }
    }
}

    }
}
