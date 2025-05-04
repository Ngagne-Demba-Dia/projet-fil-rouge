pipeline {
    agent any

    environment {
        DOCKER_USER = 'angevirus'
        BACKEND_IMAGE = "${DOCKER_USER}/backend"
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend"
        MIGRATE_IMAGE = "${DOCKER_USER}/git-backend"
        SONARQUBE_URL = 'https://0a8d-41-214-74-161.ngrok-free.app'
        SONARQUBE_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ngagne-Demba-Dia/projet-fil-rouge.git'
            }
        }

        // stage('SonarQube Analysis for Backend') {
        //     steps {
        //         dir('Backend/odc') {
        //             echo 'Analyse SonarQube du Backend...'
        //             sh '''
        //                 echo "Nettoyage complet du cache Sonar..."
        //                 rm -rf /root/.sonar || true
        //                 rm -rf ~/.sonar || true
        //                 echo "Nettoyage du cache Sonar terminé."
        //                '''
        //             withSonarQubeEnv('SonarQube') {
        //                 sh "${tool 'SonarScanner'}/bin/sonar-scanner -Dsonar.login=${SONARQUBE_TOKEN} -Dsonar.host.url=${SONARQUBE_URL}"
        //                 // sh "${tool 'SonarScanner'}/bin/sonar-scanner -Dsonar.login=$SONARQUBE_TOKEN -Dsonar.host.url=$SONARQUBE_URL"
        //             }
        //         }
        //     }
        // }
        stage('SonarQube Analysis for Backend') {
            agent{
                docker {
                    image 'sonarsource/sonar-scanner-cli:latest'
                    //args '-v /var/run/docker.sock:/var/run/docker.sock -v /root/.sonar:/root/.sonar -v ~/.sonar:~/.sonar'
                }
            }
            steps {
                dir('Backend/odc') {
                    echo 'Analyse SonarQube du Backend...'
                    sh '''
                        echo "Nettoyage complet du cache Sonar..."
                        rm -rf /root/.sonar || true
                        rm -rf ~/.sonar || true
                        echo "Nettoyage du cache Sonar terminé."
                       '''
                    withSonarQubeEnv('SonarQube') {
                        sh "sonar-scanner -Dsonar.login=${SONARQUBE_TOKEN} -Dsonar.host.url=${SONARQUBE_URL}"
                        // sh "${tool 'SonarScanner'}/bin/sonar-scanner -Dsonar.login=$SONARQUBE_TOKEN -Dsonar.host.url=$SONARQUBE_URL"
                    }
                }
            }
        }

        stage('SonarQube Analysis for Frontend') {
            steps {
                dir('Frontend') {
                    echo 'Analyse SonarQube du Frontend...'
                    withSonarQubeEnv('SonarQube') {
                        sh "${tool 'SonarScanner'}/bin/sonar-scanner -Dsonar.login=${SONARQUBE_TOKEN} -Dsonar.host.url=${SONARQUBE_URL}"
                        // sh "${tool 'SonarScanner'}/bin/sonar-scanner -Dsonar.login=$SONARQUBE_TOKEN -Dsonar.host.url=$SONARQUBE_URL"
                    }
                }
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
                sh '''
                    docker-compose down --remove-orphans || true
                    docker-compose rm -f backend || true 
                    docker-compose pull
                    docker-compose up -d --build
                '''
            }
        }
    }
}
