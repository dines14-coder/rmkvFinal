pipeline {
    agent any
    
    environment {
                ANGULAR_IMAGE = "dinesh14coder/rmkv:angular${BUILD_NUMBER}"
                REGISTRY_CREDENTIALS = credentials("cred-dock")
                REPLACE="angular${BUILD_NUMBER}"
                CHANGE="dotnet${BUILD_NUMBER}"
                DOTNET_IMAGE = "dinesh14coder/rmkv:dotnet${BUILD_NUMBER}"
                GIT_REPO_NAME = "rmkvFinal"
                GIT_USER_NAME = "dines14-coder"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url:'https://github.com/dines14-coder/rmkvFinal.git'
                sh "ls -ltr"
            }
        }
        stage('Build Image and Push angular application') {
            steps {
                script {
                        sh 'docker --version'
                        sh 'whoami'
                        sh 'cd SprintTrack-UI && docker build -t ${ANGULAR_IMAGE} .' 
                        def dockerImage = docker.image("${ANGULAR_IMAGE}")
                        withDockerRegistry([credentialsId: 'cred-dock', url: 'https://index.docker.io/v1/']) { 
                            dockerImage.push()
                        }
                }
            }
        }
        stage('Build Image and Push dotnet application') {
            steps {
                script {
                        sh 'cd SprintTrack-API-new && docker build -t ${DOTNET_IMAGE} .' 
                        def dockerImage = docker.image("${DOTNET_IMAGE}")
                        withDockerRegistry([credentialsId: 'cred-dock', url: 'https://index.docker.io/v1/']) { 
                            dockerImage.push()
                        }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'sed -i -E "s/angular.*/${REPLACE}/g" manifest/deployment.yml'
                sh 'sed -i -E "s/dotnet.*/${CHANGE}/g" manifest/dotnet-deployment.yml'
                // sh 'sed -i -E "s/angular.*/${REPLACE}/g" docker-compose.yaml'
                // sh 'sed -i -E "s/dotnet.*/${CHANGE}/g" docker-compose.yaml'
                sh "ls -ltr"
                // sh 'docker-compose down || true'
                // sh 'docker-compose -f docker-compose.yaml up -d'
            }
        }
        stage('Update Deployment File') {
            steps {
                withCredentials([string(credentialsId: 'sprint', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.email "dvrdineshdvrdinesh728@gmail.com"
                        git config user.name "dines14-coder"
                        git add .
                        git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                    '''
                }
            }
        }
    }
}
